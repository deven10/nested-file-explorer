import { Folder } from "./Folder";

export const FileExplorer = ({ data, handleInsertNode }) => {
  return (
    <div className="main">
      {data.isFolder ? (
        <Folder data={data} handleInsertNode={handleInsertNode} />
      ) : (
        <span className="file">📄 {data.name}</span>
      )}
    </div>
  );
};
