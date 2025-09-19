import { API_URL } from "@/constants/urls"

export const fetchStudents = async () => {
    const res = await fetch(`${API_URL}/students`)
    if (!res.ok) throw new Error("Failed to fetch students")
    return res.json()
}

export const fetchStudentDetails = async (id) => {
    const endpoints = [
        `${API_URL}/students/${id}`,
        `${API_URL}/marks/student/${id}`,
        `${API_URL}/attendance/student/${id}`,
        `${API_URL}/activities/student/${id}`
    ]

    const responses = await Promise.all(endpoints.map(url => fetch(url)))
    if (!responses.every(r => r.ok)) throw new Error("Failed to fetch student data")

    return Promise.all(responses.map(r => r.json()))
}

export const saveReport = async (studentId, report) => {
    const res = await fetch(`${API_URL}/reports/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            student_id: studentId,
            report: report.detailed_report ? { detailed_report: report.detailed_report } : {},
            summary: report.summary ? { summary: report.summary } : {}
        })
    })

    if (!res.ok) throw new Error("Failed to save report")
    return res.json()
}

export const getReportByStudentId = async (studentId) => {
    const res = await fetch(`${API_URL}/reports/student/${studentId}`)
    if (!res.ok) throw new Error("Failed to fetch report for student")
    const data = await res.json()

    return {
        id: data.id,
        student_id: data.student_id,
        report_data: data.report_data || data.report,
        report_summary: data.report_summary || data.summary,
        generated_at: data.generated_at,
        student_name: data.student_name || null,
        parent_mobile: data.parent_mobile || null
    }
}
