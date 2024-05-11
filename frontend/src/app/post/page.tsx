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
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid lib
import Cookies from "js-cookie";

// 從 S3 拿到 url 時呼叫這個 function
// let totalImgUrl: string[] = [];
// function imgUrl(thisImgUrl: string) {
//   totalImgUrl.push(thisImgUrl);
//   return totalImgUrl;
// }

async function postData(postdata: object) {
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
  const token = Cookies.get("access_token");

  const res = await fetch(`${apiDomain}/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postdata),
  });

  if (res.status === 201) {
    const responseData = await res.json();
    console.log("Response:", responseData);
    return responseData;
  } else {
    const responseData = await res.json();
    console.log("Error Response:", responseData);
    throw new Error(responseData);
  }
}

export default function Post() {
  const [steps, setSteps] = useState([
    {
      id: uuidv4(),
      image: "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg",
      description: "",
      order: 1,
    },
  ]);

  const [ingredients, setIngredients] = useState([
    { id: uuidv4(), name: "", size: "" },
  ]);

  // 創建一個狀態來保存選中的標籤
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. form submit 後不會 reload
    event.preventDefault();

    // 2. 取得 form data
    const formData = new FormData(event.currentTarget);

    // 3. 將剩餘資料加入 formData
    formData.append("userId", "1");
    formData.append(
      "imgUrl",
      "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg"
    );

    // 4. 將 formData 轉為 object
    const values = Object.fromEntries(formData.entries());
    const newValues = {
      ...values,
      tags: selectedTags,
      steps: steps,
      ingredients: ingredients,
    };
    console.log(newValues);

    postData(newValues)
      .then(() => {
        alert("發佈成功！");
      })
      .catch(() => {
        alert("發佈失敗，請稍後重試");
      });
  }

  return (
    <>
      <Header />
      <div className="flex justify-center w-full h-full bg-slate-50">
        <Card
          shadow="md"
          className="w-full py-4 my-4 md:w-10/12 lg:w-8/12 lg:my-12"
        >
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex-col items-start px-8 py-4 sm:px-12">
              <p className="text-xl font-bold border-b-2 pb-1.5 border-black mb-1.5">
                來分享你的美味秘訣吧！
              </p>
              {/* Introduction section */}
              <Introduction
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </CardHeader>

            <CardBody className="flex-col items-start px-8 py-4 sm:px-12">
              <p className="mb-4 text-xl font-bold border-b-2 border-black">
                料理細節
              </p>
              {/* Description section */}
              <Description
                ingredients={ingredients}
                setIngredients={setIngredients}
              />
              <hr className="w-full h-0.5 mt-10 mb-2 bg-gray-200" />

              {/* Steps section */}
              <Steps steps={steps} setSteps={setSteps} />
              <hr className="w-full h-0.5 mt-3 mb-2 bg-gray-200" />

              {/* Cooking Tips section */}
              <div className="w-full">
                <p className="my-4 text-lg font-bold">廚神秘訣</p>
                <Textarea
                  minRows={5}
                  label="輸入食譜描述（最多150字）"
                  variant="bordered"
                  name="tip"
                />
              </div>

              {/* preview and submit buttons */}
              <div className="flex justify-center w-full my-10 gap-14">
                <Button className="text-black" color="primary" variant="ghost">
                  食譜預覽
                </Button>
                <Button color="primary" variant="solid" type="submit">
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
