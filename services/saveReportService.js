import {API_BASE_URL} from "@/constants/urls";
import {sendNotification} from "@/services/notification";

export const saveReportService = async ({ student_id, class_id, period, report_text }) => {
    try {
        const payload = {
            student_id,
            class_id,
            period,
            report_text,
            created_at: new Date().toISOString()
        }


        const response = await fetch(`${API_BASE_URL}/reports/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(payload)
        })

      //  await sendNotification(student_id, class_id, "report-notification", "new report generated")

        if (!response.ok) {
            const errText = await response.text()
            throw new Error(errText || "Failed to save report")
        }

        const savedReport = await response.json()
        return savedReport
    } catch (err) {
        console.error("Error in saveReportService:", err)
        throw err
    }
}
