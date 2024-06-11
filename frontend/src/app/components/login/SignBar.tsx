export default function SignBar({
  selected,
  selectState,
  text,
  onSelected,
}: {
  selected: string;
  selectState: string;
  text: string;
  onSelected: (selectState: string) => void;
}) {
  return (
    <button
      className={`border-t-4 h-20 w-28  ${
        selected === selectState ? "border-t-yellow-300" : ""
      }`}
      onClick={() => onSelected(selectState)}
    >
      <p
        className={`text-lg font-bold text-center  ${
          selected === selectState ? "" : "text-gray-300"
        }`}
      >
        {text}
      </p>
    </button>
  );
}
