"use client";
import Introduction from "./Introduction";
import Description from "./Description";
import Steps from "./Steps";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function Post() {
  return (
    <div className="flex justify-center w-full h-full bg-slate-50">
      <Card shadow="md" className="w-8/12 py-4 my-12">
        <form action="">
          <CardHeader className="flex-col items-start px-12 py-4">
            <p className="text-xl font-bold border-b-2 pb-1.5 border-black mb-1.5">
              來分享你的美味秘訣吧！
            </p>
            <Introduction />
          </CardHeader>
          <CardBody className="flex-col items-start px-12 py-4">
            <p className="mb-4 text-xl font-bold border-b-2 border-black">
              料理細節
            </p>
            <Description />
            <hr className="w-full h-0.5 mt-10 mb-2 bg-gray-200" />
            <Steps />
            <hr className="w-full h-0.5 mt-3 mb-2 bg-gray-200" />
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
