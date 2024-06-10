import useShowAlert from '@/hooks/useShowAlert'
import { Avatar, Button, Textarea, useDisclosure } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { BiSolidShare } from 'react-icons/bi'
import { FaQuoteLeft } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'
import ReplyCommentModal from './ReplyCommentModal'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

interface CommentsProps {
    recipeId: number
    comments: {
        name: string
        time: string
        userId: string
        content: string
        commentId: string
        replyCommentId: string | null
    }[]
    onCommentSuccess: () => void
}

export default function Comments({
    recipeId,
    comments,
    onCommentSuccess,
}: CommentsProps) {
    const [comment, setComment] = useState('')
    const [isCommenting, setIsCommenting] = useState(false)
    const [originalComment, setOriginalComment] = useState('')
    const [originalCommentAuthor, setOriginalCommentAuthor] = useState('')
    const [replyContent, setReplyContent] = useState('')
    const [replyCommentId, setReplyCommentId] = useState<string | null>(null)
    const [isReplying, setIsReplying] = useState(false)
    const showAlert = useShowAlert()
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const groupedComments = comments.reduce((acc, comment) => {
        if (comment.replyCommentId === null) {
            acc[comment.commentId] = { ...comment, replies: [] }
        } else {
            if (!acc[comment.replyCommentId]) {
                acc[comment.replyCommentId] = { replies: [] }
            }
            acc[comment.replyCommentId].replies.push(comment)
        }
        return acc
    }, {} as Record<string, any>)

    const handleSubmit = async (
        content: string,
        replyCommentId: string | null,
        onClose?: () => void
    ) => {
        try {
            if (content === '') {
                showAlert('Oops...', '留言最少要有一個字喔！', 'error')
                return
            }

            const setLoading = replyCommentId ? setIsReplying : setIsCommenting
            setLoading(true)

            const token = Cookies.get('access_token')
            const res = await fetch(`${apiDomain}/comment/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ recipeId, replyCommentId, content }),
            })

            const responseData = await res.json()

            if (res.status === 200) {
                setComment('')
                setReplyContent('')
                setReplyCommentId(null)
                onCommentSuccess()
                if (onClose) onClose()
                return responseData
            } else {
                const errorMsg =
                    responseData.error === 'unauthorized'
                        ? '你還沒有登入呦～請先登入後再來按讚！'
                        : responseData.error
                showAlert('Oops...', errorMsg, 'error')
                return null
            }
        } catch (err: any) {
            showAlert('Oops...', err.message, 'error')
        } finally {
            setIsReplying(false)
            setIsCommenting(false)
        }
    }

    const handleComment = (content: string) => handleSubmit(content, null)
    const handleReply = () =>
        handleSubmit(replyContent, replyCommentId, onOpenChange)

    function openReplyModal(
        commentId: string,
        comment: string,
        author: string
    ) {
        setOriginalComment(comment)
        setOriginalCommentAuthor(author)
        setReplyCommentId(commentId)
        onOpen()
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
                    isLoading={isCommenting}
                >
                    送出
                </Button>
            </div>

            <div className="flex flex-col gap-20">
                {Object.values(groupedComments).map((comment: any, index) => (
                    <div
                        key={index}
                        className="flex flex-col pl-6 border-l-2 border-primary gap-12"
                    >
                        <div
                            key={index}
                            className="flex items-stretch justify-between"
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
                                        <BiSolidShare
                                            size={25}
                                            color="#5C5C5C"
                                        />
                                    }
                                    onClick={() =>
                                        openReplyModal(
                                            comment.commentId,
                                            comment.content,
                                            comment.name
                                        )
                                    }
                                />
                                <p className="text-sm text-gray-500">
                                    {comment.time.slice(0, 16)}
                                </p>
                            </div>
                        </div>

                        {comment.replies && comment.replies.length > 0 && (
                            <div className="flex flex-col gap-10 ml-4">
                                {comment.replies.map(
                                    (reply: any, replyIndex: number) => (
                                        <div
                                            key={replyIndex}
                                            className="flex items-stretch justify-between pl-6 border-l-2 border-gray-200"
                                        >
                                            <div className="flex flex-col justify-between gap-12">
                                                <div className="flex flex-col gap-2.5">
                                                    <p className="text-md text-gray-800">
                                                        {reply.content}
                                                    </p>
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
                                                    <p className="text-sm font-bold text-gray-500">
                                                        {reply.name}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-end">
                                                <p className="text-sm text-gray-500">
                                                    {reply.time.slice(0, 16)}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <ReplyCommentModal
                isOpen={isOpen}
                onClose={onOpenChange}
                originalComment={originalComment}
                originalCommentAuthor={originalCommentAuthor}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                handleReply={handleReply}
                isReplying={isReplying}
            />
        </div>
    )
}
