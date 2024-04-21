import { Input, Button } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

export default function HotRecipe() {
    return (
        <Card className="py-4" isPressable>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">抹茶芝麻磅蛋糕</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 gap-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl "
                    src="/cake.png"
                    width={270}
                    height={270}
                />
                <Button className="justify-between bg-yellow-300   py-1 px-4  rounded-xl  shadow-small  flex flex-row  items-center">
                    <p className="font-bold text-sm text-black">看完整食譜</p>
                    <FaArrowRight />
                </Button>
            </CardBody>
        </Card>
    )
}
