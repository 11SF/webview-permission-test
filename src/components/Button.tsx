import { ReactNode } from "react";

interface propsType {
  className?: string;
  label: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function Button(props: propsType) {
  return (
    <button
      className={`${props.className} h-[48px] text-[18px] text-[#4457E3] font-semibold border bg-white border-[#4457E3] rounded-[8px] hover:text-[#fff] hover:bg-[#4457E3] transition-colors duration-300 ease-in-out`}
      onClick={props.onClick}
    >
      {props.label}
      {props.children}
    </button>
  );
}
