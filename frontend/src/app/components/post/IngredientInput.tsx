import IconButton from "./IconButton";
import { Input } from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";

export default function IngredientInput({
  id,
  onAddIngre,
  onDelIngre,
  isMobile,
  name,
  size,
  onChangeIngreName,
  onChangeIngreSize,
}: {
  id: string;
  onAddIngre: () => void;
  onDelIngre: (id: string) => void;
  isMobile: boolean;
  name: string;
  size: string;
  onChangeIngreName: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  onChangeIngreSize: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
}) {
  return (
    <div
      className={`flex items-center ${isMobile ? "flex-wrap  w-full" : "my-4"}`}
      key={id}
    >
      {isMobile && (
        <div className="flex justify-end w-full mb-0.5">
          <IconButton icon={FaPlus} size="1.2rem" onClick={onAddIngre} />
          <IconButton
            icon={IoTrash}
            size="1.2rem"
            onClick={() => onDelIngre(id)}
          />
        </div>
      )}

      <div className={`flex w-full ${isMobile ? "flex-nowrap" : ""}`}>
        {isMobile && <IconButton icon={IoReorderThreeOutline} size="1.2rem" />}
        <div className={isMobile ? "w-7/12 mr-2" : "w-6/12 mr-4"}>
          <Input
            type="text"
            label="食材名稱"
            variant="bordered"
            value={name}
            onChange={(event) => onChangeIngreName(event, id)}
          />
        </div>
        <div className={isMobile ? "w-5/12 mx-2" : "w-4/12 mx-4"}>
          <Input
            type="text"
            label="份量"
            variant="bordered"
            value={size}
            onChange={(event) => onChangeIngreSize(event, id)}
          />
        </div>
        {!isMobile && (
          <div className="flex">
            <IconButton icon={FaPlus} size="1.5rem" onClick={onAddIngre} />
            <IconButton
              icon={IoTrash}
              size="1.5rem"
              onClick={() => onDelIngre(id)}
            />

            <IconButton icon={IoReorderThreeOutline} size="1.5rem" />
          </div>
        )}
      </div>
    </div>
  );
}
