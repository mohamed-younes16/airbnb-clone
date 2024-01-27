import React, { ReactNode } from "react";

interface MenuItemProps {
  onclick: () => void;
  label?: string;
  children?:ReactNode
}
const MenuItem: React.FC<MenuItemProps> = ({ onclick, label ,children}) => {
  return (
    <div onClick={onclick} className=" cursor-pointer transition-all
     hover:bg-accent rounded-md w-full font-semibold px-3 py-2 ">
      {label} {children}
    </div>
  );
};

export default MenuItem;
