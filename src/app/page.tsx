"use client";

import FileExplorer from "@/components/FileExplorer";
import store from "@/store/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <FileExplorer />
    </Provider>
  );
}
