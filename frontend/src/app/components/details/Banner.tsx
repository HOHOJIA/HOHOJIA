import { Button } from "@nextui-org/react";
import { FaFolderPlus, FaThumbsUp } from "react-icons/fa6";

export default function Banner() {
    return (
        <div className="bg-[url('/images/details_banner.webp')] w-full bg-cover rounded-xl lg:px-16 lg:py-16 px-6 py-8 bg-center lg:bg-left-top relative">
            <div className="absolute top-0 left-0 z-0 w-full h-full bg-white bg-opacity-40 rounded-xl" />
            <div className="z-30 flex flex-col w-full gap-24 lg:w-1/2">
                <div className="z-30 flex flex-col gap-5">
                    <h2 className="text-4xl font-bold">焦糖烤布蕾</h2>
                    <h4 className="text-md">
                        吃了人人都稱讚的焦糖烤布蕾，5種材料就可以做出的法式甜點，烤得酥脆的焦糖，搭配冰涼柔軟細滑的布丁餡，一口大大滿足！
                    </h4>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-5">
                        <Button
                            color="primary"
                            size="md"
                            radius="sm"
                            className="px-5 text-md"
                            startContent={<FaThumbsUp size={20} />}
                        >
                            讚
                        </Button>

                        <p className="z-30 text-gray-500">1k+說讚</p>
                    </div>
                    <Button
                        color="primary"
                        size="md"
                        radius="sm"
                        className="px-5 text-md w-fit"
                        startContent={<FaFolderPlus size={20} />}
                    >
                        收藏此篇食譜
                    </Button>
                </div>
            </div>
        </div>
    );
}
