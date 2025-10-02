const API_BASE_URL = "https://ascent-backend.onrender.com"

export const createExamService = async ({ class_id, name, date }) => {
    if (!name || !name.trim()) throw new Error("Exam name is required")
    if (!class_id) throw new Error("Class id is required")
    if (!date) throw new Error("Exam date is required")

    try {
        console.log("Creating exam for class:", class_id, "name:", name, "date:", date)
        const response = await fetch(`${API_BASE_URL}/exams/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ class_id, name: name.trim(), date })
        })

        if (!response.ok) {
            const errText = await response.text()
            console.error("Failed to create exam:", errText)
            throw new Error(`Failed to create exam: ${errText}`)
        }

        const data = await response.json()
        console.log("Exam created successfully:", data)
        return data
    } catch (error) {
        console.error("Error in createExamService:", error)
        throw error
    }
}
