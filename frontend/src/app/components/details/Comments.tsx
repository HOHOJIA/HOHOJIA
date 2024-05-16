import { Avatar, Button, Textarea } from '@nextui-org/react'
import { BiSolidShare } from 'react-icons/bi'
import { FaQuoteLeft } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'

interface CommentsProps {
    comments: {
        name: string
        time: string
        userId: string
        content: string
        commentId: string
        replyCommentId: string
    }[]
}

export default function Comments({ comments }: CommentsProps) {
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
                            'px-7 py-5 border border-gray-200 shadow-lg',
                        input: 'placeholder:text-gray-400 text-md',
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
                                {/* 2024-04-27 19:57:29.000000 => 2024-04-27 19:57 */}
                                {comment.time.slice(0, 16)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
