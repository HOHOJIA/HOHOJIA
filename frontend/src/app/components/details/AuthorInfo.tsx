import { Avatar, Button } from "@nextui-org/react";
import { FaUserPlus } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdDownload, MdOutlineShare } from "react-icons/md";

export default function AuthorInfo() {
    return (
        <div className="flex flex-col order-1 gap-6 lg:items-end lg:gap-9 lg:order-2">
            <div className="flex items-center gap-5">
                <Button
                    color="primary"
                    size="sm"
                    radius="sm"
                    className="px-2.5 text-sm"
                >
                    #熱門
                </Button>
                <Button
                    color="primary"
                    size="sm"
                    radius="sm"
                    className="px-2.5 text-sm"
                >
                    #甜點
                </Button>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
                <div className="flex justify-between lg:block">
                    <div className="flex items-center gap-2.5">
                        <Avatar
                            icon={<IoPersonSharp size={25} color="white" />}
                            size="md"
                            className="bg-gray-400"
                        />
                        <h4 className="text-lg font-bold">踩街</h4>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <p className="text-sm text-gray-600 underline transition-colors duration-300 cursor-pointer decoration-1 underline-offset-2 hover:text-gray-400">
                            56篇食譜
                        </p>
                        <p className="text-sm text-gray-600">9k+讚</p>
                    </div>
                </div>
                <div className="flex justify-between lg:block">
                    <Button
                        color="primary"
                        size="md"
                        radius="sm"
                        className="px-5 text-md"
                        startContent={<FaUserPlus size={20} />}
                    >
                        追蹤廚神
                    </Button>
                    <div className="flex items-center gap-3.5">
                        <Button
                            color="primary"
                            isIconOnly
                            size="sm"
                            radius="full"
                            startContent={<MdOutlineShare size={20} />}
                        />
                        <Button
                            color="primary"
                            isIconOnly
                            size="sm"
                            radius="full"
                            startContent={<MdDownload size={20} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
