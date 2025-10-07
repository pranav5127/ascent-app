import {API_BASE_URL} from "@/constants/urls";

export const getSubjectsService = async (classId) => {
    console.log("Fetching all subjects from API...")
    try {
        const response = await fetch(`${API_BASE_URL}/subjects/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })

        console.log("Response status:", response.status)

        if (!response.ok) {
            const errorData = await response.json()
            console.error("❌ Server returned error:", errorData)
            throw new Error(errorData.message || "Failed to fetch subjects")
        }

        const data = await response.json()
        console.log("All subjects received:", data.length)

        const filteredSubjects = data.filter(subject => subject.class_id === classId)
        console.log(`Filtered subjects for classId=${classId}:`, filteredSubjects)

        return filteredSubjects
    } catch (error) {
        console.error("Error in getSubjectsService:", error)
        throw error
    }
}
