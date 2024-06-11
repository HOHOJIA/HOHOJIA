import { Button } from "@nextui-org/react";

export default function SubmitBtn({
  btn,
  hint,
  changeBtn,
  selectState,
  onSelected,
}: {
  btn: string;
  hint: string;
  changeBtn: string;
  selectState: string;
  onSelected: (selectState: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-5  mt-5">
      <Button
        color="primary"
        size="lg"
        className="w-full font-medium"
        type="submit"
      >
        {btn}
      </Button>
      <div className="flex justify-center">
        <p className="items-center text-sm text-neutral-400">{hint}</p>
        <button
          className="text-sm underline text-amber-400 hover:text-amber-500"
          onClick={() => onSelected(selectState)}
        >
          {changeBtn}
        </button>
      </div>
    </div>
  );
}
