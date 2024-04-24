"use client";
import Introduction from "./Introduction";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function Post() {
  return (
    <div className="bg-slate-50 w-full h-full flex justify-center">
      <Card shadow="md" className="py-4 my-12 w-8/12">
        <form action="">
          <CardHeader className="py-4 px-12 flex-col items-start">
            <p className="text-xl font-bold border-b-2 pb-1.5 border-black mb-1.5">
              來分享你的美味秘訣吧！
            </p>
            <Introduction />
          </CardHeader>
          <CardBody className="py-4 px-12 flex-col items-start">
            <p className="text-xl font-bold border-b-2 mb-4 border-black">
              料理細節
            </p>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
