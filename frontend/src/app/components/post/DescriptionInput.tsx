import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function DescriptionInput({
  p,
  span,
  placeholder,
  name,
}: {
  p: string;
  span: string;
  placeholder: string;
  name: string;
}) {
  const [value, setValue] = useState(1);
  const [isInValid, setIsInValid] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    if (!/^\d+$/.test(input)) {
      setIsInValid(true);
    } else {
      setIsInValid(false);
    }

    const sizeValue = input !== "" ? parseInt(input) : 0;
    setValue(sizeValue);
  }

  return (
    <div className="w-full sm:w-5/12">
      <p className="my-4 text-lg font-bold">
        {p}
        <span className="text-sm font-light text-slate-400">{span}</span>
      </p>
      <Input
        type="text"
        label={placeholder}
        variant="bordered"
        name={name}
        value={value.toString()}
        onChange={handleChange}
        isInvalid={isInValid}
        errorMessage={isInValid && "Please enter number only."}
      />
    </div>
  );
}
