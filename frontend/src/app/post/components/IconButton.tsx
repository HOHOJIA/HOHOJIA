interface IconButtonProps {
  icon: React.ElementType;
  size: string;
}

export default function IconButton({ icon: Icon, size }: IconButtonProps) {
  return (
    <button type="button">
      <Icon size={size} className="mx-2 text-gray-400 hover:text-gray-800" />
    </button>
  );
}
