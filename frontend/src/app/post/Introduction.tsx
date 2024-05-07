"use client";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import DropZoneImg from "./components/DropZoneImg";

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

        <DropZoneImg smallSize={false} />
      </div>
    </div>
  );
}
