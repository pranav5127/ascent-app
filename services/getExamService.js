import {API_BASE_URL} from "@/constants/urls";

export const getExamService = {
    getExamByClass: async (classId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/exams/`)
            if(!response.ok) {
                throw new Error("Failed to fetch exams")
            }

            const exams = await response.json()
            // filter by class_id
            return exams.filter((cls) => cls.class_id === classId)
        } catch (err) {
            console.log("Failed to fetch exams" + err)
            return []
        }
    }
}
