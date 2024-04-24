"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { TbBellRinging2Filled } from "react-icons/tb";

export default function Header() {
    const pathname = usePathname();

    function isActive(path: string) {
        return pathname === path;
    }

    return (
        <div className="z-50 flex flex-row items-center justify-between w-full py-2 bg-white drop-shadow-lg px-7">
            <Image
                alt="HOHOJIA"
                src="/images/logo_HOHOJIA.webp"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "10%", height: "auto" }}
            />

            <div className="absolute flex gap-10 mx-auto text-sm transform -translate-x-1/2 left-1/2">
                <Link
                    href="/"
                    className={`hover:text-black transition-colors duration-300 ${
                        isActive("/")
                            ? "border-b-3 border-yellow-500 text-black"
                            : "text-gray-500"
                    }`}
                >
                    HOJIA食譜
                </Link>
                <Link
                    href="/"
                    className={`hover:text-black transition-colors duration-300 ${
                        isActive("/secondhand")
                            ? "border-b-3 border-yellow-500 text-black"
                            : "text-gray-400"
                    }`}
                >
                    二手廚具底JIA
                </Link>
            </div>

            <div className="flex items-center gap-5">
                <Input
                    size="md"
                    key="outside"
                    type=""
                    label=""
                    placeholder="搜尋食譜"
                    className="mr-2 bg-white"
                    classNames={{
                        label: "",
                        input: "",
                        innerWrapper: "",
                        inputWrapper:
                            "pr-0 pl-4 border-yellow-300 rounded-md border-1 ",
                    }}
                    endContent={
                        <Button
                            className="p-0 rounded-s-none rounded-e-sm"
                            color="primary"
                            isIconOnly
                            style={{ height: "100%" }}
                            startContent={<FaSearch />}
                        />
                    }
                />
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
            </div>
        </div>
    );
}
