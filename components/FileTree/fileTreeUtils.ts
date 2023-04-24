import { FileSystemDirectoryHandle } from "native-file-system-adapter";

interface FileObject {
    id: string;
    name: string;
    isDirectory: boolean;
    children?: FileObject[];
    showChildren?: boolean;
}

export const readDirectory = async (
    dirHandle: FileSystemDirectoryHandle,
    parentPath = ''
): Promise<FileObject[]> => {
    const fileObjects: FileObject[] = [];

    for await
        (const entry of dirHandle.values()) {
        if (entry.kind === "directory") {
            const children = await readDirectory(entry as FileSystemDirectoryHandle, `${parentPath}/${entry.name}`);
            fileObjects.push({
                id: `${parentPath}/${entry.name}`,
                name: entry.name,
                isDirectory: true,
                children,
            });
        } else {
            fileObjects.push({
                id: `${parentPath}/${entry.name}`,
                name: entry.name,
                isDirectory: false,
            });
        }
    }
    return fileObjects;

};

export const createFileStructureString = (files: FileObject[], level = 0): string => {
    let result = '';
    files.forEach((file, index) => {
        const isLastItem = index === files.length - 1;
        const linePrefix = isLastItem ? '└── ' : '├── ';
        const indent = '│ '.repeat(level);
        if (file.isDirectory) {
            result += `${indent}${linePrefix}${file.name}/\n`;
            if (file.showChildren) {
                result += createFileStructureString(file.children ?? [], level + 1);
            }
        } else {
            result += `${indent}${linePrefix}${file.name}\n`;
        }
    });
    return result;
};

export const getAllEntries = async (handle) => {
    const entries = [];
    for await (const entry of handle.values()) {
        entries.push(entry);
    }
    return entries;
};

export const loadDirectory = async () => {
    const handle = await window.showDirectoryPicker();
    if (!handle) {
        return;
    }

    return handle;
};
