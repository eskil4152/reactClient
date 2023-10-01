export class HttpError extends Error {
    constructor(status, statusText) {
        super("My custom exception" + statusText);
        this.status = status;
    }
}

export async function fetchJSON(url) {
    const response = await fetch("http://localhost:5000" + url);
    const data = await response.json();
    const status = response.status;

    return { status, data };
}

export async function postJSON(url, data) {
    try {
        const response = await fetch("http://localhost:5000" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const status = response.status;

        return { status };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
