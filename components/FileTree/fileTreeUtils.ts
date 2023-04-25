import { FileTreeNodeProps } from '@/components/FileTree/FileTreeNode';

export type FileOrDirectory = {
    name: string;
    isDirectory: boolean;
    children: FileOrDirectory[];
    path?: string[];
    showChildren?: boolean;
};

export const readDirectory = async (
    dirHandle: FileSystemDirectoryHandle
): Promise<FileOrDirectory[]> => {
    const children: FileOrDirectory[] = [];
    for await (const entry of (dirHandle as any).values()) {
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

export const createFileStructureString = (
    files: FileTreeNodeProps[],
    level = 0
): string => {
    let result = '';
    files.forEach((file, index) => {
        const isLastItem = index === files.length - 1;
        const linePrefix = isLastItem ? '└── ' : '├── ';
        const indent = '│  '.repeat(level);

        if (file.isDirectory) {
            result += `${indent}${linePrefix}${file.name}/\n`;
            if (file.showChildren) {
                result += createFileStructureString(
                    file.children || [],
                    level + 1
                );
            }
        } else {
            result += `${indent}${linePrefix}${file.name}\n`;
        }
    });
    return result;
};
