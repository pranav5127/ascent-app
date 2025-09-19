import { REPORT_URL } from "@/constants/urls";
import { fetchStudentDetails, saveReport } from "./api";

// Generate a student report
export const generateReport = async (studentId) => {
    try {
        // Fetch all student-related data
        const [studentData, marksData, attendanceData, activitiesData] =
            await fetchStudentDetails(studentId);

        if (!studentData || !marksData || !attendanceData || !activitiesData) {
            throw new Error("Incomplete student data received");
        }

        // Format marks
        const formattedMarks = Array.isArray(marksData)
            ? marksData.map((m) => ({
                exam_type: m.exam_type,
                date: m.date,
                teacher_note: m.teacher_note || "",
                subject_scores: Object.fromEntries(
                    Object.entries(m.subject_scores || {}).map(([subject, val]) => [
                        subject,
                        {
                            score: val?.score ?? 0,
                            max_score: val?.max_score ?? 0,
                        },
                    ])
                ),
            }))
            : [];

        // Construct full report payload for LLM generation
        const fullReport = {
            student_id: studentData.id?.toString() || "",
            student_name: studentData.name || "Unknown",
            class_name: studentData.class_name || "N/A",
            parent_email: studentData.parent_email || "N/A",
            marks: formattedMarks,
            attendance: Array.isArray(attendanceData)
                ? attendanceData.map((a) => ({
                    month: a.month || "",
                    days_present: a.days_present ?? 0,
                    days_absent: a.days_absent ?? 0,
                }))
                : [],
            activities: Array.isArray(activitiesData)
                ? activitiesData.map((a) => ({
                    activity_type: a.activity_type || "",
                    description: a.description || "",
                    achievement: a.achievement || "",
                    date: a.date || "",
                }))
                : [],
        };

        // Call the report generation service
        const res = await fetch(`${REPORT_URL}/generate-reports`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([fullReport]),
        });

        if (!res.ok) throw new Error("Failed to generate report");
        const data = await res.json();
        const generatedReport = data?.[0];

        if (!generatedReport) throw new Error("Report generation failed");

        // Extract report_data correctly for DB
        const reportPayload = {
            detailed_report: generatedReport.report_data.detailed_report,
            summary: generatedReport.report_data.summary,
        };

        // Save the report in DB
        await saveReport(studentData.id, reportPayload);

        // Return the report with proper structure
        return {
            ...generatedReport,
            report_data: reportPayload,
        };
    } catch (err) {
        console.error("Error in generateReport:", err);
        throw new Error(err.message || "Failed to generate report");
    }
};
