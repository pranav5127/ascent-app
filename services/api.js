import { API_URL } from "@/constants/urls"

export const fetchStudents = async () => {
    console.log("Fetching all students from:", `${API_URL}/students`)
    const res = await fetch(`${API_URL}/students`)
    if (!res.ok) {
        console.error("Failed to fetch students:", res.status, res.statusText)
        throw new Error("Failed to fetch students")
    }
    const data = await res.json()
    console.log("Fetched students:", data)
    return data
}

export const fetchStudentDetails = async (id) => {
    const endpoints = [
        `${API_URL}/students/${id}`,
        `${API_URL}/marks/student/${id}`,
        `${API_URL}/attendance/student/${id}`,
        `${API_URL}/activities/student/${id}`
    ]
    console.log("Fetching student details from endpoints:", endpoints)

    const responses = await Promise.all(endpoints.map(url => fetch(url)))
    responses.forEach((r, i) => {
        if (!r.ok) console.error("Failed endpoint:", endpoints[i], r.status, r.statusText)
    })
    if (!responses.every(r => r.ok)) throw new Error("Failed to fetch student data")

    const data = await Promise.all(responses.map(r => r.json()))
    console.log("Fetched student details:", data)
    return data
}

export const saveReport = async (studentId, report) => {
    const payload = {
        student_id: studentId,
        report: report.detailed_report ? { detailed_report: report.detailed_report } : {},
        summary: report.summary ? { summary: report.summary } : {}
    }
    console.log("Saving report to DB for student:", studentId, "Payload:", payload)

    const res = await fetch(`${API_URL}/reports/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (!res.ok) {
        console.error("Failed to save report:", res.status, res.statusText)
        throw new Error("Failed to save report")
    }
    const data = await res.json()
    console.log("Report saved successfully:", data)
    return data
}

export const getReportByStudentId = async (studentId) => {
    console.log("Fetching report for student:", studentId)
    const res = await fetch(`${API_URL}/reports/student/${studentId}`)
    if (!res.ok) throw new Error("Failed to fetch report for student")

    const data = await res.json()
    console.log("Fetched report from DB:", data)

    return {
        id: data.id,
        student_id: data.student_id,
        report_data: {
            detailed_report: data.report?.detailed_report || "",
            summary: data.summary?.summary || ""
        },
        generated_at: data.generated_at,
        student_name: data.student_name || null,
        parent_mobile: data.parent_mobile || null
    }
}
