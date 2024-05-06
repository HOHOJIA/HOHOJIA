'use client'
import { useState, useEffect } from 'react'
import RecipeListSquare from '../RecipeListSquare'
import Header from '@/app/components/Header'
import { useSearchParams } from 'next/navigation'
import RecipeListSkeleton from '../RecipeListSkeleton'
import Image from 'next/image'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

export default function ReciptList() {
    const searchParams = useSearchParams()
    const [searchData, setSearchData] = useState([])
    const [hasRecipe, setHasRecipe] = useState(true)
    const keyword = searchParams.get('search')
    useEffect(() => {
        if (keyword) {
            const fetchSearch = async () => {
                const res = await fetch(`${apiDomain}/search?title=${keyword}`)
                setSearchData(await res.json())
                if (res.status === 404) {
                    setHasRecipe(false)
                }
            }

            fetchSearch()
        }
    }, [keyword])
    return (
        <div className="min-h-screen w-full bg-gray-50 ">
            <Header />
            <div className=" w-full bg-gray-50 px-10 md:px-72 py-24 itmes-center justify-center flex gap-8 flex-col">
                <div className="w-full flex flex-row gap-2 text-lg">
                    <div className="font-bold">{keyword}</div>
                    <div>相關食譜</div>
                </div>
                <div className="w-full items-center justify-center flex gap-8 flex-col">
                    {searchData?.data?.recipes.length > 0 ? (
                        searchData.data.recipes.map((recipe: any) => (
                            <RecipeListSquare key={recipe.recipeId} recipe={recipe} />
                        ))
                    ) : hasRecipe === true ? (
                        <RecipeListSkeleton />
                    ) : (
                        <div className="flex flex-col justify-center items-center gap-2">
                            <Image alt="no result" src="/noResults.png" width={200} height={300} />
                            <div className="text-lg md:text-3xl font-bold text-indigo-800">
                                Sorry！ 無相關食譜＞﹏＜
                            </div>
                            <div>請嘗試其他關鍵字</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
