import { useState, useEffect } from "react";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 不在伺服器端呈現
  }
  return (
    <button type="button" onClick={onClick}>
      <Icon size={size} className="mx-2 text-gray-400 hover:text-gray-800" />
    </button>
  );
}
