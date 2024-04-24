import { BiImageAdd } from "react-icons/bi";
import { Textarea } from "@nextui-org/react";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";

export default function Steps() {
  return (
    <div className="w-full">
      <p className="my-4 text-lg font-bold">步驟</p>
      <EachOfStep order={1} />
      <EachOfStep order={2} />
      <EachOfStep order={3} />
    </div>
  );
}

function EachOfStep({ order }: { order: number }) {
  return (
    <div className="flex flex-wrap mt-5 mb-12 h-28">
      {/* icon */}
      <div className="flex justify-end w-full mb-0.5">
        <IconButton icon={FaPlus} size="1.2rem" />
        <IconButton icon={IoTrash} size="1.2rem" />
        <IconButton icon={IoReorderThreeOutline} size="1.2rem" />
      </div>

      <div className="flex w-full gap-5 flex-nowrap">
        {/* order */}
        <div className="flex items-center justify-center w-1/12 text-2xl font-medium bg-yellow-300 rounded-lg h-28">
          {order}
        </div>

        {/* dropzone */}
        <div className="flex items-center justify-center w-3/12 ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-28 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <BiImageAdd
                size="2.5rem"
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop (img or video)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

        {/* textarea */}
        <Textarea
          className="w-8/12"
          minRows={3}
          label="輸入食譜描述（最多150字）"
          variant="bordered"
        />
      </div>
    </div>
  );
}
