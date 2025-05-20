const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.children.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        children: [],
      });

      return tree;
    }

    let latestData = [];
    latestData = tree?.children?.map((child) => {
      return insertNode(child, folderId, item, isFolder);
    });

    return { ...tree, children: latestData };
  };

  const deleteNode = (tree, nodeId) => {
    if (tree.id === nodeId) return null;

    const updatedChildren = tree.children
      ?.map((child) => deleteNode(child, nodeId))
      .filter(Boolean); // filters out nulls

    return { ...tree, children: updatedChildren };
  };

  const updateNode = (tree, nodeId, item) => {
    if (tree.id === nodeId) {
      return { ...tree, name: item };
    }

    const updatedChildren = tree.children?.map((child) =>
      updateNode(child, nodeId, item)
    );

    return { ...tree, children: updatedChildren };
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
