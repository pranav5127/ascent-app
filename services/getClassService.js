const API_BASE_URL = "https://ascent-backend.onrender.com"

export const getClassService = {
    getClassesByTeacher: async (teacherId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/classes/`)
            if (!response.ok) {
                throw new Error("Failed to fetch classes")
            }
            const classes = await response.json()
            // filter by teacher_id
            return classes.filter((cls) => cls.teacher_id === teacherId)
        } catch (error) {
            console.error("Error fetching classes:", error)
            return []
        }
    }
}
