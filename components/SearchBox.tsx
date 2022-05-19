import { api } from 'helpers/api'
import useLoading from 'hooks/UseLoading'
import { useRouter } from "next/router"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"

const SearchBox = () => {

    let timer: NodeJS.Timeout
    const router = useRouter()
    const isLoading = useLoading()
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
        <div className='bg-brand p-2 relative shadow'>
            <input disabled={isLoading} className={` py-2 px-3 rounded ${isLoading ? 'bg-gray-100' : 'bg-white'}`} ref={inputElement} onChange={handleInput} type="text" placeholder="Nunca dejes de buscar" />

            <div className='absolute left-0 top-full flex flex-col bg-neutral-100 w-full shadow-lg overflow-hidden rounded-b'>
                {suggestions.map((suggest, i) =>
                    <p onClick={() => search(suggest)} className="cursor-pointer py-4 px-6 bg-white hover:bg-blue hover:text-white" key={i}>{suggest}</p>)}
            </div>
        </div>
    )
}


export default SearchBox