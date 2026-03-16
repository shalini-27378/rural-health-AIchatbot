const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function sendMessage(message: string, language: string) {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}