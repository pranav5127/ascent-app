export async function fetchClassStudents(classId) {
    try {
        // Fetch students of the class
        const studentsRes = await fetch(
            `https://ascent-backend.onrender.com/classes/${classId}/students`,
            { headers: { accept: "application/json" } }
        )
        const studentsData = await studentsRes.json()

        // Fetch all users
        const usersRes = await fetch(
            `https://ascent-backend.onrender.com/users/`,
            { headers: { accept: "application/json" } }
        )
        const usersData = await usersRes.json()

        // Map student details
        const studentDetails = studentsData.map((s) => {
            const user = usersData.find((u) => u.id === s.student_id)
            return {
                id: s.student_id,
                name: user ? user.name : "Unknown",
                email: user ? user.email : null,
            }
        })

        //  Remove duplicates by student.id
        const uniqueStudents = Array.from(
            new Map(studentDetails.map((s) => [s.id, s])).values()
        )

        return uniqueStudents
    } catch (error) {
        console.error("Error fetching class students:", error)
        throw error
    }
}
