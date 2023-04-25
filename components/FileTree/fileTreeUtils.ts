export type FileOrDirectory = {
    name: string;
    isDirectory: boolean;
    children: FileOrDirectory[];
};

export const readDirectory = async (
    dirHandle: FileSystemDirectoryHandle
): Promise<FileOrDirectory[]> => {
    const children: FileOrDirectory[] = [];
    for await (const entry of dirHandle.values()) {
        if (entry.kind === 'directory') {
            const childDirHandle = entry;
            const childEntries = await readDirectory(childDirHandle);
            children.push({
                name: entry.name,
                isDirectory: true,
                children: childEntries
            });
        } else {
            children.push({
                name: entry.name,
                isDirectory: false,
                children: []
            });
        }
    }
    return children;
};
