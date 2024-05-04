import { Input, Button } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Card, CardHeader, CardBody, CardFooter, Image } from '@nextui-org/react'
// import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { IoPersonCircleSharp } from 'react-icons/io5'

export default function RecipeListSquare() {
    return (
        <Card isBlurred className="border-none bg-background/60 dark:bg-default-100/50 " shadow="sm">
            <CardBody className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-6 items-start justify-start">
                <div className="relative col-span-6 md:col-span-4">
                    <Image
                        alt="Album cover"
                        className="object-cover"
                        height={200}
                        shadow="md"
                        src="/cake.png"
                        width="100%"
                    />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8 justify-between h-full">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0">
                            <h1 className="text-large font-bold mt-2">焦糖烤布蕾</h1>
                            <p className="text-small text-foreground/80 mt-2">
                                鮮奶油250ml、牛奶150ml、蛋黃4顆、香草精1匙
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row mt-3 gap-1 items-center">
                        <IoPersonCircleSharp className="text-foreground/80" />
                        <p className="text-small">踩街</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
