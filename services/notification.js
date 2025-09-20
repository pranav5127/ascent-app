import { NOTIFICATION_URL } from "@/constants/urls";

export const sendNotification = async (report) => {
    try {
        if (!report?.id) throw new Error("Report ID missing")
        if (!report.parent_mobile) throw new Error("Parent mobile number missing")

        const receiver = `+91${report.parent_mobile}`
        const summary = report.report_data?.summary?.trim() || ""

        if (!summary) throw new Error("No summary available in the report")

        const res = await fetch(`${NOTIFICATION_URL}/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sender_contact: "14155238886",
                receiver_contact: receiver,
                message_text: `Report for ${report.student_name || "Student"}:\n\nSummary:\n${summary}`
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
