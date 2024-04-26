"use client";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { BiImageAdd } from "react-icons/bi";

export default function Introduction() {
  const category = [
    { id: 1, name: "肉類" },
    { id: 2, name: "蔬食" },
    { id: 3, name: "甜點" },
    { id: 4, name: "中式" },
    { id: 5, name: "西式" },
  ];

  return (
    <div className="w-full">
      <p className="my-4 text-lg font-bold">介紹</p>

      <div className="grid grid-cols-3 gap-6">
        <Input
          className="col-span-2"
          type="text"
          label="食譜標題"
          variant="bordered"
        />

        <Select
          label="選擇標籤"
          selectionMode="multiple"
          variant="bordered"
          className="max-w-xs"
        >
          {category.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </Select>

        <Textarea
          className="col-span-3"
          minRows={5}
          label="輸入食譜描述（最多150字）"
          variant="bordered"
        />

        <div className="flex items-center justify-center w-full col-span-3">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <BiImageAdd
                size="4rem"
                className="mb-2 text-gray-500 dark:text-gray-400"
              />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (Recommendation is 2.63:1 horizontal image,
                1230x468px or above)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}
