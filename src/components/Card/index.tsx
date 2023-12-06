import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import { ColorResult, SliderPicker } from "react-color";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
} from "use-file-picker/validators";
import { FileContent } from "use-file-picker/types";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { actions as elementActions } from "../../store/element/slice";

type CardProps = {
  id: string;
  isStatic?: boolean;
  onRemove?: (arg: string) => void;
};

const defaultImage = "/assets/images/skeleton.webp";

const Card: React.FC<CardProps> = ({ id, isStatic, onRemove }) => {
  const dispatch = useAppDispatch();
  const elementState = useAppSelector((state: RootState) => state.element);
  const [isEditingText, setIsEditingText] = useState<boolean>(false);

  useEffect(() => {
    if (elementState.editable) {
      setIsEditingText(false);
    }
  }, [elementState.editable]);

  const { text, color, image } =
    elementState.elements.content?.find((e) => e.id === id) ?? {};

  const { openFilePicker } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      new FileTypeValidator(["jpg", "png", "jpeg", "gif"]),
    ],
    onFilesSuccessfullySelected: ({ filesContent }) => {
      dispatch(
        elementActions.setElement({
          area: "content",
          id,
          image: filesContent[0],
        })
      );
    },
  });

  const handleChangeTextColor = (color: ColorResult) => {
    dispatch(
      elementActions.setElement({
        area: "content",
        id,
        color: color.hex,
      })
    );
  };
  const handleEditText = (isEdit: boolean) => () => {
    setIsEditingText(isEdit);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      elementActions.setElement({
        area: "content",
        id,
        text: e.target.value,
      })
    );
  };

  const editable = !isStatic && (isEditingText || elementState.editable);

  return (
    <div className="relative w-full min-w-[200px] min-h-[130px] flex flex-row border-[2px] border-black p-[10px] gap-2">
      <div
        className={`relative overflow-hidden flex items-center justify-center ${
          isStatic
            ? "w-[60px] min-w-[60px] h-[60px] min-h-[60px]"
            : "w-[100px] min-w-[100px] h-[100px] min-h-[100px]"
        } ${editable ? "outline outline-4 rounded-sm" : "outline-0"}`}
      >
        <img src={(image as FileContent<string>).content ?? defaultImage} />
        {editable && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={openFilePicker}
          >
            <PencilIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
      </div>
      {!isStatic && (
        <div
          className="absolute right-[-10px] top-[-10px] cursor-pointer"
          onClick={() => onRemove && onRemove(id)}
        >
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      {editable ? (
        <div className="w-full">
          <textarea
            value={text}
            onChange={handleChangeText}
            className={`w-full h-[70px]`}
            style={{ color }}
          />
          <SliderPicker
            color={color}
            onChange={handleChangeTextColor}
            className="w-full"
          />
        </div>
      ) : (
        <>
          <div>
            <p className={`text-left break-all`} style={{ color }}>
              {text}
            </p>
          </div>
        </>
      )}
      {!isStatic &&
        !elementState.editable &&
        (isEditingText ? (
          <>
            <div
              className="absolute right-[20px] top-[-12px] cursor-pointer"
              onClick={handleEditText(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </div>
          </>
        ) : (
          <>
            <div
              className="absolute right-[20px] top-[-10px] cursor-pointer"
              onClick={handleEditText(true)}
            >
              <PencilIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </>
        ))}
    </div>
  );
};

export default Card;
