import { useState, useEffect } from 'react'
import { Card, CardBody, Image as ImageUI, Skeleton } from '@nextui-org/react'

interface Step {
    order: number
    imageUrl: string
    description: string
    validImageUrl?: string | null
}

interface StepsProps {
    steps: Step[]
}

export default function Steps({ steps }: StepsProps) {
    const [processedSteps, setProcessedSteps] = useState<Step[]>(
        steps.map((step) => ({ ...step, validImageUrl: null }))
    )

    useEffect(() => {
        const checkImages = async () => {
            const promises = steps.map((step, index) => {
                return new Promise<void>((resolve) => {
                    const img = new Image()
                    img.onload = () => {
                        setProcessedSteps((prev) => {
                            const newSteps = [...prev]
                            newSteps[index].validImageUrl = step.imageUrl
                            return newSteps
                        })
                        resolve()
                    }
                    img.onerror = () => {
                        setProcessedSteps((prev) => {
                            const newSteps = [...prev]
                            newSteps[index].validImageUrl =
                                '/images/details_no_steps_img.webp'
                            return newSteps
                        })
                        resolve()
                    }
                    img.src = step.imageUrl
                })
            })

            await Promise.all(promises)
        }

        checkImages()
    }, [steps])

    return (
        <div className="flex flex-col w-full gap-9">
            <h4 className="text-lg font-bold underline decoration-2 underline-offset-8 lg:px-8">
                料理步驟
            </h4>

            {processedSteps.map((step, index) => (
                <div
                    className="relative flex flex-col w-full gap-3 lg:items-stretch lg:justify-between lg:flex-row lg:gap-0"
                    key={index}
                >
                    <Card className="z-10 border-none lg:py-5 lg:pl-6 lg:pr-2 lg:w-7/12">
                        <CardBody className="flex flex-row items-center gap-5 lg:gap-8">
                            <div className="flex items-center justify-center text-xl text-gray-600 rounded-full w-9 h-9 lg:w-16 lg:h-16 lg:text-4xl bg-primary">
                                {step.order}
                            </div>
                            <p className="w-10/12">{step.description}</p>
                        </CardBody>
                    </Card>

                    <div className="absolute left-0 right-0 z-0 hidden w-full transform -translate-y-1/2 border-gray-200 border-dashed top-1/2 border-t-1 lg:block" />

                    <div className="relative w-full lg:w-1/6 md:w-4/5 md:self-center">
                        {step.validImageUrl ? (
                            <ImageUI
                                className="z-10 object-cover w-full h-full rounded-xl aspect-[3/2]"
                                src={step.validImageUrl}
                                alt="step"
                            />
                        ) : (
                            <Skeleton className="w-full h-36 rounded-lg" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
