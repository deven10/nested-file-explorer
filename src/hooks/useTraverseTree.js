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

  return { insertNode };
};

export default useTraverseTree;
