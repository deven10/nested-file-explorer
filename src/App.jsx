import { useState } from "react";
import "./App.css";
import { FileExplorer } from "./components/FileExplorer";
import explorerData from "./data.json";
import useTraverseTree from "./hooks/useTraverseTree";

function App() {
  const [data, setData] = useState(explorerData);

  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const updatedData = insertNode(data, folderId, item, isFolder);
    setData(updatedData);
  };

  const handleDeleteNode = (folderId) => {
    const updatedData = deleteNode(data, folderId);
    setData(updatedData);
  };

  const handleUpdateNode = (folderId, item) => {
    const updatedData = updateNode(data, folderId, item);
    setData(updatedData);
  };

  return (
    <>
      {data ? (
        <FileExplorer
          data={data}
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleUpdateNode={handleUpdateNode}
        />
      ) : (
        <p>Whole tree was deleted!</p>
      )}
    </>
  );
}

export default App;
