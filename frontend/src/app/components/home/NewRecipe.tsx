import { Input, Button, Image, Skeleton } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
// import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface RecipeProps {
    recipe: {
        recipeId: number
        title: string
        imgUrl: string
    }
}
export default function NewRecipe({ recipe }: RecipeProps) {
    const [showOverlay, setShowOverlay] = useState(false)
    const router = useRouter()

    const handleClick = () => {
        router.push(`/details/${recipe.recipeId}`)
    }
    return (
        <motion.div
            className="relative flex items-center justify-center rounded-xl"
            key={recipe?.recipeId}
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)}
        >
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute w-full h-full bg-black opacity-50 pointer-events-none rounded-xl" />
                        <motion.h1 className="" initial={{ y: 10 }} animate={{ y: 0 }} exit={{ y: 10 }}>
                            <Button className="font-bold bg-white" onPress={handleClick}>
                                查看更多
                            </Button>
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>
            <Card
                onPress={handleClick}
                className="flex flex-col items-center justify-start w-full h-full min-w-56"
                isPressable
                shadow="sm"
            >
                {recipe.imgUrl === null ? (
                    <div className="h-[200px] text-center flex-col items-center justify-center flex w-full rounded-xl text-gray-500 bg-gray-200 ">
                        美味食物還在製作中
                        <br />
                        照片請燒等
                        <br />
                        (❁´◡`❁)
                    </div>
                ) : (
                    <Image
                        alt="Card background"
                        className="object-cover w-full rounded-xl h-[200px] "
                        src={recipe?.imgUrl}
                        width={300}
                        height={200}
                    />
                )}
                <CardFooter>
                    <h5 className="font-bold ">{recipe?.title}</h5>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
