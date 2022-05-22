import { api } from 'helpers/api'
import useLoading from 'hooks/UseLoading'
import Link from 'next/link'
import { useRouter } from "next/router"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"

interface Suggest {
    title: string
    recent: boolean
}

const LOCAL_STORAGE_RECENT = 'recent'
const LAZY_INPUT_TIME = 300
const RECENTS_QUANTITY = 6

const SearchBox = () => {

    let timer: NodeJS.Timeout
    const router = useRouter()
    const isLoading = useLoading()
    const inputElement = useRef<HTMLInputElement>(null);
    const [term, setTerm] = useState('')
    const [suggestions, setSuggestions] = useState<Suggest[]>([])
    const [once, setOnce] = useState(false)

    const showRecents = () => {
        if (!once) {
            setOnce(true)
            return
        }
        const recents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RECENT) || '[]') as string[]
        setSuggestions(recents.map(recent => ({ title: recent, recent: true })))
    }

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {

        setTerm(e.target.value)

        clearTimeout(timer)
        timer = setTimeout(async () => {
            if (e.target.value) {
                const suggestions = await api<string[]>(`/api/suggestions?q=${e.target.value}`)
                setSuggestions(suggestions.map(suggest => ({ title: suggest, recent: false })))
            } else {
                showRecents()
            }
        }, LAZY_INPUT_TIME);
    }

    const search = (explicitTerm?: string) => {

        const term = explicitTerm || inputElement.current?.value || ''

        const recents = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RECENT) || '[]') as string[]
        recents.unshift(term)
        localStorage.setItem(LOCAL_STORAGE_RECENT,
            JSON.stringify(Array.from(new Set(recents)).slice(0, RECENTS_QUANTITY)))

        setTerm(term)
        setSuggestions([])
        router.push(`/items?q=${term}`)
    }

    const handleKeyDown = (e: any) => {

        if (e.key == 'Enter') {
            search()
            setSuggestions([])
        }

        if (e.key == 'Escape') {
            setSuggestions([])
            inputElement.current?.blur()
        }
    };

    useEffect(() => {
        const q = router.query.q
        setTerm(q ? String(q) : '')
        inputElement.current?.focus()
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div className='bg-brand py-3 px-4 relative shadow flex items-center md:pr-8'>

            {!!suggestions.length && <div className="fixed top-[72px] left-0 w-full h-full bg-white/90 sm:bg-white/50 sm:backdrop-blur" />}

            <div className="mx-auto h-full w-full md:max-w-cont flex items-center">
                <Link href="/">
                    <img onClick={() => setTerm('')} width={48} height={48} className="cursor-pointer" alt="Logo" src="/favicon.svg" />
                </Link>
                <div className={`ml-4 w-full h-full py-3 justify-between flex items-center shadow relative z-10 bg-white ${!!suggestions.length ? 'rounded-t-[2px]' : 'rounded-[2px]'}`}>
                    <input value={term} disabled={isLoading} className={`outline-none px-4 w-full`} ref={inputElement} onChange={handleInput} onFocus={showRecents} onKeyDown={handleKeyDown} type="text" placeholder="Nunca dejes de buscar" />
                    <div className='bg-gray1 h-full w-[1px]' />
                    <button onClick={() => search()} className='navigation text-gray2 px-4'>&#59943;</button>

                    {/* Suggestions */}
                    {!!suggestions.length &&
                        <div className='absolute left-0 top-full flex flex-col w-full shadow-lg overflow-hidden rounded-b-[2px] z-10 border-t border-gray1'>
                            {suggestions.map((suggest, i) =>
                                <div key={i} className="cursor-pointer py-4 px-6 bg-white hover:bg-blue hover:text-white flex items-center transition" onClick={() => search(suggest.title)}>
                                    {suggest.recent && <img src="/images/recent.svg" className="mr-4" />}
                                    <p>{suggest.title}</p>
                                </div>)}
                        </div>}
                </div>
            </div>


        </div>
    )
}


export default SearchBox