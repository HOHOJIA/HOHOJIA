'use client'
import Banner from '@/app/components/home/Banner'
import { Button } from '@nextui-org/react'
import { GiMeat, GiCakeSlice, GiNoodles, GiThreeLeaves } from 'react-icons/gi'
import { MdOutlineLocalDining } from 'react-icons/md'
import HotRecipe from '@/app/components/home/HotRecipe'
import NewRecipe from '@/app/components/home/NewRecipe'
import { FaArrowRight } from 'react-icons/fa'
import { animate, motion, useMotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'
import RecipeSkeleton from '@/app/components/home/RecipeSkeleton'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import Header from './components/Header'
import Footer from './components/Footer'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN
interface Recipe {
    recipeId: number
    title: string
    imgUrl: string
}

interface ApiResponse {
    data: {
        recipes: Recipe[]
    }
}

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [hotRecipe, setHotRecipe] = useState<ApiResponse>({ data: { recipes: [] } })
    const [newRecipe, setNewRecipe] = useState<ApiResponse>({ data: { recipes: [] } })

    useEffect(() => {
        const fetchHotRecipes = async () => {
            const res = await fetch(`${apiDomain}/getAllRecipes?sort=like`)
            setHotRecipe(await res.json())
        }
        const fetchNewRecipes = async () => {
            const res = await fetch(`${apiDomain}/getAllRecipes?sort=time`)
            setNewRecipe(await res.json())
        }
        fetchHotRecipes()
        fetchNewRecipes()
    }, [])
    const catergory = [
        {
            name: '肉類',
            icon: <GiMeat size="1.5rem" />,
        },
        {
            name: '蔬食',
            icon: <GiThreeLeaves size="1.5rem" />,
        },

        {
            name: '甜點',
            icon: <GiCakeSlice size="1.5rem" />,
        },
        {
            name: '中式',
            icon: <GiNoodles size="1.5rem" />,
        },
        {
            name: '西式',
            icon: <MdOutlineLocalDining size="1.5rem" />,
        },
    ]
    const images = [
        '/image-1.jpg',
        '/image-2.jpg',
        '/image-3.jpg',
        '/image-4.jpg',
        '/image-5.jpg',
        '/image-6.jpg',
        '/image-7.jpg',
        '/image-8.jpg',
    ]
    const FAST_DURATION = 25
    const SLOW_DURATION = 75

    const [duration, setDuration] = useState(FAST_DURATION)
    let [ref, { width }] = useMeasure()

    const xTranslation = useMotionValue(0)

    const [mustFinish, setMustFinish] = useState(false)
    const [rerender, setRerender] = useState(false)

    useEffect(() => {
        let controls
        let finalPosition = -width / 2 - 8

        if (mustFinish) {
            controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
                ease: 'linear',
                duration: duration * (1 - xTranslation.get() / finalPosition),
                onComplete: () => {
                    setMustFinish(false)
                    setRerender(!rerender)
                },
            })
        } else {
            controls = animate(xTranslation, [0, finalPosition], {
                ease: 'linear',
                duration: duration,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 0,
            })
        }

        return controls?.stop
    }, [rerender, xTranslation, duration, width])

    const handleClickTag = (tag: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set('tag', tag)
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`${pathname}search${query}`)
    }
    return (
        <>
            <Header />
            <div>
                <Banner />

                <div className="flex flex-col items-center justify-center w-full gap-4 py-10 md:gap-12 md:py-20">
                    <div className="flex items-center justify-between w-full max-w-full gap-6 px-4 py-1 overflow-x-scroll xl:px-44 2xl:px-96 md:px-20 lg:px-36 md:overflow-x-hidden">
                        {catergory.map((item, index) => (
                            <Button
                                onPress={() => handleClickTag(item.name)}
                                className="p-8 font-bold bg-white shadow "
                                size="lg"
                                key={index}
                                startContent={<div className="w-full p-2 bg-yellow-300 rounded-full">{item.icon}</div>}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </div>
                    <div className="flex flex-row items-center justify-between w-full px-4 mt-6 text-xl font-bold md:px-20 lg:px-36 xl:px-44 2xl:px-96">
                        <p>今日熱門食譜</p>
                        <Button className="flex flex-row items-center gap-1 text-sm bg-transparent">
                            看更多
                            <FaArrowRight size="0.8rem" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between w-full max-w-full gap-6 px-0 py-2 pl-4 overflow-x-scroll xl:px-44 2xl:px-96 md:px-20 lg:px-36 md:overflow-x-visible">
                        {hotRecipe?.data?.recipes.length > 0 ? (
                            hotRecipe.data.recipes.slice(0, 3).map((item: any, index: number) => (
                                <div key={index}>
                                    <HotRecipe recipe={item} />
                                </div>
                            ))
                        ) : (
                            <>
                                <RecipeSkeleton status="hot" />
                                <RecipeSkeleton status="hot" />
                                <RecipeSkeleton status="hot" />
                            </>
                        )}
                    </div>
                    <div className="flex flex-row justify-between w-full px-4 mt-6 text-xl font-bold md:px-20 xl:px-44 lg:px-36 2xl:px-96">
                        <p>最新分享食譜</p>
                        <Button className="flex flex-row items-center gap-1 text-sm bg-transparent">
                            看更多
                            <FaArrowRight size="0.8rem" />
                        </Button>
                    </div>

                    {newRecipe?.data?.recipes.length > 0 ? (
                        <>
                            <div
                                className="flex items-center justify-between w-full max-w-full gap-6 py-2 pl-4 overflow-x-scroll md:hidden xl:px-44 md:pl-20 lg:pl-44 2xl:pl-96"
                                style={{ scrollbarWidth: 'thin', scrollbarColor: 'white' }}
                            >
                                {newRecipe?.data?.recipes.map((item: any, index: number) => (
                                    <NewRecipe recipe={item} key={index} />
                                ))}
                            </div>
                            <div className="hidden w-full py-1 overflow-x-hidden md:flex">
                                <div className="relative w-auto">
                                    <motion.div
                                        className="flex gap-4 "
                                        style={{ x: xTranslation }}
                                        ref={ref}
                                        onHoverStart={() => {
                                            setMustFinish(true)
                                            setDuration(SLOW_DURATION)
                                        }}
                                        onHoverEnd={() => {
                                            setMustFinish(true)
                                            setDuration(FAST_DURATION)
                                        }}
                                    >
                                        {newRecipe?.data?.recipes.map((item, index) => (
                                            <NewRecipe recipe={item} key={index} />
                                        ))}
                                    </motion.div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-between w-full max-w-full gap-6 px-0 py-2 pl-4 overflow-x-scroll xl:px-44 2xl:px-96 md:px-20 lg:px-36 md:overflow-x-visible">
                            <RecipeSkeleton status="new" />
                            <RecipeSkeleton status="new" />
                            <RecipeSkeleton status="new" />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}
