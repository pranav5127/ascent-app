export async function fetchWeeklyAttendance(classId, startDate, endDate, studentId = null) {
    try {
        const res = await fetch(
            `https://ascent-backend.onrender.com/attendance/class/${classId}?start_date=${startDate}&end_date=${endDate}`,
            { headers: { accept: "application/json" } }
        )

        if (!res.ok) {
            const errorText = await res.text()
            throw new Error(errorText)
        }

        let data = await res.json()

        // Filter by studentId if provided
        if (studentId) {
            data = data.filter(record => record.student_id === studentId)
        }

        return data
    } catch (err) {
        console.error("Error fetching weekly attendance:", err)
        throw err
    }
}
