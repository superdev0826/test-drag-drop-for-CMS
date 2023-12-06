import TargetBox from "../../components/TargetBox";

export default function Content() {
  return (
    <div className="w-full h-[calc(100vh-128px)] min-h-[300px] border border-t-2 border-b-2 border-black overflow-auto">
      <TargetBox area="content" />
    </div>
  );
}
