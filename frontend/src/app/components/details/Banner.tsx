import { Button } from '@nextui-org/react'
import { FaFolderPlus, FaThumbsUp } from 'react-icons/fa6'
import { MdDownload, MdOutlineShare } from 'react-icons/md'

interface BannerProps {
    imageUrl: string
    title: string
    description: string
    totalLike: number
}

export default function Banner({
    imageUrl,
    title,
    description,
    totalLike,
}: BannerProps) {
    function handleLike() {
        // TODO: integrate with backend
        console.log('like')
    }

    return (
        <div
            className="w-full bg-cover rounded-xl lg:px-16 lg:py-16 px-6 py-8 bg-center lg:bg-left-top relative"
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <div className="absolute top-0 left-0 z-0 w-full h-full bg-white bg-opacity-40 rounded-xl" />
            <div className="z-20 flex flex-col w-full gap-32 lg:gap-24 lg:w-1/2">
                <div className="z-20 flex flex-col gap-5">
                    <h2 className="text-4xl font-bold">{title}</h2>
                    <h4 className="text-md">{description}</h4>
                </div>

                <div className="flex flex-col gap-3.5">
                    <div className="flex items-center gap-2.5">
                        <Button
                            color="primary"
                            size="md"
                            radius="sm"
                            className="px-3 text-md"
                            startContent={<FaThumbsUp size={20} />}
                            onClick={handleLike}
                        >
                            讚
                        </Button>
                        <p className="z-20 text-gray-500">{totalLike}說讚</p>
                    </div>
                    <div className="flex items-center gap-3.5">
                        <Button
                            color="primary"
                            isIconOnly
                            size="md"
                            radius="full"
                            startContent={<FaFolderPlus size={20} />}
                        ></Button>
                        <Button
                            color="primary"
                            isIconOnly
                            size="md"
                            radius="full"
                            startContent={<MdOutlineShare size={20} />}
                        />
                        <Button
                            color="primary"
                            isIconOnly
                            size="md"
                            radius="full"
                            startContent={<MdDownload size={20} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
