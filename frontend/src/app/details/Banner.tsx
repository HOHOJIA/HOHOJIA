import { Button } from "@nextui-org/react";
import { FaFolderPlus, FaThumbsUp } from "react-icons/fa6";

export default function Banner() {
    return (
        <div className="bg-[url('/images/details_banner.webp')] w-full bg-cover rounded-xl px-16 py-16">
            <div className="flex flex-col w-1/2 gap-24">
                <div className="flex flex-col gap-5">
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

                        <p className="text-gray-500">1k+說讚</p>
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
