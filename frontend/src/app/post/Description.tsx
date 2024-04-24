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
    <div className="flex flex-wrap justify-between w-full gap-x-20 gap-y-5">
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
      <div className="w-full">
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
    <div className="w-5/12">
      <p className="my-4 text-lg font-bold">
        {p}
        <span className="text-sm font-light text-slate-400">{span}</span>
      </p>
      <Input type="text" label={placeholder} variant="bordered" />
    </div>
  );
}
