"use client";

import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
    const router = useRouter();
    const footerContents = [
        {
            title: "認識厚呷",
            links: [
                { title: "關於我們", href: "/about" },
                { title: "厚呷夥伴", href: "/partners" },
                { title: "隱私權條款", href: "/privacy" },
            ],
        },
        {
            title: "食譜",
            links: [
                { title: "熱門食譜", href: "/" },
                { title: "最新食譜", href: "/" },
                { title: "全部分類", href: "/" },
                { title: "發布食譜", href: "/" },
            ],
        },
        {
            title: "二手廚具",
            links: [
                { title: "熱門廚具", href: "/" },
                { title: "最新廚具", href: "/" },
                { title: "全部分類", href: "/" },
                { title: "刊登廚具", href: "/" },
            ],
        },
        {
            title: "會員",
            links: [
                { title: "個人頁面", href: "/" },
                { title: "帳號設定", href: "/" },
                { title: "常見問題", href: "/" },
            ],
        },
    ];

    return (
        <div className="flex flex-col items-center w-full gap-8 px-6 bg-white border-yellow-300 lg:flex-row lg:justify-between lg:px-20 py-14 border-t-1">
            <div className="flex flex-col items-center gap-4 lg:items-start">
                <Image
                    alt="HOHOJIA"
                    src="/images/logo_HOHOJIA.webp"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "55%", height: "auto" }}
                />
                <p className="text-center lg:text-start">
                    讓每一次料理都能成為一段美好食光！
                </p>
            </div>

            <div className="flex gap-12">
                {footerContents.map((content, index) => (
                    <div
                        key={index}
                        className="hidden lg:flex lg:flex-col lg:gap-5"
                    >
                        <h4 className="font-bold underline underline-offset-8 decoration-2">
                            {content.title}
                        </h4>
                        <div className="flex flex-col gap-2">
                            {content.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="text-sm transition-colors duration-300 hover:text-gray-500"
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="flex flex-col items-center gap-5 lg:items-start">
                    <h4 className="font-bold underline underline-offset-8 decoration-2">
                        聯絡我們
                    </h4>
                    <Link
                        href={"https://maps.app.goo.gl/hMwnkDb3Zk3913aq7"}
                        className="text-sm transition-colors duration-300 hover:text-gray-500"
                    >
                        116台北市文山區指南路二段64號
                    </Link>
                    <div className="flex gap-3">
                        <Link href={"https://www.facebook.com"} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaFacebookF size={16} />}
                            />
                        </Link>
                        <Link
                            href={"https://www.instagram.com"}
                            target="_blank"
                        >
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaInstagram size={16} />}
                            />
                        </Link>
                        <Link href={"https://www.twitter.com"} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaTwitter size={16} />}
                            />
                        </Link>
                        <Link href={"https://www.youtube.com"} target="_blank">
                            <Button
                                className="transition-colors duration-300"
                                color="primary"
                                isIconOnly
                                size="sm"
                                radius="full"
                                startContent={<FaYoutube size={16} />}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
