const API_BASE_URL = "https://ascent-backend.onrender.com"

export const createClassWithSubjects = async (className, teacherId, subjects) => {
    if (!className.trim()) throw new Error("Class name is required")
    if (!teacherId) throw new Error("Teacher ID is required")

    try {
        // Create the class
        const classResponse = await fetch(`${API_BASE_URL}/classes/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: className.trim(),
                teacher_id: teacherId
            })
        })

        if (!classResponse.ok) {
            const errText = await classResponse.text()
            throw new Error(`Failed to create class: ${errText}`)
        }

        const classData = await classResponse.json()
        const classId = classData.id
        if (!classId) throw new Error("No class id returned from API")

        console.log("✅ Class created:", classId)

        //  Create subjects
        for (const subject of subjects) {
            const cleanName = subject.trim()
            if (cleanName) {
                const subjectResponse = await fetch(`${API_BASE_URL}/subjects/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        class_id: classId,
                        name: cleanName
                    })
                })

                if (!subjectResponse.ok) {
                    const subErr = await subjectResponse.text()
                    console.warn(`❌ Failed to create subject "${cleanName}": ${subErr}`)
                } else {
                    const subjectData = await subjectResponse.json()
                    console.log(` Subject created: ${subjectData.name}`)
                }
            }
        }

        // Return the created class id
        return classId
    } catch (error) {
        console.error("Error in createClassWithSubjects:", error)
        throw error
    }
}
