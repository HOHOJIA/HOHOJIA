import { Card, CardBody } from '@nextui-org/react'
import Image from 'next/image'

interface StepsProps {
    steps: {
        order: number
        imageUrl: string
        description: string
    }[]
}

export default function Steps({ steps }: StepsProps) {
    return (
        <div className="flex flex-col w-full gap-9">
            <h4 className="text-lg font-bold underline decoration-2 underline-offset-8 lg:px-8">
                料理步驟
            </h4>

            {steps?.map((step, index) => (
                <div
                    className="relative flex flex-col w-full gap-3 lg:items-stretch lg:justify-between lg:flex-row lg:gap-0"
                    key={index}
                >
                    <Card className="z-10 border-none lg:py-5 lg:pl-6 lg:w-7/12">
                        <CardBody className="flex flex-row items-center gap-5 lg:gap-8">
                            <div className="flex items-center justify-center text-xl text-gray-600 rounded-full w-9 h-9 lg:w-16 lg:h-16 lg:text-4xl bg-primary">
                                {step.order}
                            </div>
                            <p className="w-10/12">{step.description}</p>
                        </CardBody>
                    </Card>

                    <div className="absolute left-0 right-0 z-0 hidden w-full transform -translate-y-1/2 border-gray-200 border-dashed top-1/2 border-t-1 lg:block" />

                    <div className="relative w-full min-h-48 lg:min-h-32 md:min-h-72 lg:w-1/6 md:w-4/5 md:self-center aspect-w-16 aspect-h-9">
                        <Image
                            className="z-10 object-cover w-full h-full rounded-2xl"
                            src={
                                step.imageUrl ||
                                '/images/details_no_steps_img.webp'
                            }
                            alt="step"
                            layout="fill"
                            objectFit="cover"
                            sizes="100vw"
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
