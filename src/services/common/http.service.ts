const BASE_API_URL = "http://127.0.0.1:8000/api"

class HttpBaseApi {

    async httpGet<T>(endpointSuffix: string): Promise<T> {
        const res = await fetch(`${BASE_API_URL}${endpointSuffix}`, {
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            console.log(`${res.status}: ${res?.statusText}`)
            throw new Error(`Failed to retrieve: ${endpointSuffix}`);
        }

        return res.json()
    }

    async httpPost<T>(endpointSuffix: string, body: object): Promise<T> {
        const res = await fetch(`${BASE_API_URL}${endpointSuffix}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            console.log(`${res.status}: ${res?.statusText}`)
            throw new Error(`Failed to Post: ${endpointSuffix}`);
        }

        return res.json()
    }

    async httpPut<T>(endpointSuffix: string, body?: object): Promise<T> {
        const res = await fetch(`${BASE_API_URL}${endpointSuffix}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body ?? {})
        })

        if (!res.ok) {
            console.log(`${res.status}: ${res?.statusText}`)
            throw new Error(`Failed to Put: ${endpointSuffix}`);
        }

        return res.json()
    }

    async httpDelete<T>(endpointSuffix: string): Promise<T> {
        const res = await fetch(`${BASE_API_URL}${endpointSuffix}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            console.log(`${res.status}: ${res?.statusText}`)
            throw new Error(`Failed to Delete: ${endpointSuffix}`);
        }

        return res.json()
    }
}

const httpBaseApi = new HttpBaseApi()

export default httpBaseApi