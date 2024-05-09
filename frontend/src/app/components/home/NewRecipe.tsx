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
        router.push(`/details`)
    }
    return (
        <motion.div
            className="relative   rounded-xl flex justify-center items-center"
            key={recipe?.recipeId}
            onHoverStart={() => setShowOverlay(true)}
            onHoverEnd={() => setShowOverlay(false)}
        >
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className="absolute left-0 top-0 bottom-0 right-0 z-10 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="absolute rounded-xl bg-black pointer-events-none opacity-50 h-full w-full" />
                        <motion.h1 className="" initial={{ y: 10 }} animate={{ y: 0 }} exit={{ y: 10 }}>
                            <Button className="bg-white font-bold">查看更多</Button>
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>
            <Card
                onPress={handleClick}
                className="h-full min-w-56 w-full  items-center justify-start flex flex-col"
                isPressable
                shadow="sm"
            >
                <Image
                    alt="Card background"
                    className="object-cover w-full rounded-xl h-[200px] "
                    src={recipe?.imgUrl}
                    width={300}
                    height={200}
                />
                <CardFooter>
                    <h5 className="font-bold ">{recipe?.title}</h5>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
