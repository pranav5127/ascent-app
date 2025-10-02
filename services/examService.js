const API_BASE_URL = "https://ascent-backend.onrender.com"

export const createExam = async (classId, examName, date) => {
    if (!examName.trim()) throw new Error("Exam name is required")
    if (!classId) throw new Error("Class id is required")

    try {
        // Create the exam
        const examResponse = await fetch(`${API_BASE_URL}/exams/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                classId: classId,
                name: examName.trim(),
                date: date
            })
        })

        if (!examResponse.ok) {
            const errText = await examResponse.text()
            throw new Error(`Failed to create exam ${errText}`)
        }

        const classData = await examResponse.json()
        console.log("Created an exam")
        return classData.json()
    } catch (error) {
        throw error
    }
}