import { useState } from "react";
import "./App.css";
import { FileExplorer } from "./components/FileExplorer";
import explorerData from "./data.json";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [data, setData] = useState(explorerData);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const updatedData = insertNode(explorerData, folderId, item, isFolder);
    console.log("updatedData: ", updatedData);
    setData(updatedData);
  };

  return (
    <>
      <FileExplorer data={data} handleInsertNode={handleInsertNode} />
    </>
  );
}

export default App;
