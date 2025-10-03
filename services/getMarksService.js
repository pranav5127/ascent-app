const API_BASE_URL = "https://ascent-backend.onrender.com"
const REPORT_API_BASE = "http://192.168.1.8:9999"

export const getMarksService = async (examId, studentId) => {
    try {
        const url = `${API_BASE_URL}/exams/${examId}/student/${studentId}/marks`
        console.log("Fetching marks from:", url)

        const response = await fetch(url, { headers: { accept: "application/json" } })

        if (!response.ok) {
            let errMsg = "Failed to fetch marks"
            try {
                const errData = await response.json()
                errMsg = errData.message || errMsg
            } catch (_) {
                const errText = await response.text()
                errMsg = errText || errMsg
            }
            throw new Error(errMsg)
        }

        const data = await response.json()

        const marksMap = {}
        data.forEach((m) => {
            marksMap[m.subject_id] = m.marks
        })

        return marksMap
    } catch (error) {
        console.error("Error in getMarksService:", error)
        throw error
    }
}

export const generateStudentReport = async (examId, student, subjects) => {
    try {
        const fetchedMarks = await getMarksService(examId, student.id)
        if (!fetchedMarks || Object.keys(fetchedMarks).length === 0) {
            throw new Error("No marks found for this student")
        }

        const payload = [
            {
                student_id: student.id,
                student_name: student.name,
                class_name: student.class_name || "N/A",
                parent_email: student.parent_email || "N/A",
                marks: [
                    {
                        exam_type: "Exam",
                        date: new Date().toISOString(),
                        teacher_note: "",
                        subject_scores: Object.fromEntries(
                            subjects.map((subj) => [
                                subj.name,
                                { score: fetchedMarks[subj.id] || 0, max_score: 100 }
                            ])
                        )
                    }
                ],
                attendance: [],
                activities: []
            }
        ]

        const response = await fetch(`${REPORT_API_BASE}/generate-reports`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })

        if (!response.ok) {
            const errText = await response.text()
            throw new Error(errText || "Failed to generate report")
        }

        const reportData = await response.json()
        if (reportData.length === 0) {
            throw new Error("No report returned")
        }

        return reportData[0].report_data
    } catch (error) {
        console.error("Error in generateStudentReport:", error)
        throw error
    }
}
