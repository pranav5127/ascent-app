import {API_BASE_URL} from "@/constants/urls";

export async function saveAttendance(attendanceRecord) {
    try {
        console.log("Sending attendance record to backend:", attendanceRecord)

        const res = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(attendanceRecord),
        })

        console.log("Response status:", res.status)

        const responseText = await res.text()
        console.log("Response body:", responseText)

        if (!res.ok) {
            throw new Error(`Failed to save attendance: ${responseText}`)
        }

        let jsonResponse
        try {
            jsonResponse = JSON.parse(responseText)
        } catch {
            jsonResponse = { message: responseText }
        }

        console.log("Parsed response:", jsonResponse)
        return jsonResponse
    } catch (err) {
        console.error("Error saving attendance:", err)
        throw err
    }
}
