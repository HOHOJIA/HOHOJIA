import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid lib
import { EachOfStep } from "./EachOfStep";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
export default function Steps({
  steps,
  setSteps,
  getImgUrl,
}: {
  steps: { id: string; imageUrl: string; description: string; order: number }[];
  setSteps: React.Dispatch<
    React.SetStateAction<
      { id: string; imageUrl: string; description: string; order: number }[]
    >
  >;
  getImgUrl: (file: File, stepid: string) => void;
}) {
  // 用來達到 steps order 自動更新
  const prevSteps = useRef<
    { id: string; imageUrl: string; description: string; order: number }[]
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
      imageUrl: "",
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems.map((step, index) => ({
          ...step,
          order: index + 1,
        }));
      });
    }
  };
  return (
    <div className="w-full">
      <p className="my-4 text-lg font-bold">步驟</p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={steps} strategy={verticalListSortingStrategy}>
          {steps.map((step) => (
            <EachOfStep
              order={step.order}
              id={step.id}
              key={step.id}
              onClickAdd={handleAddStep}
              onClickDel={() => handleDelStep(step.id)}
              description={step.description}
              onChangeDescription={handleChangeDescription}
              getImgUrl={getImgUrl}
            />
          ))}{" "}
        </SortableContext>
      </DndContext>
    </div>
  );
}
