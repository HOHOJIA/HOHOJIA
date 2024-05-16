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
        <Card
            isPressable
            onPress={handleClick}
            isBlurred
            className="w-full border-none bg-background/60 dark:bg-default-100/50 "
            shadow="sm"
        >
            <CardBody className="grid items-start justify-start grid-cols-6 gap-6 md:grid-cols-12 md:gap-6">
                <div className="relative col-span-6 md:col-span-4">
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
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src={recipe.imgUrl}
                            width="100%"
                        />
                    )}
                </div>

                <div className="flex flex-col justify-between h-full col-span-6 md:col-span-8">
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-0">
                            <h1 className="mt-2 font-bold text-large">{recipe.title}</h1>
                            <p className="mt-2 text-small text-foreground/80">{ingredientsString}</p>
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
