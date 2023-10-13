export class HttpError extends Error {
    constructor(status, statusText) {
        super("My custom exception" + statusText);
        this.status = status;
    }
}

export async function fetchJSON(url) {
    var token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5001" + url, {
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
        const response = await fetch("http://localhost:5001" + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
            },
            body: JSON.stringify(content)
        });

        const status = response.status;

        if (response.ok) {
            const data = await response.json();
            if (data !== null && data !== undefined) {
                return { status, data };
            } else {
                console.error("Error: Received null or undefined data");
                return { status, data: null };
            }
        } else if (response.status === 401) {
            console.error("Unauthorized access");
            return { status, data: null };
        } else if (response.status == 404){
            console.error("Error: Not found");
            return { status, data: null } 
        } else if (response.status === 409) {
            console.error("Username already exists");
            return { status, data: null }
        }else {
            console.error(`Error: Received status code ${response.status}`);
            throw new Error(`HTTP Error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function deleteJSON(url, content) {
    var token = localStorage.getItem("token")

    try {
        const response = await fetch("http://localhost:5001" + url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token}`
            },
            body: JSON.stringify(content)
        });

        const status = response.status;

        if (status === 401) {
            console.error("Unauthorized")
            return status;
        } else if (status === 204) {
            console.log("Sucess")
            return status;
        } else {
            console.error("Error, received code " + status)
        }
    } catch {
        console.error("ERROR")
    }
}
