import { getReportByStudentId } from "@/services/api"
import { NOTIFICATION_URL } from "@/constants/urls"

export const sendNotification = async (student) => {
    try {
        if (!student?.id) {
            throw new Error("Student ID missing")
        }

        // Fetch latest report (includes student_name and parent_mobile)
        const latestReport = await getReportByStudentId(student.id)
        if (!latestReport) throw new Error("No report found for this student")

        const studentName = latestReport.student_name || "Student"
        const receiver = `+91${latestReport.parent_mobile || "9142104353"}`

        let summaryText = ""
        try {
            const summaryObj = typeof latestReport.report_summary === "string"
                ? JSON.parse(latestReport.report_summary)
                : latestReport.report_summary
            summaryText = summaryObj?.summary || ""
        } catch {
            summaryText = ""
        }

        if (!summaryText) throw new Error("No summary available in the latest report")

        // send notification
        const res = await fetch(`${NOTIFICATION_URL}/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender_contact: "14155238886",
                receiver_contact: receiver,
                message_text: `Report for ${studentName}:\n\nSummary:\n${summaryText}`
            })
        })

        if (!res.ok) throw new Error(`Failed to send notification: ${res.status}`)
        const data = await res.json()
        if (data?.status !== "Success") throw new Error(data?.detail || "Notification sending failed")

        return data
    } catch (err) {
        console.error("Error in sendNotification:", err)
        throw new Error(err?.message || "Failed to send notification")
    }
}
