import { TExplorerData } from "@/store/fileExplorerSlice";
import File from "./File";
import Folder from "./Folder";

const Explorer = ({ data }: { data: TExplorerData }) => {
  if (data.type === "file") {
    return <File name={data.name} treeId={data.treeId} />;
  }
  if (data.type === "folder") return <Folder folderData={data} />;
};

export default Explorer;
