'use client'
import { useState, useEffect } from 'react'
import RecipeListSquare from '../../components/search/RecipeListSquare'
import Header from '@/app/components/Header'
import { useSearchParams } from 'next/navigation'
import RecipeListSkeleton from '../../components/search/RecipeListSkeleton'
import Image from 'next/image'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN
interface Recipe {
    recipeId: number
}

interface SearchResponse {
    data: {
        recipes: Recipe[]
    }
}
export default function ReciptList() {
    const searchParams = useSearchParams()
    const [searchData, setSearchData] = useState<SearchResponse>({ data: { recipes: [] } })
    const [hasRecipe, setHasRecipe] = useState(true)
    const tagKeyword = searchParams.get('tag')
    const titleKeyword = searchParams.get('title')
    useEffect(() => {
        if (tagKeyword) {
            const fetchTagSearch = async () => {
                const res = await fetch(`${apiDomain}/search?tag=${tagKeyword}`)
                setSearchData(await res.json())
                if (res.status === 404) {
                    setHasRecipe(false)
                }
            }

            fetchTagSearch()
        }
        if (titleKeyword) {
            const fetchTitleSearch = async () => {
                const res = await fetch(`${apiDomain}/search?title=${titleKeyword}`)
                setSearchData(await res.json())
                if (res.status === 404) {
                    setHasRecipe(false)
                }
            }

            fetchTitleSearch()
        }
    }, [tagKeyword, titleKeyword])
    return (
        <div className="w-full min-h-screen bg-gray-50 ">
            <Header />
            <div className="flex flex-col justify-center w-full gap-8 px-10 py-24 bg-gray-50 md:px-72 itmes-center">
                <div className="flex flex-row w-full gap-2 text-lg">
                    <div className="font-bold">{tagKeyword ? tagKeyword : titleKeyword}</div>
                    <div>相關食譜</div>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-8">
                    {searchData?.data?.recipes.length > 0 ? (
                        searchData.data.recipes.map((recipe: any) => (
                            <RecipeListSquare key={recipe.recipeId} recipe={recipe} />
                        ))
                    ) : hasRecipe === true ? (
                        <RecipeListSkeleton />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Image alt="no result" src="/noResults.png" width={200} height={300} />
                            <div className="text-lg font-bold text-indigo-800 md:text-3xl">
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
