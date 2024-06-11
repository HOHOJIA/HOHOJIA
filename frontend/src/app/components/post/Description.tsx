import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // 引入 uuid lib
import IngredientInput from "@/app/components/post/IngredientInput";
import DescriptionInput from "@/app/components/post/DescriptionInput";

export default function Description({
  ingredients,
  setIngredients,
}: {
  ingredients: { id: string; name: string; size: string }[];
  setIngredients: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; size: string }[]>
  >;
}) {
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
    const newIngredient = { id: uuidv4(), name: "", size: "" };
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

  function handleChangeIngreName(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const newIngredient = ingredients.map((ingredient) =>
      ingredient.id === id
        ? { ...ingredient, name: event.target.value }
        : ingredient
    );
    setIngredients(newIngredient);
  }

  function handleChangeIngreSize(
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    const newIngredient = ingredients.map((ingredient) =>
      ingredient.id === id
        ? { ...ingredient, size: event.target.value }
        : ingredient
    );
    setIngredients(newIngredient);
  }

  // console.log(ingredients);

  return (
    <div className="flex flex-wrap justify-between w-full gap-5 sm:gap-x-20 sm:gap-y-5">
      <DescriptionInput
        p="份量&nbsp;"
        span="&nbsp;(人份)"
        placeholder="填入數量"
        name="quantity"
      />
      <DescriptionInput
        p="料理時間&nbsp;"
        span="&nbsp;(分鐘)"
        placeholder="填入時間"
        name="cookTime"
      />

      <div className="w-full">
        <p className="my-4 text-lg font-bold">食材&nbsp;</p>
        {ingredients.map((ingredient) => (
          <IngredientInput
            key={ingredient.id}
            id={ingredient.id}
            onAddIngre={handleAddIngredient}
            onDelIngre={handleDelIngredient}
            isMobile={isMobile}
            name={ingredient.name}
            size={ingredient.size}
            onChangeIngreName={handleChangeIngreName}
            onChangeIngreSize={handleChangeIngreSize}
          />
        ))}
      </div>
    </div>
  );
}
