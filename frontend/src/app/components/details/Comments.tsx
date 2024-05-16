import { Avatar, Button, Textarea } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { BiSolidShare } from 'react-icons/bi'
import { FaQuoteLeft } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

interface CommentsProps {
    recipeId: number
    comments: {
        name: string
        time: string
        userId: string
        content: string
        commentId: string
        replyCommentId: string
    }[]
}

export default function Comments({ recipeId, comments }: CommentsProps) {
    const [comment, setComment] = useState('')

    async function handleComment(content: string) {
        if (comment === '') return
        const token = Cookies.get('access_token')

        const res = await fetch(`${apiDomain}/comment/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                recipeId,
                replyCommentId: null,
                content,
            }),
        })

        if (res.status === 200) {
            const responseData = await res.json()
            console.log('Response:', responseData)
            return responseData
        } else {
            const responseData = await res.json()
            console.log('Error Response:', responseData)
            const errorMsg = responseData.error
            alert(
                errorMsg === 'unauthorized'
                    ? '你還沒有登入呦～請先登入後再來按讚！'
                    : errorMsg
            )
            return null
        }
    }

    async function handleReplyComment(replyCommentId: string, content: string) {
        if (comment === '') return
        const token = Cookies.get('access_token')

        const res = await fetch(`${apiDomain}/comment/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                recipeId,
                replyCommentId: null,
                content,
            }),
        })

        if (res.status === 200) {
            const responseData = await res.json()
            console.log('Response:', responseData)
            setComment('')
            return responseData
        } else {
            const responseData = await res.json()
            console.log('Error Response:', responseData)
            const errorMsg = responseData.error
            alert(
                errorMsg === 'unauthorized'
                    ? '你還沒有登入呦～請先登入後再來按讚！'
                    : errorMsg
            )
            return null
        }
    }

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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    color="primary"
                    size="md"
                    radius="sm"
                    className="text-md"
                    onClick={() => handleComment(comment)}
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
                            <Button
                                isIconOnly
                                startContent={
                                    <BiSolidShare size={25} color="#5C5C5C" />
                                }
                                onClick={() =>
                                    handleReplyComment(
                                        comment.commentId,
                                        comment.content
                                    )
                                }
                            />
                            <p className="text-sm text-gray-500">
                                {comment.time.slice(0, 16)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
