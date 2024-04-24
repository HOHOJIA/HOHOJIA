import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function Ingredients() {
    const ingredients = [
        { name: "鮮奶油", amount: "250ml" },
        { name: "牛奶", amount: "150ml" },
        { name: "雞蛋", amount: "4顆" },
        { name: "香草精", amount: "1匙" },
    ];

    return (
        <div className="flex flex-col gap-9">
            <div className="flex gap-16">
                <div className="flex items-center gap-4">
                    <p className="font-bold text-md">份量</p>
                    <h3 className="text-4xl font-bold">4人份</h3>
                </div>
                <div className="flex items-center gap-4">
                    <p className="font-bold text-md">料理時間</p>
                    <h3 className="text-4xl font-bold">30min</h3>
                </div>
            </div>

            <Card className="pl-5 pt-2.5 pr-12 pb-5">
                <CardHeader className="text-lg font-bold">食材</CardHeader>
                <CardBody className="flex flex-row justify-between gap-20">
                    <div className="flex flex-col gap-4">
                        {ingredients
                            .slice(0, ingredients.length / 2)
                            .map((ingredient) => (
                                <div className="flex justify-between gap-32">
                                    <p className="text-gray-600">
                                        {ingredient.name}
                                    </p>
                                    <p className="font-bold text-gray-600">
                                        {ingredient.amount}
                                    </p>
                                </div>
                            ))}
                    </div>
                    <Divider orientation="vertical" />
                    <div className="flex flex-col gap-4">
                        {ingredients
                            .slice(ingredients.length / 2)
                            .map((ingredient) => (
                                <div className="flex justify-between gap-32">
                                    <p className="text-gray-600">
                                        {ingredient.name}
                                    </p>
                                    <p className="font-bold text-gray-600">
                                        {ingredient.amount}
                                    </p>
                                </div>
                            ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
