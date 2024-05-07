import { BiImageAdd } from "react-icons/bi";
import { Textarea } from "@nextui-org/react";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid lib
import DropZoneImg from "./components/DropZoneImg";

export default function Steps() {
  const [steps, setSteps] = useState([{ id: uuidv4() }]);

  function handleAddStep() {
    const newStep = { id: uuidv4() };
    setSteps([...steps, newStep]);
  }

  function handleDelStep(id: string) {
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
        <DropZoneImg smallSize={true} />

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
