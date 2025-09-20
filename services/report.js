import { REPORT_URL } from "@/constants/urls"
import { fetchStudentDetails, saveReport } from "./api"

export const generateReport = async (studentId) => {
    try {
        console.log("Generating report for student:", studentId)

        // Fetch all student-related data
        const [studentData, marksData, attendanceData, activitiesData] =
            await fetchStudentDetails(studentId)
        console.log("Fetched student data:", { studentData, marksData, attendanceData, activitiesData })

        if (!studentData || !marksData || !attendanceData || !activitiesData) {
            throw new Error("Incomplete student data received")
        }

        // Format marks
        const formattedMarks = Array.isArray(marksData)
            ? marksData.map(m => ({
                exam_type: m.exam_type,
                date: m.date,
                teacher_note: m.teacher_note || "",
                subject_scores: Object.fromEntries(
                    Object.entries(m.subject_scores || {}).map(([subject, val]) => [
                        subject,
                        {
                            score: val?.score ?? 0,
                            max_score: val?.max_score ?? 0
                        }
                    ])
                )
            }))
            : []
        console.log("Formatted marks for report:", formattedMarks)

        // Construct full report payload for LLM generation
        const fullReport = {
            student_id: studentData.id?.toString() || "",
            student_name: studentData.name || "Unknown",
            class_name: studentData.class_name || "N/A",
            parent_email: studentData.parent_email || "N/A",
            marks: formattedMarks,
            attendance: Array.isArray(attendanceData)
                ? attendanceData.map(a => ({
                    month: a.month || "",
                    days_present: a.days_present ?? 0,
                    days_absent: a.days_absent ?? 0
                }))
                : [],
            activities: Array.isArray(activitiesData)
                ? activitiesData.map(a => ({
                    activity_type: a.activity_type || "",
                    description: a.description || "",
                    achievement: a.achievement || "",
                    date: a.date || ""
                }))
                : []
        }
        console.log("Full report payload sent to REPORT service:", fullReport)

        // Call the report generation service
        const res = await fetch(`${REPORT_URL}/generate-reports`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([fullReport])
        })
        if (!res.ok) throw new Error("Failed to generate report")

        const data = await res.json()
        console.log("Raw report generated from REPORT service:", data)

        const generatedReport = data?.[0]
        if (!generatedReport) throw new Error("Report generation failed")

        // Normalize report_data for saving
        const rd = generatedReport.report_data || {}
        const reportPayload = {
            detailed_report: typeof rd.detailed_report === "string"
                ? rd.detailed_report
                : JSON.stringify(rd.detailed_report || "", null, 2),
            summary: typeof rd.summary === "string"
                ? rd.summary
                : JSON.stringify(rd.summary || "", null, 2)
        }
        console.log("Normalized report data to save in DB:", reportPayload)

        // Save the report in DB
        const savedReport = await saveReport(studentData.id, reportPayload)
        console.log("Saved report response from DB:", savedReport)

        // Return normalized report
        const finalReport = {
            ...generatedReport,
            report_data: reportPayload
        }
        console.log("Final report returned from generateReport:", finalReport)

        return finalReport
    } catch (err) {
        console.error("Error in generateReport:", err)
        throw new Error(err.message || "Failed to generate report")
    }
}
