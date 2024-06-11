import { Card, CardHeader, CardBody, CardFooter, Image } from '@nextui-org/react'
import { IoPersonCircleSharp } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

export default function RecipeListSquare(props: { recipe: any }) {
    const router = useRouter()

    const { recipe } = props
    const ingredientsString = recipe.ingredients
        ? recipe.ingredients
              .filter((ingredient: { name: string; size: string }) => ingredient && ingredient.name && ingredient.size)
              .map((ingredient: { name: string; size: string }) => `${ingredient.name}${ingredient.size}`)
              .join('、')
        : ''

    const handleClick = () => {
        router.push(`/details/${recipe.recipeId}`)
    }
    return (
        <Card isPressable onPress={handleClick} className="w-full border-none bg-background/60 md:pr-4" shadow="sm">
            <CardBody className="w-full items-center justify-center md:items-start md:justify-start flex md:flex-row gap-6 flex-col md:gap-6">
                <div className="w-full md:w-2/6 items-center">
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
                            alt="Album cover"
                            className="min-w-full object-cover h-[200px] "
                            height={200}
                            width={300}
                            shadow="sm"
                            src={recipe.imgUrl}
                        />
                    )}
                </div>

                <div className="w-full md:w-4/6 flex flex-col justify-between h-full ">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-0">
                            <h1 className="mt-2 font-bold text-large line-clamp-1">{recipe.title}</h1>
                            <p className="mt-2 text-small text-foreground/80 line-clamp-2">{ingredientsString}</p>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-1 mt-3">
                        <IoPersonCircleSharp className="text-foreground/80" />
                        <p className="text-small">{recipe.userName}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
