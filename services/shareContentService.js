const API_BASE_URL = "https://ascent-backend.onrender.com"

export const shareContentService = async (data) => {
    console.log("Sharing content to /resources/ endpoint:", data)

    try {
        const response = await fetch(`${API_BASE_URL}/resources/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(data),
        })

        console.log("Response status:", response.status)

        if (!response.ok) {
            const errorData = await response.json()
            console.error("Backend returned error:", errorData)
            throw new Error(errorData.message || "Failed to share content")
        }

        const responseData = await response.json()
        console.log("Content shared successfully:", responseData)

        return responseData
    } catch (error) {
        console.error("Error in shareContentService:", error)
        throw error
    }
}
