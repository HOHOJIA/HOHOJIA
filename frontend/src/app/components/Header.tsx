'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Button,
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuToggle,
} from '@nextui-org/react'
import { FaSearch } from 'react-icons/fa'
import { FaQuestion } from 'react-icons/fa6'
import { IoLogOut, IoPersonSharp } from 'react-icons/io5'
import { TbBellRinging2Filled } from 'react-icons/tb'
import { useRouter, useSearchParams } from 'next/navigation'
import Cookies from 'js-cookie'

export default function Header() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [isLogined, setIsLogined] = useState(false)

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = Cookies.get('access_token')
            if (token) {
                setIsLogined(true)
            }
        }

        checkLoginStatus()
    }, [])

    function handleClickSearch() {
        if (keyword !== '') {
            const current = new URLSearchParams(
                Array.from(searchParams.entries())
            )
            current.set('title', keyword)
            const search = current.toString()
            const query = search ? `?${search}` : ''
            router.push(`/search${query}`)
        }
    }

    function handleLogout() {
        Cookies.remove('access_token')
        setIsLogined(false)
    }

    return (
        <Navbar
            maxWidth="full"
            className="shadow-lg md:py-2"
            classNames={{
                item: [
                    'flex',
                    'relative',
                    'lg:h-full',
                    'items-center',
                    'text-gray-500',
                    'data-[active=true]:font-normal',
                    'data-[active=true]:text-black',
                    'data-[active=true]:after:absolute',
                    'lg:data-[active=true]:after:bottom-4',
                    'md:data-[active=true]:after:bottom-0',
                    'data-[active=true]:after:left-0',
                    'data-[active=true]:after:right-0',
                    'data-[active=true]:after:h-[3px]',
                    'data-[active=true]:after:rounded-[2px]',
                    'data-[active=true]:after:bg-yellow-300',
                ],
            }}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href="/">
                        <Image
                            alt="HOHOJIA"
                            src="/images/logo_HOHOJIA.webp"
                            width={150}
                            height={150}
                            className="transition-transform duration-300 hover:scale-90"
                        />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                <NavbarItem isActive>
                    <Link
                        href="/"
                        className="transition-colors duration-300 hover:text-black"
                    >
                        HOJIA食譜
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="/"
                        className="transition-colors duration-300 hover:text-black"
                    >
                        二手廚具底JIA
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="flex items-center gap-5" justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Input
                        size="md"
                        key="outside"
                        type=""
                        label=""
                        placeholder="搜尋食譜"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="mr-2 w-60"
                        classNames={{
                            label: '',
                            input: '',
                            innerWrapper: '',
                            inputWrapper:
                                'bg-white pr-0 pl-4 border-yellow-300 rounded-md border-1',
                        }}
                        endContent={
                            <Button
                                className="p-0 rounded-s-none rounded-e-sm"
                                color="primary"
                                isIconOnly
                                style={{ height: '100%' }}
                                startContent={<FaSearch />}
                                onClick={handleClickSearch}
                            />
                        }
                    />
                </NavbarItem>

                {!isLogined ? (
                    <Button
                        color="primary"
                        size="md"
                        radius="sm"
                        className="px-5 lg:px-10"
                        onClick={() => router.push('/login')}
                    >
                        登入/註冊
                    </Button>
                ) : (
                    <>
                        <Button
                            color="primary"
                            isIconOnly
                            size="sm"
                            radius="full"
                            startContent={<FaQuestion size={20} />}
                        />
                        <Button
                            color="primary"
                            isIconOnly
                            size="sm"
                            radius="full"
                            startContent={<TbBellRinging2Filled size={20} />}
                        />
                        <Button
                            color="primary"
                            isIconOnly
                            size="sm"
                            radius="full"
                            startContent={<IoPersonSharp size={20} />}
                        />
                        <Button
                            color="primary"
                            isIconOnly
                            size="sm"
                            radius="full"
                            startContent={<IoLogOut size={20} />}
                            onClick={handleLogout}
                        />
                    </>
                )}
            </NavbarContent>

            <NavbarMenu className="flex items-center gap-4 py-8">
                <NavbarItem className="w-full">
                    <Input
                        size="md"
                        key="outside"
                        type=""
                        label=""
                        placeholder="搜尋食譜"
                        className="w-full mb-2"
                        classNames={{
                            label: '',
                            input: '',
                            innerWrapper: '',
                            inputWrapper:
                                'bg-white pr-0 pl-4 border-yellow-300 rounded-md border-1',
                        }}
                        endContent={
                            <Button
                                className="p-0 rounded-s-none rounded-e-sm"
                                color="primary"
                                isIconOnly
                                style={{ height: '100%' }}
                                startContent={<FaSearch />}
                            />
                        }
                    />
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="/"
                        className="transition-colors duration-300 hover:text-black"
                    >
                        HOJIA食譜
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        href="/"
                        className="transition-colors duration-300 hover:text-black"
                    >
                        二手廚具底JIA
                    </Link>
                </NavbarItem>
            </NavbarMenu>
        </Navbar>
    )
}
