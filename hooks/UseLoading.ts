import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const useLoading = () => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        router.events.on('routeChangeStart', () => setIsLoading(true))
        router.events.on('routeChangeComplete', () => setIsLoading(false))
        router.events.on('routeChangeError', () => setIsLoading(false))
    })

    return isLoading
}


export default useLoading