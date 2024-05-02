import { Input, Button } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

export default function HotRecipe() {
    return (
        <Card className="py-4 min-w-72" isPressable shadow="sm">
            <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
                <h4 className="font-bold text-large">抹茶芝麻磅蛋糕</h4>
            </CardHeader>
            <CardBody className="gap-2 py-2 overflow-visible">
                <Image
                    alt="Card background"
                    className="object-cover w-full rounded-xl "
                    src="/cake.png"
                    width={270}
                    height={270}
                />
                <Button className="flex flex-row items-center justify-between px-4 py-1 bg-yellow-300 rounded-xl shadow-small">
                    <p className="text-sm font-bold text-black">看完整食譜</p>
                    <FaArrowRight />
                </Button>
            </CardBody>
        </Card>
    )
}
