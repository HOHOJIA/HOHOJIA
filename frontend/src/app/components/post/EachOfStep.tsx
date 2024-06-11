"use client";
import { Textarea } from "@nextui-org/react";
import IconButton from "./IconButton";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DropZoneImg from "./DropZoneImg";

export function EachOfStep({
  order,
  id,
  onClickAdd,
  onClickDel,
  description,
  onChangeDescription,
  getImgUrl,
}: {
  order: number;
  id: string;
  onClickAdd: () => void;
  onClickDel: () => void;
  description: string;
  onChangeDescription: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  getImgUrl: (file: File, stepid: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={style}
      className="flex flex-wrap mt-5 mb-12 h-28"
    >
      <div className="flex items-end justify-between w-full mb-1 sm:items-center sm:justify-end">
        <div className="flex justify-center w-1/6 text-2xl font-medium bg-yellow-300 rounded-lg sm:hidden">
          {order}
        </div>
        <div className="flex flex-row">
          <div>
            <IconButton icon={FaPlus} size="1.2rem" onClick={onClickAdd} />
          </div>
          <div>
            <IconButton icon={IoTrash} size="1.2rem" onClick={onClickDel} />
          </div>
          <div {...listeners} className="w-1/3">
            <IconButton icon={IoReorderThreeOutline} size="1.2rem" />
          </div>
        </div>
      </div>

      <div className="flex w-full gap-5 mt-1 flex-nowrap">
        <div className="items-center justify-center hidden w-1/12 text-2xl font-medium bg-yellow-300 rounded-lg sm:flex h-28">
          {order}
        </div>

        <DropZoneImg smallSize={true} getImgUrl={getImgUrl} stepid={id} />

        <Textarea
          className="w-8/12"
          minRows={3}
          label="輸入食譜描述"
          variant="bordered"
          value={description}
          onChange={(event) => onChangeDescription(event, id)}
        />
      </div>
    </div>
  );
}
