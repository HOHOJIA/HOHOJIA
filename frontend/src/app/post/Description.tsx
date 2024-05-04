import { Input } from "@nextui-org/react";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";

export default function Description({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap justify-between w-full gap-5 sm:gap-x-20 sm:gap-y-5">
      <DescriptionInput
        p="份量&nbsp;"
        span="&nbsp;(人份)"
        placeholder="填入數量"
      />
      <DescriptionInput
        p="料理時間&nbsp;"
        span="&nbsp;(分鐘)"
        placeholder="填入時間"
      />
      <div className="hidden w-full sm:block">
        <p className="my-4 text-lg font-bold">食材&nbsp;</p>
        <div className="flex items-center ">
          <Input
            className="w-6/12 mr-4"
            type="text"
            label="食材名稱"
            variant="bordered"
          />
          <Input
            className="w-4/12 mx-4"
            type="text"
            label="份量"
            variant="bordered"
          />

          <div className="flex">
            <IconButton icon={FaPlus} size="1.5rem" />
            <IconButton icon={IoTrash} size="1.5rem" />
            <IconButton icon={IoReorderThreeOutline} size="1.5rem" />
          </div>
        </div>
      </div>
      <div className="w-full sm:hidden">
        <p className="my-4 text-lg font-bold">食材&nbsp;</p>
        <div className="flex flex-wrap items-center w-full">
          <div className="flex justify-end w-full mb-0.5">
            <IconButton icon={FaPlus} size="1.2rem" />
            <IconButton icon={IoTrash} size="1.2rem" />
          </div>
          <div className="flex w-full flex-nowrap">
            <IconButton icon={IoReorderThreeOutline} size="1.2rem" />
            <Input
              className="w-7/12 mr-2"
              type="text"
              label="食材名稱"
              variant="bordered"
            />
            <Input
              className="w-5/12 mx-2"
              type="text"
              label="份量"
              variant="bordered"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DescriptionInput({
  p,
  span,
  placeholder,
}: {
  p: string;
  span: string;
  placeholder: string;
}) {
  return (
    <div className="w-full sm:w-5/12">
      <p className="my-4 text-lg font-bold">
        {p}
        <span className="text-sm font-light text-slate-400">{span}</span>
      </p>
      <Input type="text" label={placeholder} variant="bordered" />
    </div>
  );
}
