import { Avatar, Button, Divider } from '@nextui-org/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaUserPlus } from 'react-icons/fa6'
import { IoPersonSharp } from 'react-icons/io5'

interface AuthorInfoProps {
    tags: {
        name: string
        id: number
    }[]
    author: {
        userID: number
        avatarUrl: string
        name: string
        recipeCount: number
        receivedLike: number
    }
}

export default function AuthorInfo({ tags, author }: AuthorInfoProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleClickTag = (tag: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))
        current.set('tag', tag)
        const search = current.toString()
        const query = search ? `?${search}` : ''
        router.push(`/search${query}`)
    }

    return (
        <div className="flex flex-col order-1 gap-7 lg:items-end lg:gap-9 lg:order-2">
            <div className="flex items-center gap-5">
                {tags.map((tag, index) => (
                    <Button
                        key={index}
                        color="primary"
                        size="sm"
                        radius="sm"
                        className="px-2.5 text-sm"
                        onClick={() => handleClickTag(tag.name)}
                    >
                        #{tag.name}
                    </Button>
                ))}
            </div>

            <div className="flex flex-row items-center justify-between lg:gap-5 lg:flex-col lg:items-end lg:justify-center lg:h-full">
                <div className="flex flex-col lg:items-end lg:gap-3 gap-2.5">
                    <div className="flex items-center gap-2.5">
                        <Avatar
                            icon={<IoPersonSharp size={25} color="white" />}
                            size="md"
                            className="bg-gray-400"
                        />
                        <div className="flex flex-col">
                            <h4 className="font-bold text-md lg:text-lg text-nowrap">
                                {author.name}
                            </h4>
                            {/* author details for mobile */}
                            <div className="lg:hidden flex items-center gap-2.5 text-xs">
                                <p className="text-gray-600 underline transition-colors duration-300 cursor-pointer decoration-1 underline-offset-2 hover:text-gray-400">
                                    {author.recipeCount}篇食譜
                                </p>
                                {author.receivedLike && (
                                    <p className="text-gray-600 ">
                                        {author.receivedLike}讚
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* author details for desktop */}
                    <div className="hidden lg:flex lg:items-center lg:gap-2.5">
                        <p className="text-sm text-gray-600 underline transition-colors duration-300 cursor-pointer decoration-1 underline-offset-2 hover:text-gray-400">
                            {author.recipeCount}篇食譜
                        </p>
                        {author.receivedLike && (
                            <p className="text-sm text-gray-600">
                                {author.receivedLike}讚
                            </p>
                        )}
                    </div>
                </div>

                {/* buttons for desktop */}
                <Button
                    color="primary"
                    size="md"
                    radius="sm"
                    className="hidden lg:px-5 lg:text-md lg:flex"
                    startContent={<FaUserPlus size={20} />}
                >
                    追蹤廚神
                </Button>
                {/* buttons for mobile */}
                <Button
                    color="primary"
                    size="md"
                    radius="sm"
                    className="p-5 text-sm lg:hidden"
                    startContent={<FaUserPlus size={18} />}
                >
                    追蹤廚神
                </Button>
            </div>
            <Divider className="mt-2 lg:hidden md:hidden" />
        </div>
    )
}
