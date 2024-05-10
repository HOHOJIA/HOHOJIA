import { Avatar, Button, Textarea } from "@nextui-org/react";
import { BiSolidShare } from "react-icons/bi";
import { FaQuoteLeft } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

export default function Comments() {
    const comments = [
        {
            name: "艾蜜莉",
            avatar: null,
            content: "我想要做14杯要怎麼加量？",
            time: "一周前",
        },
        {
            name: "莎莉",
            avatar: null,
            content: "能用小烤箱烤嗎？大概要烤多久",
            time: "一個月前",
        },
    ];

    return (
        <div className="flex flex-col gap-9 lg:w-7/12 md:w-full">
            <h4 className="text-lg font-bold underline lg:px-8 decoration-2 underline-offset-8">
                留言
            </h4>

            <div className="flex flex-col items-end gap-5">
                <Textarea
                    placeholder="留下文字跟廚神們交流吧！"
                    variant="bordered"
                    classNames={{
                        inputWrapper:
                            "px-7 py-5 border border-gray-200 shadow-lg",
                        input: "placeholder:text-gray-400 text-md",
                    }}
                    minRows={4}
                />
                <Button
                    color="primary"
                    size="md"
                    radius="sm"
                    className="text-md"
                >
                    送出
                </Button>
            </div>

            <div className="flex flex-col gap-20">
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className="flex items-stretch justify-between pl-6 border-l-2 border-primary"
                    >
                        <div className="flex flex-col justify-between gap-12">
                            <div className="flex flex-col gap-2.5">
                                <FaQuoteLeft size={35} color="#FDE047" />
                                <p className="text-md">{comment.content}</p>
                            </div>

                            <div className="flex gap-2.5 items-center grow">
                                <Avatar
                                    icon={
                                        <IoPersonSharp
                                            size={20}
                                            color="white"
                                        />
                                    }
                                    size="sm"
                                    className="bg-gray-400"
                                />
                                <p className="text-sm font-bold text-gray-600">
                                    {comment.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                            <BiSolidShare size={25} color="#5C5C5C" />
                            <p className="text-sm text-gray-500">
                                {comment.time}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
