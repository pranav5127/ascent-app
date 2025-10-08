import {API_BASE_URL} from "@/constants/urls";

export const sendNotification = async ({student_id, class_id, type, notification}) => {
    try {
        const payload = {
            student_id,
            class_id,
            type,
            notification,
            created_at: new Date().toISOString(),
            read: false
        }

        const response = await fetch(`${API_BASE_URL}/notifications/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok) {
            const errText = await response.text()
            throw errText
        }

    } catch (err) {
        console.log("unable to send notification" + err)
        throw err
    }
}