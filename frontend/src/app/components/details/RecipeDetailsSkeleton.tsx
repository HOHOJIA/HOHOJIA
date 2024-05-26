import { Skeleton } from '@nextui-org/react'

export default function RecipeDetailsSkeleton() {
    return (
        <div className="flex flex-col items-start w-full gap-12 px-8 pt-12 pb-40 lg:pt-16 lg:px-32 md:px-20">
            <Skeleton className="w-full rounded-xl h-96" />

            <div className="flex flex-col w-full gap-10 lg:justify-between lg:flex-row lg:gap-0">
                <div className="flex flex-col order-2 w-full gap-9 lg:order-1">
                    <Skeleton className="w-full h-10 lg:w-2/5 lg:h-8 rounded-lg" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                </div>
                <div className="flex flex-col order-1 w-full gap-9 lg:order-2 lg:items-end">
                    <Skeleton className="w-2/6 rounded-lg h-8" />
                    <div className="flex justify-between w-full lg:justify-end">
                        <Skeleton className="w-2/6 h-16 lg:h-40 rounded-lg lg:hidden" />
                        <Skeleton className="w-2/6 h-16 lg:h-40 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 w-full">
                <Skeleton className="w-1/5 h-8 rounded-lg" />
                <Skeleton className="w-full h-36 rounded-lg" />
                <Skeleton className="w-full h-36 rounded-lg" />
                <Skeleton className="w-full h-36 rounded-lg" />
            </div>

            <div className="flex flex-col gap-5 w-full">
                <Skeleton className="w-1/5 h-8 rounded-lg" />
                <Skeleton className="w-full lg:w-3/5 h-36 rounded-lg" />
            </div>

            <div className="flex flex-col gap-5 w-full">
                <Skeleton className="w-1/5 h-8 rounded-lg" />
                <Skeleton className="w-full lg:w-3/5 h-36 rounded-lg" />
            </div>
        </div>
    )
}
