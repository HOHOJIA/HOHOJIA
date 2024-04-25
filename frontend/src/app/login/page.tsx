import Image from "next/image";
import { FiVideo } from "react-icons/fi";
export default function LoginPage() {
  return (
    <div className="flex justify-between items-center w-full h-screen relative">
      <LoginImg />
      <Login />
    </div>
  );
}

function LoginImg() {
  return (
    <div className="relative w-600 h-900 ml-20">
      <Image
        width={600}
        height={900}
        alt="login Img"
        src="/Login.png"
        className="z-0 rounded-lg"
      ></Image>
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#B1A149] opacity-30 rounded-lg"></div>
      <div className="absolute bottom-8 -right-20  z-20 rounded-full bg-yellow-300 w-80 h-80 ">
        <Image
          className="absolute z-30 top-7"
          width={288}
          height={288}
          alt="logo"
          src="/Logo.png"
        ></Image>
      </div>
      <div className="absolute  top-64 right-48 z-20 rounded-full bg-yellow-300 w-12 h-12"></div>
    </div>
  );
}

function Login() {
  return (
    <div className="w-1/3 h-4/5 flex border-4 mr-32">
      <div className="border-4 p-5 h-20 w-20">
        <p className="text-lg font-bold">登入</p>
      </div>
    </div>
  );
}
