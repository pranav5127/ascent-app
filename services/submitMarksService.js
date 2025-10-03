const API_BASE_URL = "https://ascent-backend.onrender.com"

export const submitMarksService = async (examId, studentId, subjectId, marks) => {
    try {
        const response = await fetch(`${API_BASE_URL}/exams/marks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                exam_id: examId,
                student_id: studentId,
                subject_id: subjectId,
                marks: Number(marks)
            })
        })

        const data = await response.json()

        if (!response.ok) {
            console.error("Failed to submit marks:", data)
            throw new Error(data.message || "Failed to submit marks")
        }

        console.log("Marks submitted successfully:", data)
        return data
    } catch (error) {
        console.error("Error in submitMarksService:", error)
        throw error
    }
}
