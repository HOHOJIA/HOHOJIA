import { Input, Button } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'

export default function NewRecipe() {
    return (
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
    )
}
