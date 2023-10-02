export class HttpError extends Error {
    constructor(status, statusText) {
        super("My custom exception" + statusText);
        this.status = status;
    }
}

export async function fetchJSON(url) {
    var token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000" + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer: ${token}`
        }
    });
    const data = await response.json();
    const status = response.status;

    return { status, data };
}

export async function postJSON(url, content) {
    var token = localStorage.getItem("token");

    try {
        const response = await fetch("http://localhost:5000" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Beader: ${token}`
            },
            body: JSON.stringify(content)
        });

        const status = response.status;
        const data = await response.text();

        return { status, data };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
