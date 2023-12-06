import type { FC } from "react";
import { memo, useCallback, useState } from "react";
import type { DropTargetMonitor } from "react-dnd";
import { useDrop } from "react-dnd";
import { Area, DragItem } from "../../interface";
import { RootState, useAppDispatch, useAppSelector } from "../../store";
import { actions as appActions } from "../../store/app/slice";
import Card from "../Card";
import Button from "../Button";

interface TargetBoxProps {
  onDrop: (item: any) => void;
  lastDroppedElement?: string;
  area: Area;
}

const TargetBox: FC<TargetBoxProps> = memo(function TargetBox({
  onDrop,
  lastDroppedElement,
  area,
}) {
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state: RootState) => state.app);
  const elementState = useAppSelector((state: RootState) => state.element);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: elementState.elements[area].map((item) => `${area}-${item.id}`),
      drop(_item: DragItem, monitor) {
        onDrop(monitor.getItemType());
        return undefined;
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        draggingColor: monitor.getItemType() as string,
      }),
    }),
    [onDrop]
  );

  const handleRemove = (elemId: string) => {
    const newElements = appState[area].filter((i) => i !== elemId);
    dispatch(appActions.setState({ area, elements: newElements }));
  };

  const selectedElements = elementState.elements[area].filter((item) =>
    appState[area].includes(item.id)
  );

  return (
    <div
      ref={drop}
      data-type={lastDroppedElement || "none"}
      className={`w-full h-full ${isOver ? "bg-gray-300" : "bg-white"}`}
      role="TargetBox"
    >
      <div
        className={`px-20 w-full h-full flex items-center justify-center gap-4  ${
          area === "content" ? "!flex-col" : "flex-row"
        }`}
      >
        {selectedElements.map((item) =>
          area === "content" ? (
            <Card
              id={item.id}
              onRemove={handleRemove}
              key={`${area}-${item.id}`}
            />
          ) : (
            <Button
              id={item.id}
              area={area}
              onRemove={handleRemove}
              key={`${area}-${item.id}`}
            />
          )
        )}
      </div>
    </div>
  );
});

const StatefulTargetBox: FC<{ area: Area }> = (props) => {
  const { area } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector((state: RootState) => state.app);
  const [lastDroppedElement, setLastDroppedElement] = useState<string | null>(
    null
  );
  const handleDrop = useCallback(
    (element: string) => {
      if (element.startsWith(area)) {
        setLastDroppedElement(element);
        dispatch(
          appActions.setState({
            area,
            elements: [...appState[area], element.replace(`${area}-`, "")],
          })
        );
      }
    },
    [appState, area]
  );

  return (
    <TargetBox
      {...props}
      lastDroppedElement={lastDroppedElement as string}
      onDrop={handleDrop}
    />
  );
};

export default StatefulTargetBox;
