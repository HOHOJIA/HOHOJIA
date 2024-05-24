import { Card, CardHeader, CardBody, CardFooter, Skeleton } from '@nextui-org/react'

export default function RecipeSkeleton(props: any) {
    const { status } = props
    return (
        <>
            {status == 'hot' ? (
                <Card
                    className="w-full space-y-5 p-4 min-w-72 sm:min-w-24 md:min-w-24 lg:min-w-54 xl:min-w-72"
                    radius="lg"
                >
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                    <Skeleton className="rounded-lg">
                        <div className="h-32 xl:h-44 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className=" rounded-lg">
                        <div className="h-8 w-4/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </Card>
            ) : (
                <Card
                    className="w-full space-y-5 p-4 min-w-72 sm:min-w-24 md:min-w-24 lg:min-w-54 xl:min-w-72"
                    radius="lg"
                >
                    <Skeleton className="rounded-lg">
                        <div className="md:h-32 h-44 rounded-lg bg-default-300"></div>
                    </Skeleton>
                    <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
                    </Skeleton>
                </Card>
            )}
        </>
    )
}
