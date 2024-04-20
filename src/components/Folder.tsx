import { MouseEvent, useRef, useState } from "react";
import Explorer from "./Explorer";
import { useAppDispatch } from "@/store/useStore";
import { TExplorerData, addItem, removeItem } from "@/store/fileExplorerSlice";
import { MdDelete } from "react-icons/md";
import { FaFileMedical, FaFolderOpen, FaFolderPlus } from "react-icons/fa";

const Folder = ({ folderData }: { folderData: TExplorerData }) => {
  const dispatch = useAppDispatch();
  const [showFolderOption, setShowFolderOption] = useState(false);
  const [showAddFolderInput, setShowAddFolderInput] = useState(false);
  const [isItemsVisible, setIsItemsVisible] = useState(true);
  const [showAddFileInput, setShowAddFileInput] = useState(false);
  const folderRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleShowOption = () => {
    setShowFolderOption(true);
  };

  const handleHideOption = () => {
    setShowFolderOption(false);
  };

  const handleToggleItems = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsItemsVisible(prevState => !prevState);
  };

  const handleAddFolder = (treeId: number) => {
    if (folderRef.current?.value.length === 0) alert("input is empty");
    dispatch(
      addItem({ name: folderRef.current!.value, type: "folder", treeId })
    );

    // hide input and reset value
    setShowAddFolderInput(false);
    folderRef.current!.value = "";
  };

  const handleAddFile = (treeId: number) => {
    if (folderRef.current?.value.length === 0) alert("input is empty");
    dispatch(addItem({ name: fileRef.current!.value, type: "file", treeId }));

    // hide input and reset value
    setShowAddFileInput(false);
    fileRef.current!.value = "";
  };

  const handleRemoveFolder = () => {
    dispatch(removeItem({ treeId: folderData.treeId }));
  };

  return (
    <div className="ml-7 mt-2">
      <div
        className="flex items-center justify-between py-2 px-4 w-[450px] cursor-pointer bg-black rounded-md"
        onMouseEnter={handleShowOption}
        onMouseLeave={handleHideOption}
      >
        <div className="flex items-center gap-2" onClick={handleToggleItems}>
          <FaFolderOpen className="text-yellow-500 text-2xl" />
          <span className="inline-block text-blue-100 text-2xl">
            {folderData.name}
          </span>
        </div>
        {showFolderOption && (
          <div className="flex items-center gap-3">
            <FaFileMedical
              className="cursor-pointer text-2xl text-blue-700"
              onClick={() => {
                setShowAddFolderInput(false);
                setShowAddFileInput(true);
              }}
            />
            <FaFolderPlus
              className="cursor-pointer text-2xl text-green-700"
              onClick={() => {
                setShowAddFileInput(false);
                setShowAddFolderInput(true);
              }}
            />
            <MdDelete
              className="cursor-pointer text-2xl text-red-700"
              onClick={handleRemoveFolder}
            />
          </div>
        )}
      </div>
      {/* ADD FILE */}
      {showAddFileInput && (
        <div className="mt-2">
          <input
            type="text"
            ref={fileRef}
            placeholder="Enter file name"
            className="bg-gray-100 border border-gray-300 p-1 rounded-md"
          />
          <button
            onClick={() => handleAddFile(folderData.treeId)}
            className="bg-blue-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-blue-600"
          >
            Add File
          </button>
          <button
            onClick={() => setShowAddFileInput(false)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Cancel
          </button>
        </div>
      )}
      {/* ADD FOLDER */}
      {showAddFolderInput && (
        <div className="mt-2">
          <input
            type="text"
            ref={folderRef}
            placeholder="Enter folder name"
            className="bg-gray-100 border border-gray-300 p-1 rounded-md"
          />
          <button
            onClick={() => handleAddFolder(folderData.treeId)}
            className="bg-green-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-green-600"
          >
            Add Folder
          </button>
          <button
            onClick={() => setShowAddFolderInput(false)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Cancel
          </button>
        </div>
      )}
      {isItemsVisible && (
        <div className="my-1">
          {folderData.items?.map(item => (
            <Explorer key={item.treeId} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
