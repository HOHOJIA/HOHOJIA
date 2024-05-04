"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Introduction from "./Introduction";
import Description from "./Description";
import Steps from "./Steps";
import {
  Card,
  CardHeader,
  CardBody,
  Textarea,
  Button,
} from "@nextui-org/react";

export default function Post() {
  return (
    <>
      <Header />
      <div className="flex justify-center w-full h-full bg-slate-50">
        <Card
          shadow="md"
          className="w-full py-4 my-4 md:w-10/12 lg:w-8/12 lg:my-12"
        >
          <form action="">
            <CardHeader className="flex-col items-start px-8 py-4 sm:px-12">
              <p className="text-xl font-bold border-b-2 pb-1.5 border-black mb-1.5">
                來分享你的美味秘訣吧！
              </p>
              {/* Introduction section */}
              <Introduction />
            </CardHeader>

            <CardBody className="flex-col items-start px-8 py-4 sm:px-12">
              <p className="mb-4 text-xl font-bold border-b-2 border-black">
                料理細節
              </p>
              {/* Description section */}
              <Description />
              <hr className="w-full h-0.5 mt-10 mb-2 bg-gray-200" />

              {/* Steps section */}
              <Steps />
              <hr className="w-full h-0.5 mt-3 mb-2 bg-gray-200" />

              {/* Cooking Tips section */}
              <div className="w-full">
                <p className="my-4 text-lg font-bold">廚神秘訣</p>
                <Textarea
                  minRows={5}
                  label="輸入食譜描述（最多150字）"
                  variant="bordered"
                />
              </div>

              {/* preview and submit buttons */}
              <div className="flex justify-center w-full my-10 gap-14">
                <Button className="text-black" color="primary" variant="ghost">
                  食譜預覽
                </Button>
                <Button color="primary" variant="solid">
                  發佈食譜
                </Button>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
      <Footer />
    </>
  );
}
