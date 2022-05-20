import { api } from 'helpers/api'
import useLoading from 'hooks/UseLoading'
import Link from 'next/link'
import { useRouter } from "next/router"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"

const SearchBox = () => {

    let timer: NodeJS.Timeout
    const router = useRouter()
    const isLoading = useLoading()
    const inputElement = useRef<HTMLInputElement>(null);
    const [term, setTerm] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {

        setTerm(e.target.value)

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
        setTerm(term)
        setSuggestions([])
        // console.log(`/items?q=${term}`)
        router.push(`/items?q=${term}`)
    }

    const handleKeyDown = (e: any) => {

        if (e.key == 'Enter') {
            // search()
        }

        if (e.key == 'Escape') {
            setSuggestions([])
            inputElement.current?.blur()
        }
    };

    useEffect(() => {
        // const q = router.query.q
        // setTerm(q ? String(q) : '')
        inputElement.current?.focus()
    }, [router.query])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className='bg-brand p-3 relative shadow flex items-center'>
            <div className="mx-auto h-full w-full md:max-w-[75%] flex items-center">
                <Link href="/">
                    <img className="h-[48px] cursor-pointer" alt="Logo" src="/favicon.svg" />
                </Link>
                <div className={`ml-4 w-full h-full py-3 justify-between flex items-center shadow relative z-10 bg-white ${!!suggestions.length ? 'rounded-t-[2px]' : 'rounded-[2px]'}`}>
                    <input value={term} disabled={isLoading} className={`outline-none px-4 w-full`} ref={inputElement} onChange={handleInput} onKeyDown={handleKeyDown} type="text" placeholder="Nunca dejes de buscar" />
                    <div className='bg-gray1 h-full w-[1px]' />
                    <button onClick={() => search('---')} className='navigation text-gray2 px-4'>&#59943;</button>

                    {/* Suggestions */}
                    {!!suggestions.length && <div className='absolute left-0 top-full flex flex-col w-full shadow-lg overflow-hidden rounded-b-[2px] z-10 border-t border-gray1'>
                        {suggestions.map((suggest, i) =>
                            <p onClick={() => search(suggest)} className="cursor-pointer py-4 px-6 bg-white hover:bg-blue hover:text-white" key={i}>{suggest}</p>)}
                    </div>}
                </div>
            </div>


        </div>
    )
}


export default SearchBox