export function manualChunks(id, { getModuleInfo }) {
  if (id.includes("node_modules")) {
    const dependentEntryPoints = [];

    // we use a Set here so we handle each module at most once. This
    // prevents infinite loops in case of circular dependencies
    const idsToHandle = new Set(getModuleInfo(id).dynamicImporters);

    idsToHandle.forEach((moduleId) => {
      const { isEntry, dynamicImporters, importers } = getModuleInfo(moduleId);
      if (isEntry || dynamicImporters.length > 0) dependentEntryPoints.push(moduleId);

      // The Set iterator is intelligent enough to iterate over elements that
      // are added during iteration
      importers.forEach((importerId) => idsToHandle.add(importerId));
    });

    // If there is a unique entry, we put it into into a chunk based on the entry name
    if (dependentEntryPoints.length === 1) {
      return `${dependentEntryPoints[0].split("/").slice(-1)[0].split(".")[0]}.single-vendor-dep`;
    }

    if (dependentEntryPoints.length > 1 && dependentEntryPoints.length < 6) {
      return `${dependentEntryPoints[0].split("/").slice(-1)[0].split(".")[0]}.multi-${
        dependentEntryPoints.length
      }-vendor-deps`;
    }

    if (dependentEntryPoints.length > 1) {
      return `shared.vendor`;
    }
  }

  return null;
}
