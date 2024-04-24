import { Avatar, Button } from "@nextui-org/react";
import { FaUserPlus } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { MdDownload, MdOutlineShare } from "react-icons/md";

export default function AuthorInfo() {
    return (
        <div className="flex flex-col items-end gap-9">
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

            <div className="flex flex-col gap-5 items-end">
                <div className="flex items-center gap-2.5">
                    <Avatar
                        icon={<IoPersonSharp size={25} color="white" />}
                        size="md"
                        className="bg-gray-400"
                    />
                    <h4 className="text-lg font-bold">踩街</h4>
                </div>
                <div className="flex items-center gap-2.5">
                    <p className="text-gray-600 text-sm underline decoration-1 underline-offset-2 cursor-pointer hover:text-gray-400 transition-colors duration-300">
                        56篇食譜
                    </p>
                    <p className="text-gray-600 text-sm">9k+讚</p>
                </div>
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
    );
}
