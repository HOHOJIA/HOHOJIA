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
        router.push(`/details`)
    }
    return (
        <Card
            isPressable
            onPress={handleClick}
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 "
            shadow="sm"
        >
            <CardBody className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-6 items-start justify-start">
                <div className="relative col-span-6 md:col-span-4">
                    <Image
                        alt="Album cover"
                        className="object-cover"
                        height={200}
                        shadow="md"
                        src={recipe.imgUrl}
                        width="100%"
                    />
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8 justify-between h-full">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-0">
                            <h1 className="text-large font-bold mt-2">{recipe.title}</h1>
                            <p className="text-small text-foreground/80 mt-2">{ingredientsString}</p>
                        </div>
                    </div>

                    <div className="flex flex-row mt-3 gap-1 items-center">
                        <IoPersonCircleSharp className="text-foreground/80" />
                        <p className="text-small">{recipe.userName}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
