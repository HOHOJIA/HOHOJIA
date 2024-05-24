import useShowAlert from '@/hooks/useShowAlert'
import { Button } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { FaFolderPlus, FaThumbsUp } from 'react-icons/fa6'
import { MdDownload, MdOutlineShare } from 'react-icons/md'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

interface BannerProps {
    imageUrl: string
    title: string
    description: string
    totalLike: number
    recipeId: number
}

export default function Banner({
    imageUrl,
    title,
    description,
    totalLike,
    recipeId,
}: BannerProps) {
    const showAlert = useShowAlert()

    async function handleLike() {
        const token = Cookies.get('access_token')

        const res = await fetch(`${apiDomain}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                recipeId,
            }),
        })

        if (res.status === 200) {
            const responseData = await res.json()
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
    }

    return (
        <div
            className="w-full bg-cover rounded-xl lg:px-16 lg:py-16 px-6 py-8 bg-center lg:bg-left-top relative"
            style={{
                backgroundImage: `url(${
                    imageUrl || '/images/details_banner_no_image.png'
                })`,
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
                        />
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
