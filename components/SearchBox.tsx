import { api } from 'helpers/api'
import { useRouter } from "next/router"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"

const SearchBox = () => {

    let timer: NodeJS.Timeout
    const router = useRouter()
    const inputElement = useRef<HTMLInputElement>(null);
    const [suggestions, setSuggestions] = useState<string[]>([])

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {

        clearTimeout(timer)
        timer = setTimeout(async () => {
            if (e.target.value) {
                setSuggestions(await api(`/api/suggestions?q=${e.target.value}`))
            } else {
                setSuggestions([])
            }
        }, 300);
    }

    const search = (term: string) => {
        router.push(`/items?q=${term}`)
        setSuggestions([])
    }

    useEffect(() => {
        inputElement.current?.focus()
    }, [])

    return (
        <div>
            <input ref={inputElement} onChange={handleInput} type="text" placeholder="Nunca dejes de buscar" />

            <div>
                {suggestions.map((suggest, i) =>
                    <p onClick={() => search(suggest)} className="py-4" key={i}>{suggest}</p>)}
            </div>
        </div>
    )
}


export default SearchBox