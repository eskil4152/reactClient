export class HttpError extends Error {
    constructor(status, statusText) {
        super("My custom exception" + statusText);
        this.status = status;
    }
}

/*export async function fetchJSON(url) {
    const res = await fetch("http://localhost:5000" + url);
    if (res.status === 204) {
        return null;
    } else if (res.ok) {
        return await res.json();
    } else {
        throw new HttpError(res.status, res.statusText);
    }
}*/

export async function fetchJSON(url) {
    const response = await fetch("http://localhost:5000" + url);
    const data = await response.json();
    const status = response.status;

    return { status, data };
}