const API_BASE_URL = "https://ascent-backend.onrender.com"

export const joinClassService = async ({ class_id, student_id}) => {
    if (!class_id) throw new Error("Class id is required")
    if (!student_id) throw new Error("Student id is required")
    try {
        const response = await fetch(`${API_BASE_URL}/classes/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ class_id, student_id })
        })

        if (!response.ok) {
            const errText = await response.text()
            console.error("Failed to join class:", errText)
            throw new Error(`Failed to join class: ${errText}`)
        }

        const data = await response.json()
        console.log("joined class successfully:", data)
        return data
    } catch (error) {
        console.error("Error in joining class:", error)
        throw error
    }
}
