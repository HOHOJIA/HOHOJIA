"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Input, Checkbox, Link } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Cookies from "js-cookie";

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
        <LoginInfo onSelected={handleSelected} />
      ) : (
        <SignupInfo onSelected={handleSelected} />
      )}
    </div>
  );
}

function SignBar({
  selected,
  selectState,
  text,
  onSelected,
}: {
  selected: string;
  selectState: string;
  text: string;
  onSelected: (selectState: string) => void;
}) {
  return (
    <button
      className={`border-t-4 h-20 w-28  ${
        selected === selectState ? "border-t-yellow-300" : ""
      }`}
      onClick={() => onSelected(selectState)}
    >
      <p
        className={`text-lg font-bold text-center  ${
          selected === selectState ? "" : "text-gray-300"
        }`}
      >
        {text}
      </p>
    </button>
  );
}

function LoginInfo({
  onSelected,
}: {
  onSelected: (selectState: string) => void;
}) {
  function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const values = Object.fromEntries(formData.entries());
    console.log(values);

    loginData(values)
      .then((responseData) => {
        Cookies.set("access_token", responseData.data.access_token, {
          expires: 7,
        });
        alert("登入成功！");
        window.location.href = "/"; // login success, redirect to home page
      })
      .catch((error) => {
        alert(`登入失敗，${error.error}`);
      });
  }

  return (
    <form onSubmit={handleLoginSubmit}>
      <div className="flex flex-wrap justify-center gap-5 my-5 ">
        <Input
          type="email"
          label="電子信箱"
          variant="bordered"
          className="max-w-xs"
          name="email"
        />
        <PasswordBtn label="密碼" size="md" name="password" />

        <div className="flex justify-between w-full px-5 my-5">
          <Checkbox defaultSelected size="sm">
            <p className="text-neutral-400">記住登入資訊</p>
          </Checkbox>

          <Link href="" size="sm" underline="always" className="text-amber-400">
            忘記密碼？
          </Link>
        </div>
      </div>
      <SubmitBtn
        btn="登入"
        hint="HOHOJIA新夥伴嗎？"
        changeBtn="來去註冊"
        selectState="signup"
        onSelected={onSelected}
      />
    </form>
  );
}

function SignupInfo({
  onSelected,
}: {
  onSelected: (selectState: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdCheck, setPwdCheck] = useState(false);

  // 使用者輸入確認密碼後才進行檢查，而不是在用戶還沒有輸入確認密碼就立即觸發(pwdCheck 已經被設定為 true)
  useEffect(() => {
    setPwdCheck(password !== pwdConfirm && pwdConfirm !== "");
  }, [password, pwdConfirm]);

  function handleSignUpSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.delete("pwdConfirm");

    const values = Object.fromEntries(formData.entries());
    console.log(values);

    signupData(values)
      .then(() => {
        alert("註冊成功！");
      })
      .catch((error) => {
        alert(`註冊失敗，${error}`);
      });
  }

  return (
    <form onSubmit={handleSignUpSubmit}>
      <div className="flex flex-wrap justify-center gap-5 my-5 ">
        <Input
          type="text"
          label="使用者名稱"
          variant="bordered"
          className="max-w-xs"
          size="sm"
          name="name"
        />
        <Input
          type="email"
          label="電子信箱"
          variant="bordered"
          className="max-w-xs"
          size="sm"
          name="email"
        />
        <PasswordBtn
          label="密碼"
          size="sm"
          value={password}
          invalid={false}
          onChanged={setPassword}
          name="password"
        />
        <PasswordBtn
          label="再次輸入密碼"
          size="sm"
          value={pwdConfirm}
          invalid={pwdCheck}
          onChanged={setPwdConfirm}
          name="pwdConfirm"
        />
      </div>
      <SubmitBtn
        btn="註冊"
        hint="已經加入HOHOJIA了嗎？"
        changeBtn="來去登入"
        selectState="login"
        onSelected={onSelected}
      />
    </form>
  );
}

function PasswordBtn({
  label,
  size,
  value,
  invalid,
  onChanged,
  name,
}: {
  label: string;
  size: string;
  value?: string;
  invalid?: boolean;
  onChanged?: (value: string) => void; // onChanged 是一個接受字串參數，並且不傳回任何值的 function
  name: string;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChanged) {
      onChanged(e.target.value);
    }
  }

  return (
    <Input
      label={label}
      variant="bordered"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <AiFillEyeInvisible className="text-2xl pointer-events-none text-default-400" />
          ) : (
            <AiFillEye className="text-2xl pointer-events-none text-default-400" />
          )}
        </button>
      }
      value={value}
      onChange={handleChange}
      type={isVisible ? "text" : "password"}
      size={size as "sm" | "md" | "lg"}
      className="max-w-xs"
      isInvalid={invalid}
      errorMessage="密碼不一致"
      name={name}
    />
  );
}

function SubmitBtn({
  btn,
  hint,
  changeBtn,
  selectState,
  onSelected,
}: {
  btn: string;
  hint: string;
  changeBtn: string;
  selectState: string;
  onSelected: (selectState: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-5  mt-5">
      <Button
        color="primary"
        size="lg"
        className="w-full font-medium"
        type="submit"
      >
        {btn}
      </Button>
      <div className="flex justify-center">
        <p className="items-center text-sm text-neutral-400">{hint}</p>
        <button
          className="text-sm underline text-amber-400 hover:text-amber-500"
          onClick={() => onSelected(selectState)}
        >
          {changeBtn}
        </button>
      </div>
    </div>
  );
}
