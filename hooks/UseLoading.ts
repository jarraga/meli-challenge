import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useLoading = () => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLoading = (loading: boolean) => {
        setIsLoading(loading)
    }

    useEffect(() => {
        router.events.on('routeChangeStart', () => handleLoading(true))
        router.events.on('routeChangeComplete', () => handleLoading(false))
        router.events.on('routeChangeError', () => handleLoading(false))
    }, [])

    return isLoading
}


export default useLoading