import { useState } from "react";
import { Folder } from "./Folder";

export const FileExplorer = ({
  data,
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode,
}) => {
  const [showInput, setShowInput] = useState({
    isVisible: false,
    text: "",
  });

  const handleInput = (e) => {
    e.stopPropagation();
    setShowInput((prev) => ({ ...prev, text: e.target.value }));
  };

  const handleBlur = (e) => {
    e.stopPropagation();
    setShowInput({
      isVisible: false,
      text: "",
    });
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && showInput.text) {
      handleUpdateNode(data.id, showInput.text);
      setShowInput({
        isVisible: false,
        text: "",
      });
    }
  };

  const editInput = (e) => {
    e.stopPropagation();
    setShowInput((prev) => ({ ...prev, isVisible: true }));
  };

  return (
    <div className="main">
      {data.isFolder ? (
        <Folder
          data={data}
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleUpdateNode={handleUpdateNode}
        />
      ) : (
        <div className="file-wrapper">
          <span className="file">
            📄{" "}
            {showInput.isVisible ? (
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
          <div className="buttons">
            <button onClick={(e) => editInput(e)}>🖊</button>
            <button onClick={() => handleDeleteNode(data.id)}>❌</button>
          </div>
        </div>
      )}
    </div>
  );
};
