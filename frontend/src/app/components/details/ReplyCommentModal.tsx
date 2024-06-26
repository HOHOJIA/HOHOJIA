import {
    Avatar,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from '@nextui-org/react'
import { IoPersonSharp } from 'react-icons/io5'

export default function ReplyCommentModal({
    isOpen,
    onClose,
    originalComment,
    originalCommentAuthor,
    replyContent,
    setReplyContent,
    handleReply,
    isReplying,
}: any) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={() => {
                onClose()
                setReplyContent('')
            }}
        >
            <ModalContent>
                <>
                    <ModalHeader>回覆留言</ModalHeader>
                    <ModalBody className="flex flex-col gap-7">
                        <div className="flex flex-col gap-3.5">
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
                                <p className="text-md text-gray-600 text-nowrap">
                                    {originalCommentAuthor}
                                </p>
                            </div>
                            <p className="text-md text-gray-600">
                                {originalComment}
                            </p>
                        </div>
                        <Textarea
                            placeholder={`回覆${originalCommentAuthor}！`}
                            variant="bordered"
                            classNames={{
                                inputWrapper:
                                    'px-6 py-4 border border-gray-200 shadow-lg',
                                input: 'placeholder:text-gray-400 text-sm',
                            }}
                            minRows={4}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            size="md"
                            radius="sm"
                            className="text-md"
                            onClick={handleReply}
                            isLoading={isReplying}
                        >
                            送出
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
