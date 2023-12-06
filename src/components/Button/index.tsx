import { TrashIcon } from "@heroicons/react/20/solid";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { actions as elementActions } from "../../store/element/slice";

import { Area } from "../../interface";

type ButtonProps = {
  id: string;
  area: Area;
  isStatic?: boolean;
  onRemove?: (arg: string) => void;
};

const Button: React.FC<ButtonProps> = ({ id, area, isStatic, onRemove }) => {
  const dispatch = useAppDispatch();
  const elementState = useAppSelector((state: RootState) => state.element);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(elementActions.setElement({ area, id, text: e.target.value }));
  };

  const text = elementState.elements[area]?.find((e) => e.id === id)?.text;

  return (
    <button className="relative w-[100px] h-[30px] border-[1px] border-black shadow-md">
      {!isStatic && elementState.editable ? (
        <input value={text} onChange={handleChangeText} className="w-full" />
      ) : (
        <div>
          <p className="overflow-hidden text-ellipsis">{text}</p>
        </div>
      )}
      {!isStatic && (
        <div
          className="absolute right-[-10px] top-[-10px] cursor-pointer"
          onClick={() => onRemove && onRemove(id)}
        >
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
    </button>
  );
};

export default Button;
