import React from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Input } from "@nextui-org/react";

export default function PasswordBtn({
  label,
  size,
  value,
  invalid,
  onChanged,
  name,
}: {
  label: string;
  size: string;
  value?: string;
  invalid?: boolean;
  onChanged?: (value: string) => void; // onChanged 是一個接受字串參數，並且不傳回任何值的 function
  name: string;
}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChanged) {
      onChanged(e.target.value);
    }
  }

  return (
    <Input
      label={label}
      variant="bordered"
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <AiFillEyeInvisible className="text-2xl pointer-events-none text-default-400" />
          ) : (
            <AiFillEye className="text-2xl pointer-events-none text-default-400" />
          )}
        </button>
      }
      value={value}
      onChange={handleChange}
      type={isVisible ? "text" : "password"}
      size={size as "sm" | "md" | "lg"}
      className="max-w-xs"
      isInvalid={invalid}
      errorMessage="密碼不一致"
      name={name}
    />
  );
}
