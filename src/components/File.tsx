import { useState, type MouseEvent } from "react";
import { useAppDispatch } from "@/store/useStore";
import { FaFile } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { removeItem } from "@/store/fileExplorerSlice";
import { iconsData } from "@/constants/fileIcons";

const File = ({ name, treeId }: { name: string; treeId: number }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeItem({ treeId }));
  };

  const [showFileOption, setShowFileOption] = useState(false);

  const handleShowOption = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowFileOption(true);
  };

  const handleHideOption = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowFileOption(false);
  };

  // find file extension
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop();
  };

  // finding the icon for the file extension
  const fileExtension = getFileExtension(name);
  const fileIcon = iconsData.find(icon => icon.name === fileExtension);

  return (
    <div
      className="ml-7 border border-black flex items-center justify-between py-2 px-4 mt-2 w-[350px] cursor-pointer bg-black/30 text-xl rounded-md"
      onMouseEnter={handleShowOption}
      onMouseLeave={handleHideOption}
    >
      <div className="flex items-center gap-2">
        {fileIcon ? (
          <span className="text-2xl" style={{ color: `${fileIcon.color}` }}>
            {fileIcon.icon}
          </span>
        ) : (
          <FaFile className="text-blue-500" />
        )}
        <span className="inline-block text-green-100">{name}</span>
      </div>
      {showFileOption && (
        <MdDelete
          className="text-2xl text-red-700 cursor-pointer"
          onClick={handleRemove}
        />
      )}
    </div>
  );
};

export default File;
