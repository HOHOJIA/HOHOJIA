"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Introduction from "@/app/components/post/Introduction";
import Description from "@/app/components/post/Description";
import Steps from "@/app/components/post/Steps";
import { totalImgUrl, setImgUrl } from "@/app/components/post/setImgUrl";
import {
  Card,
  CardHeader,
  CardBody,
  Textarea,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid lib
import Cookies from "js-cookie";
import useShowAlert from "@/hooks/useShowAlert";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
const S3_BUCKET_REGION = process.env.S3_BUCKET_REGION;
const BUCKET_NAME = process.env.BUCKET_NAME;

async function getImgUrl(file: File) {
  const queryParams = new URLSearchParams({ filename: file.name });

  try {
    const res = await fetch(
      `http://13.210.223.164/api/generate-presigned-url?${queryParams}`
    );

    const { presignedUrl } = await res.json();
    console.log(presignedUrl);

    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (uploadRes.status === 200) {
      console.log("File successfully uploaded");
      const imageUrl = `https://${BUCKET_NAME}.s3.${S3_BUCKET_REGION}.amazonaws.com/${encodeURIComponent(
        file.name
      )}`;
      setImgUrl(imageUrl);
    } else {
      console.error("Upload failed");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function postData(postdata: object) {
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
  const showAlert = useShowAlert();
  const [steps, setSteps] = useState([
    {
      id: uuidv4(),
      imgUrl: "",
      description: "",
      order: 1,
    },
  ]);
  const [ingredients, setIngredients] = useState([
    { id: uuidv4(), name: "", size: "" },
  ]);
  // 創建一個狀態來保存選中的標籤
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        // 按下確認後導向登入頁面
        showAlert("Oops...", "請先登入才能發佈食譜", "error").then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
      }
    };

    checkLogin();
  }, [showAlert]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // 1. form submit 後不會 reload
    event.preventDefault();

    // 2. 取得 form data
    const formData = new FormData(event.currentTarget);

    // 3. 將剩餘資料加入 formData
    formData.append("userId", "1");
    formData.append(
      "imgUrl",
      totalImgUrl.length > 0
        ? totalImgUrl[0]
        : "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg"
    );

    // 4. 將 formData 轉為 object
    const values = Object.fromEntries(formData.entries());

    // 將圖片加入到 steps 中
    const updatedSteps = steps.map((step) => {
      const imageUrl = totalImgUrl[step.order]
        ? totalImgUrl[step.order]
        : "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg";
      return { ...step, imgUrl: imageUrl };
    });

    const newValues = {
      ...values,
      tags: selectedTags,
      steps: updatedSteps,
      ingredients: ingredients,
    };
    console.log(newValues);

    postData(newValues)
      .then(() => {
        showAlert("Success!", "食譜已成功發佈", "success");
      })
      .catch(() => {
        showAlert("Oops...", "發佈食譜失敗，請稍後再試", "error");
      });
  }

  // 防止按下 Enter 後 form 會自動 submit
  function handleKeyDown(event: React.KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  return (
    <>
      <Header />
      <div className="flex justify-center w-full h-full bg-slate-50">
        <Card
          shadow="md"
          className="w-full py-4 my-4 md:w-10/12 lg:w-8/12 lg:my-12"
        >
          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
            <CardHeader className="flex-col items-start px-8 py-4 sm:px-12">
              <p className="text-xl font-bold border-b-2 pb-1.5 border-black mb-1.5">
                來分享你的美味秘訣吧！
              </p>
              {/* Introduction section */}
              <Introduction
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                getImgUrl={getImgUrl}
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
              <Steps steps={steps} setSteps={setSteps} getImgUrl={getImgUrl} />
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
