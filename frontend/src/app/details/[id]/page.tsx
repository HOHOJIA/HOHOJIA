'use client'

import Header from '../../components/Header'
import Banner from '../../components/details/Banner'
import Ingredients from '../../components/details/Ingredients'
import AuthorInfo from '../../components/details/AuthorInfo'
import Steps from '../../components/details/Steps'
import Tips from '../../components/details/Tips'
import Comments from '../../components/details/Comments'
import Footer from '../../components/Footer'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import RecipeDetailsSkeleton from '@/app/components/details/RecipeDetailsSkeleton'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

interface RecipeDetails {
    recipeId: number
    title: string
    description: string
    imageUrl: string
    quantity: number
    cookTime: number
    totalLike: number
    tip: string
    createdAt: string
    tags: {
        name: string
        id: number
    }[]
    author: {
        userID: number
        avatarUrl: string
        name: string
        recipeCount: number
        receivedLike: number
    }
    steps: {
        order: number
        imageUrl: string
        description: string
    }[]
    ingredients: {
        name: string
        size: string
    }[]
    comments: any[]
}

export default function Details() {
    const pathname = usePathname()
    const recipeId = pathname.split('/').pop()

    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchRecipeDetails = async () => {
        if (!recipeId) return
        try {
            const response = await fetch(`${apiDomain}/recipe/${recipeId}`)
            if (!response.ok) {
                throw new Error('Failed to fetch recipe details')
            }
            const res = await response.json()
            setRecipeDetails(res.data)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (recipeId && !recipeDetails) {
            fetchRecipeDetails()
        }
    }, [recipeId])

    if (error) return <div>Error: {error}</div>

    return (
        <main className="">
            <Header />

            {isLoading ? (
                <RecipeDetailsSkeleton />
            ) : (
                recipeDetails && (
                    <div className="flex flex-col items-start w-full gap-12 px-8 pt-12 pb-40 lg:pt-16 lg:px-32 md:px-20">
                        <Banner
                            imageUrl={recipeDetails.imageUrl}
                            title={recipeDetails.title}
                            description={recipeDetails.description}
                            totalLike={recipeDetails.totalLike}
                            recipeId={recipeDetails.recipeId}
                            onLikeSuccess={fetchRecipeDetails}
                        />
                        <div className="flex flex-col w-full gap-10 lg:justify-between lg:flex-row lg:gap-0">
                            <Ingredients
                                quantity={recipeDetails.quantity}
                                cookTime={recipeDetails.cookTime}
                                ingredients={recipeDetails.ingredients}
                            />
                            <AuthorInfo
                                tags={recipeDetails.tags}
                                author={recipeDetails.author}
                            />
                        </div>
                        <Steps steps={recipeDetails.steps} />
                        <Tips tip={recipeDetails.tip} />
                        <Comments
                            comments={recipeDetails.comments}
                            recipeId={recipeDetails.recipeId}
                        />
                    </div>
                )
            )}

            <Footer />
        </main>
    )
}
