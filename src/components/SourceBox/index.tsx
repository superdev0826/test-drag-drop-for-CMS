import type { ReactNode } from "react";
import { memo } from "react";
import type { DragSourceMonitor } from "react-dnd";
import { useDrag } from "react-dnd";

export interface SourceBoxProps {
  type: string;
  children?: ReactNode;
}

const SourceBox: React.FC<SourceBoxProps> = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [type]
  );

  return (
    <div
      ref={drag}
      className={`${isDragging ? "bg-gray-300" : "bg-white"}`}
      role="SourceBox"
      data-type={type}
    >
      {children}
    </div>
  );
};

export default memo(SourceBox);
