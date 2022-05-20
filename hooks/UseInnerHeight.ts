import { useEffect, useState } from "react"

const useInnerHeight = () => {

    const [innerHeight, setInnerHeight] = useState(0)

    useEffect(() => {
        window.addEventListener('resize', () => setInnerHeight(window.innerHeight))
        setInnerHeight(window.innerHeight)
    }, [])

    return innerHeight
}

export default useInnerHeight