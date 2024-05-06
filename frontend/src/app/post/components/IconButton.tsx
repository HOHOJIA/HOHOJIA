interface IconButtonProps {
  icon: React.ElementType;
  size: string;
  onClick?: () => void;
}

export default function IconButton({
  icon: Icon,
  size,
  onClick,
}: IconButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      <Icon size={size} className="mx-2 text-gray-400 hover:text-gray-800" />
    </button>
  );
}
