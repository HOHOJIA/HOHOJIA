import { BiImageAdd } from "react-icons/bi";
import { Textarea } from "@nextui-org/react";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";

export default function Steps() {
  const [steps, setSteps] = useState([{ id: 1 }]);

  function handleAddStep() {
    const newStep = { id: steps.length + 1 };
    setSteps([...steps, newStep]);
  }

  function handleDelStep(id: number) {
    if (steps.length > 1) {
      setSteps((steps) => steps.filter((step) => step.id !== id));
    }
  }

  return (
    <div className="w-full">
      <p className="my-4 text-lg font-bold">步驟</p>
      {steps.map((step, index) => (
        <EachOfStep
          order={index + 1}
          key={step.id}
          onClickAdd={handleAddStep}
          onClickDel={() => handleDelStep(step.id)}
        />
      ))}
    </div>
  );
}

function EachOfStep({
  order,
  onClickAdd,
  onClickDel,
}: {
  order: number;
  onClickAdd: () => void;
  onClickDel: () => void;
}) {
  return (
    <div className="flex flex-wrap mt-5 mb-12 h-28">
      {/* icon */}
      <div className="flex items-end justify-between w-full mb-1 sm:items-center sm:justify-end">
        <div className="flex justify-center w-1/6 text-2xl font-medium bg-yellow-300 rounded-lg sm:hidden">
          {order}
        </div>
        <div>
          <IconButton icon={FaPlus} size="1.2rem" onClick={onClickAdd} />
          <IconButton icon={IoTrash} size="1.2rem" onClick={onClickDel} />
          <IconButton icon={IoReorderThreeOutline} size="1.2rem" />
        </div>
      </div>

      <div className="flex w-full gap-5 mt-1 flex-nowrap">
        {/* order */}
        <div className="items-center justify-center hidden w-1/12 text-2xl font-medium bg-yellow-300 rounded-lg sm:flex h-28">
          {order}
        </div>

        {/* dropzone */}
        <div className="flex items-center justify-center w-4/12 sm:w-3/12 ">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer sm:h-28 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center md:py-5">
              <BiImageAdd
                size="2rem"
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="hidden text-sm font-semibold text-center text-gray-500 md:block dark:text-gray-400">
                Click to upload
                <span className="hidden font-normal xl:inline-block">
                  &nbsp;or drag and drop
                </span>
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>

        {/* textarea */}
        <Textarea
          className="w-8/12"
          minRows={3}
          label="輸入食譜描述"
          variant="bordered"
        />
      </div>
    </div>
  );
}
