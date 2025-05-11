import { useState } from "react";
import { FileExplorer } from "./FileExplorer";
// import fullData from "../data.json";

export const Folder = ({ data, handleInsertNode }) => {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    type: "",
    text: "",
  });

  const addInput = (e, type) => {
    setShowInput((prev) => ({ ...prev, type, isVisible: true }));
    setOpen(true);
    e.stopPropagation();
  };

  const handleInput = (e) => {
    setShowInput((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleBlur = () => {
    if (showInput.text === "") {
      setShowInput((prev) => ({ ...prev, isVisible: false }));
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      // console.log("enter...", e);
      // const newData = JSON.parse(JSON.stringify(fullData));
      // console.log("data: ", id);
      // console.log("full data: ", newData);

      handleInsertNode(data.id, showInput.text, showInput.type === "folder");
      setShowInput({
        isVisible: false,
        type: "",
        text: "",
      });
    }
  };

  return (
    <div className="folder">
      <div className="folder-name" onClick={() => setOpen(!open)}>
        <span>📂 {data.name}</span>
        <div className="btns">
          <button onClick={(e) => addInput(e, "folder")}>+Folder</button>
          <button onClick={(e) => addInput(e, "file")}>+File</button>
        </div>
      </div>
      {showInput.isVisible && (
        <div>
          <span>{showInput.type === "folder" ? "📂" : "📄"}</span>
          <input
            autoFocus
            type="text"
            onChange={(e) => handleInput(e)}
            onBlur={handleBlur}
            onKeyDown={(e) => handleEnter(e)}
          />
        </div>
      )}
      {open &&
        data?.children.map((node) => (
          <FileExplorer
            data={node}
            key={node.id}
            handleInsertNode={handleInsertNode}
          />
        ))}
    </div>
  );
};
