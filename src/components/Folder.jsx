import { useState } from "react";
import { FileExplorer } from "./FileExplorer";

export const Folder = ({
  data,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode,
}) => {
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState({
    isVisible: false,
    type: "",
    text: "",
  });
  const [updateNode, setUpdateNode] = useState(false);

  const addInput = (e, type) => {
    setShowInput((prev) => ({ ...prev, type, isVisible: true }));
    setOpen(true);
    e.stopPropagation();
  };

  const handleInput = (e) => {
    e.stopPropagation();
    setShowInput((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleBlur = (e) => {
    e.stopPropagation();
    setShowInput((prev) => ({ ...prev, isVisible: false }));
    setUpdateNode(false);
  };

  const handleEnter = (e, type) => {
    if (e.keyCode === 13 && type === "newNode") {
      handleInsertNode(data.id, showInput.text, showInput.type === "folder");
      setShowInput({
        isVisible: false,
        type: "",
        text: "",
      });
    }

    if (e.keyCode === 13 && type === "oldNode") {
      setUpdateNode(false);
      handleUpdateNode(data.id, showInput.text);
      setShowInput({
        isVisible: false,
        type: "",
        text: "",
      });
    }
  };

  const editInput = (e) => {
    e.stopPropagation();
    setUpdateNode(true);
  };

  const deleteInput = (e, nodeId) => {
    e.stopPropagation();
    handleDeleteNode(nodeId);
  };

  return (
    <div className="folder">
      <div className="folder-name" onClick={() => setOpen(!open)}>
        <span>
          📂
          {updateNode ? (
            <input
              autoFocus
              type="text"
              onChange={(e) => handleInput(e)}
              onBlur={(e) => handleBlur(e)}
              onKeyDown={(e) => handleEnter(e, "oldNode")}
            />
          ) : (
            data.name
          )}
        </span>

        <div className="btns">
          <button onClick={(e) => addInput(e, "folder")}>+Folder</button>
          <button onClick={(e) => addInput(e, "file")}>+File</button>
          <button onClick={(e) => editInput(e, data.id)}>🖊</button>
          <button onClick={(e) => deleteInput(e, data.id)}>❌</button>
        </div>
      </div>
      {showInput.isVisible && (
        <div>
          <span>{showInput.type === "folder" ? "📂" : "📄"}</span>
          <input
            autoFocus
            type="text"
            onChange={(e) => handleInput(e)}
            onBlur={(e) => handleBlur(e)}
            onKeyDown={(e) => handleEnter(e, "newNode")}
          />
        </div>
      )}
      {open &&
        data?.children
          ?.filter((node) => node)
          ?.map((node) => (
            <FileExplorer
              data={node}
              key={node.id}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleUpdateNode={handleUpdateNode}
            />
          ))}
    </div>
  );
};
