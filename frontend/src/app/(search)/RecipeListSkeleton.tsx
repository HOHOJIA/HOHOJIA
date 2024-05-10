import { Card, CardBody, Skeleton } from '@nextui-org/react'

export default function RecipeListSkeleton() {
    return (
        <Card isPressable isBlurred className="w-full border-none bg-background/60 dark:bg-default-100/50 " shadow="sm">
            <CardBody className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-6 items-start justify-start">
                <div className="relative col-span-6 md:col-span-4">
                    <Skeleton className="rounded-lg">
                        <div className="h-32 xl:h-44 rounded-lg bg-default-300"></div>
                    </Skeleton>
                </div>

                <div className="flex flex-col col-span-6 md:col-span-8 justify-between h-full">
                    <div className="flex flex-col gap-3">
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-5 w-2/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                            <div className="h-5 w-4/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>

                    <div className="flex flex-row mt-3 gap-1 items-center">
                        <Skeleton className="w-2/5 rounded-lg">
                            <div className="h-5 w-2/5 rounded-lg bg-default-200"></div>
                        </Skeleton>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
