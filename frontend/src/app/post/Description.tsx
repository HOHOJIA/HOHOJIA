import { Input } from "@nextui-org/react";
import IconButton from "./components/IconButton";
import { FaPlus } from "react-icons/fa6";
import { IoTrash, IoReorderThreeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid lib

export default function Description({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [ingredients, setIngredients] = useState([{ id: uuidv4() }]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleAddIngredient() {
    const newIngredient = { id: uuidv4() };
    setIngredients([...ingredients, newIngredient]);
  }

  function handleDelIngredient(id: string) {
    if (ingredients.length > 1) {
      setIngredients((ingredients) =>
        ingredients.filter((ingredient) => ingredient.id !== id)
      );
    } //else if (ingredients.length === 1) {
    // }
  }

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
        {ingredients.map((ingredient) => (
          <IngredientInput
            key={ingredient.id}
            id={ingredient.id}
            onAddIngre={handleAddIngredient}
            onDelIngre={handleDelIngredient}
            isMobile={isMobile}
          />
        ))}
      </div>
      <div className="w-full sm:hidden">
        <p className="my-4 text-lg font-bold">食材&nbsp;</p>
        {ingredients.map((ingredient) => (
          <IngredientInput
            key={ingredient.id}
            id={ingredient.id}
            onAddIngre={handleAddIngredient}
            onDelIngre={handleDelIngredient}
            isMobile={isMobile}
          />
        ))}
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

function IngredientInput({
  id,
  onAddIngre,
  onDelIngre,
  isMobile,
}: {
  id: string;
  onAddIngre: () => void;
  onDelIngre: (id: string) => void;
  isMobile: boolean;
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
          <Input type="text" label="食材名稱" variant="bordered" />
        </div>
        <div className={isMobile ? "w-5/12 mx-2" : "w-4/12 mx-4"}>
          <Input type="text" label="份量" variant="bordered" />
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
