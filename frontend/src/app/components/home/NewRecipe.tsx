import { Input, Button } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

export default function NewRecipe({ image }) {
    const [showOverlay, setShowOverlay] = useState(false)

    return (
        <motion.div
            className="relative   rounded-xl flex justify-center items-center"
            key={image}
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
            <Card className="min-w-56 " isPressable shadow="sm">
                <Image
                    alt="Card background"
                    className="object-cover w-full rounded-xl "
                    src="/cake.png"
                    width={200}
                    height={270}
                />
                <CardFooter>
                    <h5 className="font-bold ">抹茶芝麻磅蛋糕</h5>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
