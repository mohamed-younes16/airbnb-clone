import { IconType } from "react-icons";
import TooltipComp from "../ui/TooltipComp";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { Input } from "../ui/input";

const CategoryInput = ({
  onClick,
  label,
  icon: Icon,
  selected,
  description,
}: {
  onClick: () => void;
  label: string;
  icon: IconType;
  selected: boolean;
  description: string;
}) => {
  return (
    <div>
      <TooltipComp hoverText={description}>
        <div
          onClick={() => onClick()}
          className={`flexcenter flex-col p-4 group relative  ${
            selected && "text-main "
          }    pb-2 hover:text-main transition  gap-1`}
        >
          <Icon size={25} />
          <p>{label}</p>
          <div
            className={`absolute transition-all  border-4 rounded-sm border-main bottom-0
             h-full left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2  ${
               selected ? "scale-100 skew-x-0" : "skew-x-[60deg] scale-0 "
             }`}
          ></div>
        </div>
      </TooltipComp>
    </div>
  );
};

export default CategoryInput;
