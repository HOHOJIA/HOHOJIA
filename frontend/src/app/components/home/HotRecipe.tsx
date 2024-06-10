import { Input, Button, Image, Skeleton } from '@nextui-org/react'
import { FaSearch, FaPlus } from 'react-icons/fa'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
// import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
interface RecipeProps {
    recipe: {
        recipeId: number
        title: string
        imgUrl: string
    }
}
export default function HotRecipe({ recipe }: RecipeProps) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/details/${recipe.recipeId}`)
    }
    return (
        <Card
            onPress={handleClick}
            className="w-full py-4 min-w-72 sm:min-w-24 md:min-w-24 lg:min-w-56 xl:min-w-72 2xl:min-w-[360px]"
            isPressable
            shadow="sm"
        >
            <CardHeader className="flex-col items-start px-4 pt-2 pb-0">
                <h4 className="font-bold text-large">{recipe.title}</h4>
            </CardHeader>
            <CardBody className="gap-2 py-2 overflow-visible">
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
                        className="min-h-[200px] max-h-[200px] object-cover w-full rounded-xl "
                        src={recipe.imgUrl}
                        width={270}
                        height={270}
                    />
                )}

                <Button className="flex flex-row items-center justify-between px-4 py-1 bg-yellow-300 rounded-xl shadow-small">
                    <p className="text-sm font-bold text-black">看完整食譜</p>
                    <FaArrowRight />
                </Button>
            </CardBody>
        </Card>
    )
}
