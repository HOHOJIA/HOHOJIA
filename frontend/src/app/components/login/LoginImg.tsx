import Image from "next/image";

export default function LoginImg() {
  return (
    <div className="hidden lg:block relative w-[40vw] h-[45vw]">
      <Image
        layout="fill"
        alt="login Img"
        src="/Login.png"
        className="z-0 rounded-lg"
      ></Image>
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#B1A149] opacity-30 rounded-lg"></div>
      <div className="absolute z-20 bg-yellow-300 rounded-full bottom-6 -right-20 w-[22vw] h-[22vw] ">
        <div className="absolute inset-0 flex justify-center items-center ">
          <img className="w-11/12 h-5/6" alt="logo" src="/Logo.png" />
          <div className="absolute  w-[3vw] h-[3vw] bg-yellow-300 rounded-full -top-6 -left-2 xl:-top-8 xl:left-4"></div>
        </div>
      </div>
      {/* <div className="absolute z-20  bg-yellow-300 rounded-full top-64 right-48 w-[4vw] h-[4vw]"></div> */}
    </div>
  );
}
