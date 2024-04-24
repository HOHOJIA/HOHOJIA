import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";

export default function Steps() {
    const steps = [
        {
            text: "鮮奶油、鮮奶和香草莢醬拌勻，中火煮沸",
            image: "/images/steps/img_step1.webp",
        },
        {
            text: "蛋黃加糖拌勻，慢慢加入步驟1中，要不停的攪拌",
            image: "/images/steps/img_step2.webp",
        },
        {
            text: "布丁液過篩兩次，撈除氣泡或使用保鮮膜去除，倒入烤盅，深烤盤加約1公分高熱水，入爐170度烤40分鐘，出爐放涼移入冰箱冷藏",
            image: "/images/steps/img_step3.webp",
        },
        {
            text: "食用前表面灑上薄薄一層二砂，用噴槍炙燒烤至焦糖色，即可享用",
            image: "/images/steps/img_step4.webp",
        },
    ];

    return (
        <div className="flex flex-col gap-9 w-full">
            <h4 className="text-lg font-bold underline decoration-2 underline-offset-8 px-8">
                料理步驟
            </h4>

            {steps.map((step, index) => (
                <div className="flex w-full justify-between items-stretch relative">
                    <Card
                        className="border-none pl-6 py-5 w-7/12 z-10"
                        key={index}
                    >
                        <CardBody className="flex flex-row items-center gap-8">
                            <div className="flex items-center justify-center bg-primary text-gray-600 rounded-full text-4xl w-16 h-16">
                                {index + 1}
                            </div>
                            <p className="w-10/12">{step.text}</p>
                        </CardBody>
                    </Card>

                    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 border-t-1 border-dashed border-gray-200 w-full z-0" />

                    <Image
                        className="rounded-2xl h-auto w-1/6 object-cover z-10"
                        src={step.image}
                        alt="step"
                        width={0}
                        height={0}
                        sizes="100vw"
                    />
                </div>
            ))}
        </div>
    );
}
