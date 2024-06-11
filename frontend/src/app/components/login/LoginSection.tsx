"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Input, Checkbox, Link } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import SignBar from "@/app/components/login/SignBar";
import LoginInfo from "@/app/components/login/LoginInfo";
import SignupInfo from "@/app/components/login/SignupInfo";

async function signupData(signupdata: object) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const res = await fetch(`${apiDomain}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupdata),
  });

  if (res.status === 200) {
    const responseData = await res.json();
    console.log("Response:", responseData);
    return responseData;
  } else {
    const responseData = await res.json();
    console.log("Error Response:", responseData);
    const errorMsg = responseData.error;

    throw new Error(errorMsg);
  }
}

async function loginData(logindata: object) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

  const res = await fetch(`${apiDomain}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logindata),
  });

  if (res.status === 200) {
    const responseData = await res.json();
    console.log("Response:", responseData);
    return responseData;
  } else {
    const responseData = await res.json();
    console.log("Error Response:", responseData);
    const errorMsg = responseData.error;

    throw new Error(errorMsg);
  }
}

export default function Login() {
  const [selected, setSelected] = useState("login");

  function handleSelected(selectState: string) {
    setSelected(selectState);
  }

  return (
    <div className="flex flex-col justify-center w-80 ">
      {/* 登入註冊 */}
      <div className="flex justify-center">
        <SignBar
          selected={selected}
          selectState="login"
          text="登入"
          onSelected={handleSelected}
        />
        <SignBar
          selected={selected}
          selectState="signup"
          text="註冊"
          onSelected={handleSelected}
        />
      </div>

      {/* 第三方登入 */}
      <div className="flex flex-wrap justify-center w-full gap-3 mt-3 mb-2 ">
        <p className="w-full text-center text-neutral-400">使用第三方登入</p>
        <Button
          isIconOnly
          color="default"
          variant="bordered"
          aria-label="google"
          className="mx-3 my-2 rounded-full"
        >
          <FcGoogle size="1.5rem" />
        </Button>
        <Button
          isIconOnly
          color="default"
          variant="bordered"
          aria-label="google"
          className="mx-3 my-2 rounded-full"
        >
          <FaFacebookF size="1.5rem" className="text-blue-700" />
        </Button>
      </div>

      {/* 分隔線 */}
      <div className="flex items-center justify-center gap-3">
        <hr className="w-2/5 h-0.5 bg-gray-200" />
        <p className="font-semibold text-neutral-400">Or</p>
        <hr className="w-2/5 h-0.5 bg-gray-200" />
      </div>

      {/* 登入資訊 */}
      {selected === "login" ? (
        <LoginInfo onSelected={handleSelected} loginData={loginData} />
      ) : (
        <SignupInfo onSelected={handleSelected} signupData={signupData} />
      )}
    </div>
  );
}
