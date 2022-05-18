export const api = async <T>(request: RequestInfo): Promise<T> => {
    const response = await fetch(request)
    const data = await response.json()
    return data;
}