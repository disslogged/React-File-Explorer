import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TExplorerData = {
  name: string;
  treeId: number;
  type: "folder" | "file";
  items?: TExplorerData[];
};

type AddItemActionType = {
  treeId: number;
  name: string;
  type: "folder" | "file";
};

const initialState: TExplorerData[] = [
  {
    name: "root",
    treeId: 0.0101,
    type: "folder",
    items: [
      {
        name: "index.html",
        treeId: 1.102,
        type: "file",
      },
      {
        name: "App.jsx",
        treeId: 1.103,
        type: "file",
      },
      {
        name: "utils.js",
        treeId: 1.104,
        type: "file",
      },
      {
        name: "styles",
        treeId: 1,
        type: "folder",
        items: [
          {
            name: "style.css",
            type: "file",
            treeId: 2,
          },
        ],
      },
    ],
  },
];

const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemActionType>) => {
      const { treeId, name, type } = action.payload;

      const findAndAddItem = (items: TExplorerData[], parentId: number) => {
        for (const item of items) {
          if (item.treeId === parentId) {
            // check for duplicate
            if (item.items?.some(item => item.name === name)) {
              alert(`Item "${name}" already exists.`);
              return;
            }

            // Add the new item (folder or file) to its items array
            item.items?.unshift({
              name,
              type,
              items: type === "folder" ? [] : undefined,
              treeId: +Math.random().toFixed(4),
            });
            return;
          } else if (item.items) {
            // Recursively search in nested folders
            findAndAddItem(item.items, parentId);
          }
        }
      };

      findAndAddItem(state, treeId);
    },

    // REMOVE FOLDER OR FILE
    removeItem(state, action: PayloadAction<{ treeId: number }>) {
      const findAndRemoveItem = (items: TExplorerData[], parentId: number) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.treeId === parentId) {
            // Found the parent item, remove it
            items.splice(i, 1);
            return;
          } else if (item.type === "folder" && item.items) {
            // Recursively search in nested folders
            findAndRemoveItem(item.items, parentId);
          }
        }
      };

      findAndRemoveItem(state, action.payload.treeId);
    },
  },
});

export const { addItem, removeItem } = explorerSlice.actions;

export default explorerSlice;
