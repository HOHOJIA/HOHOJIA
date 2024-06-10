import useShowAlert from '@/hooks/useShowAlert'
import {
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure,
} from '@nextui-org/react'
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

    async function handleComment(content: string) {
        try {
            setIsCommenting(true)
            if (comment === '') {
                showAlert('Oops...', '留言最少要有一個字喔！', 'error')
                return
            }
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
                setComment('')
                onCommentSuccess()
                return responseData
            } else {
                const responseData = await res.json()
                console.log('Error Response:', responseData)
                const errorMsg =
                    responseData.error === 'unauthorized'
                        ? '你還沒有登入呦～請先登入後再來按讚！'
                        : responseData.error
                showAlert('Oops...', errorMsg, 'error')
                return null
            }
        } catch (err: any) {
            console.log('Error:', err.message)
            showAlert('Oops...', err.message, 'error')
        } finally {
            setIsCommenting(false)
        }
    }

    async function handleReplyComment(
        replyCommentId: string,
        content: string,
        onClose: () => void
    ) {
        try {
            setIsReplying(true)
            if (content === '') {
                showAlert('Oops...', '留言最少要有一個字喔！', 'error')
                return
            }
            const token = Cookies.get('access_token')

            const res = await fetch(`${apiDomain}/comment/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    recipeId,
                    replyCommentId,
                    content,
                }),
            })

            if (res.status === 200) {
                const responseData = await res.json()
                setComment('')
                onCommentSuccess()
                setReplyContent('')
                setReplyCommentId(null)
                onClose()
                return responseData
            } else {
                const responseData = await res.json()
                console.log('Error Response:', responseData)
                const errorMsg =
                    responseData.error === 'unauthorized'
                        ? '你還沒有登入呦～請先登入後再來按讚！'
                        : responseData.error
                showAlert('Oops...', errorMsg, 'error')
                return null
            }
        } catch (err: any) {
            console.log('Error:', err.message)
            showAlert('Oops...', err.message, 'error')
        } finally {
            setIsReplying(false)
        }
    }

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
                ))}
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>回覆留言</ModalHeader>
                            <ModalBody className="flex flex-col gap-7">
                                <div className="flex justify-between items-center">
                                    <p className="text-md text-gray-600">
                                        {originalComment}
                                    </p>
                                    <div className="flex gap-2.5 items-center">
                                        <Avatar
                                            icon={
                                                <IoPersonSharp
                                                    size={16}
                                                    color="white"
                                                />
                                            }
                                            size="sm"
                                            className="bg-gray-400"
                                        />
                                        <p className="text-md text-gray-600">
                                            {originalCommentAuthor}
                                        </p>
                                    </div>
                                </div>
                                <Textarea
                                    placeholder="回覆廚神們的留言吧！"
                                    variant="bordered"
                                    classNames={{
                                        inputWrapper:
                                            'px-6 py-4 border border-gray-200 shadow-lg',
                                        input: 'placeholder:text-gray-400 text-sm',
                                    }}
                                    minRows={4}
                                    value={replyContent}
                                    onChange={(e) =>
                                        setReplyContent(e.target.value)
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="primary"
                                    size="md"
                                    radius="sm"
                                    className="text-md"
                                    onClick={() =>
                                        handleReplyComment(
                                            replyCommentId!,
                                            replyContent,
                                            onClose
                                        )
                                    }
                                    isLoading={isReplying}
                                >
                                    送出
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
