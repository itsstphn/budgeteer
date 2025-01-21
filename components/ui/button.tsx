"use client";

interface ButtonProps {
  action: () => void;
  text: string;
}

export default function Button({ action, text }: ButtonProps) {
  return (
    <button
      onClick={action}
      className="border-dashed border-2 mb-2 border-slate-900 py-1 px-2"
    >
      {text}
    </button>
  );
}
