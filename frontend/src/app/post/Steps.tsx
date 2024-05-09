import { Textarea } from "@nextui-org/react";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid lib
import DropZoneImg from "./components/DropZoneImg";

export default function Steps({
  steps,
  setSteps,
}: {
  steps: { id: string; image: string; description: string; order: number }[];
  setSteps: React.Dispatch<
    React.SetStateAction<
      { id: string; image: string; description: string; order: number }[]
    >
  >;
}) {
  // 用來達到 steps order 自動更新
  const prevSteps = useRef<
    { id: string; image: string; description: string; order: number }[]
  >([]);
  useEffect(() => {
    // 檢查目前的 steps 和上一次的 steps 是否相同
    const isSameSteps =
      JSON.stringify(steps) === JSON.stringify(prevSteps.current);

    // 如果不同，更新步驟的順序值
    if (!isSameSteps) {
      const updatedSteps = steps.map((step, index) => ({
        ...step,
        order: index + 1,
      }));
      setSteps(updatedSteps);
      prevSteps.current = steps;
    }
  }, [steps, setSteps]);

  function handleAddStep() {
    const newStep = {
      id: uuidv4(),
      image: "https://images.dog.ceo/breeds/appenzeller/n02107908_3450.jpg",
      description: "",
      order: steps.length + 1,
    };
    setSteps([...steps, newStep]);
  }

  function handleDelStep(id: string) {
    if (steps.length > 1) {
      setSteps((steps) => steps.filter((step) => step.id !== id));
    }
  }

  function handleChangeDescription(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const newStep = steps.map((step) =>
      step.id === id ? { ...step, description: event.target.value } : step
    );
    setSteps(newStep);
  }

  // console.log(steps);

  return (
    <div className="w-full">
      <p className="my-4 text-lg font-bold">步驟</p>
      {steps.map((step, index) => (
        <EachOfStep
          order={step.order}
          id={step.id}
          key={step.id}
          onClickAdd={handleAddStep}
          onClickDel={() => handleDelStep(step.id)}
          description={step.description}
          onChangeDescription={handleChangeDescription}
        />
      ))}
    </div>
  );
}

function EachOfStep({
  order,
  id,
  onClickAdd,
  onClickDel,
  description,
  onChangeDescription,
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
          value={description}
          onChange={(event) => onChangeDescription(event, id)}
        />
      </div>
    </div>
  );
}
