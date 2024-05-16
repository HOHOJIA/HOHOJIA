import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'

interface IngredientsProps {
    quantity: number
    cookTime: number
    ingredients: {
        name: string
        size: string
    }[]
}

export default function Ingredients({
    quantity,
    cookTime,
    ingredients,
}: IngredientsProps) {
    return (
        <div className="flex flex-col order-2 w-full gap-9 lg:order-1">
            <div className="flex justify-between lg:gap-16 lg:justify-start">
                <div className="flex items-center gap-3">
                    <p className="text-sm font-bold lg:text-md">份量</p>
                    <h3 className="text-2xl font-bold lg:text-4xl">
                        {quantity}人份
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold lg:text-md">料理時間</p>
                    <h3 className="text-2xl font-bold lg:text-4xl">
                        {cookTime}分鐘
                    </h3>
                </div>
            </div>

            <Card className="px-6 pt-2.5 lg:pr-12 pb-5 lg:w-8/12">
                <CardHeader className="text-lg font-bold underline decoration-2 underline-offset-8">
                    食材
                </CardHeader>
                <CardBody className="flex flex-col justify-between gap-2 lg:flex-row lg:gap-0">
                    <div className="flex flex-col gap-4">
                        {ingredients
                            .slice(0, ingredients.length / 2)
                            .map((ingredient, index) => (
                                <div
                                    className="flex justify-between lg:gap-32"
                                    key={index}
                                >
                                    <p className="text-gray-600">
                                        {ingredient.name}
                                    </p>
                                    <p className="font-bold text-gray-600">
                                        {ingredient.size}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col gap-4">
                        {ingredients
                            .slice(ingredients.length / 2)
                            .map((ingredient, index) => (
                                <div
                                    className="flex justify-between gap-32"
                                    key={index}
                                >
                                    <p className="text-gray-600">
                                        {ingredient.name}
                                    </p>
                                    <p className="font-bold text-gray-600">
                                        {ingredient.size}
                                    </p>
                                </div>
                            ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
