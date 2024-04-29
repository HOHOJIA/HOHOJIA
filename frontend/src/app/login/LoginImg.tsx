import Image from "next/image";

export default function LoginImg() {
  return (
    <div className="relative">
      <Image
        width={600}
        height={900}
        alt="login Img"
        src="/Login.png"
        className="z-0 rounded-lg"
      ></Image>
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#B1A149] opacity-30 rounded-lg"></div>
      <div className="absolute z-20 bg-yellow-300 rounded-full w-80 bottom-6 -right-20 h-80 ">
        <Image
          className="absolute z-30 top-7"
          width={288}
          height={288}
          alt="logo"
          src="/Logo.png"
        ></Image>
      </div>
      <div className="absolute z-20 w-12 h-12 bg-yellow-300 rounded-full top-64 right-48"></div>
    </div>
  );
}
