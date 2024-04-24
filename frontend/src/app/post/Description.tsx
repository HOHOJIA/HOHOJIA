import { Input, Select, SelectItem } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";

export default function Description() {
  return (
    <div className="flex flex-wrap justify-between w-full gap-x-20 gap-y-5">
      <div className="w-5/12">
        <p className="my-4 text-lg font-bold">
          份量&nbsp;
          <span className="text-sm font-light text-slate-400">
            &nbsp;(人份)
          </span>
        </p>
        <Input type="text" label="填入數量" variant="bordered" />
      </div>
      <div className="w-5/12">
        <p className="my-4 text-lg font-bold">
          料理時間&nbsp;
          <span className="text-sm font-light text-slate-400">
            &nbsp;(分鐘)
          </span>
        </p>
        <Input type="text" label="填入時間" variant="bordered" />
      </div>
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
            <button type="button">
              <FaPlus
                size="1.5rem"
                className="mx-2 text-gray-400 hover:text-gray-800"
              />
            </button>
            <button type="button">
              <IoTrash
                size="1.5rem"
                className="mx-2 text-gray-400 hover:text-gray-800"
              />
            </button>
            <button type="button">
              <IoReorderThreeOutline
                size="1.5rem"
                className="mx-2 text-gray-400 hover:text-gray-800"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
