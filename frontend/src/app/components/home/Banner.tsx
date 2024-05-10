'use client'
import { useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function Banner() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [keyword, setKeyword] = useState('')

    const handleClickSearch = () => {
        if (keyword !== '') {
            const current = new URLSearchParams(Array.from(searchParams.entries())) // -> has to use this form
            current.set('search', keyword)
            const search = current.toString()
            const query = search ? `?${search}` : ''
            router.push(`${pathname}search${query}`)
        }
    }

    return (
        <div className="bg-[url('/Banner_phone.png')] md:bg-[url('/Banner.png')] w-full h-96 md:h-56  flex justify-center items-center bg-cover">
            <div className="flex flex-col items-start justify-center w-full gap-4 px-4 xl:px-44 py-6 md:items-center md:px-20 lg:px-36 2xl:px-96">
                <h1 className="text-xl font-bold text-white drop-shadow-lg ">
                    讓每一次料理
                    <br className="block md:hidden" />
                    都能成為一段美好食光
                </h1>
                <div className="flex flex-col items-center justify-between w-full gap-4 md:flex-row ">
                    <Input
                        size="lg"
                        key="outside"
                        type=""
                        label=""
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="想找什麼食譜呢？"
                        className="w-full bg-white md:w-8/12 rounded-xl"
                        endContent={
                            <Button
                                onPress={handleClickSearch}
                                className="px-3 py-0 text-sm font-bold"
                                color="primary"
                                size="md"
                                startContent={<FaSearch />}
                            >
                                搜尋
                            </Button>
                        }
                    />
                    <Button
                        fullWidth
                        size="lg"
                        className="justify-between w-full px-3 bg-white md:w-4/12 hover:bg-white "
                        endContent={
                            <div className="flex flex-row items-center gap-2 p-2 px-4 text-sm font-bold bg-yellow-300 md:py-3 rounded-xl">
                                <FaPlus />
                                <div className="flex md:hidden">分享</div>
                            </div>
                        }
                    >
                        你想分享食譜嗎？
                    </Button>
                </div>
            </div>
        </div>
    )
}
