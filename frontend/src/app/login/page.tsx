'use client'
import Image from 'next/image'
import Link from 'next/link'
import LoginImg from '../components/login/LoginImg'
import Login from '../components/login/LoginSection'

export default function LoginPage() {
    return (
        <div className="flex flex-col h-screen">
            <Link href="/">
                <Image className="mt-3 ml-3" alt="HOHOJIA" src="/images/logo_HOHOJIA.webp" width={150} height={150} />
            </Link>

            <div className="relative flex items-center w-full h-full justify-evenly">
                <LoginImg />
                <Login />
            </div>
        </div>
    )
}
