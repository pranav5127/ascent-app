import {API_BASE_URL} from "@/constants/urls";

export const getStudentClassesService = async (studentId) => {
    try {
        const classesRes = await fetch(`${API_BASE_URL}/classes/`, {
            headers: { "Accept": "application/json" },
        })
        if (!classesRes.ok) throw new Error(await classesRes.text())
        const allClasses = await classesRes.json()

        const enrolledClasses = []

        for (const cls of allClasses) {
            const studentsRes = await fetch(`${API_BASE_URL}/classes/${cls.id}/students`, {
                headers: { "Accept": "application/json" },
            })
            if (!studentsRes.ok) continue
            const students = await studentsRes.json()
            if (students.some(s => s.student_id === studentId)) {
                enrolledClasses.push({
                    id: cls.id,
                    name: cls.name,
                    image: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg"
                })
            }
        }

        return enrolledClasses
    } catch (err) {
        console.error("Error in getStudentClassesService:", err)
        throw err
    }
}
