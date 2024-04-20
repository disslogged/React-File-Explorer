import { useAppSelector } from "@/store/useStore";
import Explorer from "./Explorer";

const FileExplorer = () => {
  const explorerData = useAppSelector(store => store.explore);
  return (
    <div className="flex justify-center items-start w-full min-h-screen bg-black/90 py-16">
      {explorerData.map(dir => (
        <Explorer data={dir} key={dir.treeId} />
      ))}
    </div>
  );
};

export default FileExplorer;
