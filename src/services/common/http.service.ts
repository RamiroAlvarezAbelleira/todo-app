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
}

const httpBaseApi = new HttpBaseApi()

export default httpBaseApi