import React, { ReactNode, useState } from 'react';
import FileTree from './FileTree';
import { FileOrDirectory, readDirectory } from './fileTreeUtils';
import FileTreeHeader from '@/components/FileTree/FileTreeHeader';
import { FileTreeNodeProps } from '@/components/FileTree/FileTreeNode';

export interface FileTreeContainerProps {
    children: ReactNode;
}

const FileTreeDisplay: React.FC = () => {
    const [projectFiles, setProjectFiles] = useState<FileOrDirectory[]>([]);

    const loadProject = async () => {
        const { getClientSideLoadDirectory } = await import(
            './fileTreeUtilsClient'
        );
        const directoryHandle = await getClientSideLoadDirectory();
        if (!directoryHandle) {
            return;
        }
        const children = await readDirectory(directoryHandle);
        setProjectFiles(children);
    };

    const convertToTreeNodeProps = (
        items: FileOrDirectory[],
        parentId: string
    ): FileTreeNodeProps[] => {
        return items.map((item, index) => {
            const id = `${parentId}-${index}`;
            if (item.isDirectory) {
                return {
                    id,
                    name: item.name,
                    isDirectory: item.isDirectory,
                    children: convertToTreeNodeProps(item.children, id)
                };
            } else {
                return {
                    id,
                    name: item.name,
                    isDirectory: item.isDirectory
                };
            }
        });
    };

    const createFileStructureString = (
        items: FileTreeNodeProps[],
        depth = 0
    ): string => {
        let output = '';
        const indent = ' '.repeat(depth * 2);

        for (const item of items) {
            if (item.isDirectory) {
                output += `${indent}${item.name}/\n`;
                output += createFileStructureString(
                    item.children || [],
                    depth + 1
                );
            } else {
                output += `${indent}${item.name}\n`;
            }
        }

        return output;
    };

    const updateShowChildren = (
        path: string[],
        showChildren: boolean
    ): void => {
        const updateVisibility = (
            items: FileOrDirectory[],
            currentPath: string[] = []
        ): FileOrDirectory[] => {
            return items.map((item) => {
                if (item.isDirectory) {
                    if (
                        JSON.stringify([...currentPath, item.name]) ===
                        JSON.stringify(path)
                    ) {
                        return {
                            ...item,
                            children: updateVisibility(item.children, [
                                ...currentPath,
                                item.name
                            ]),
                            showChildren
                        };
                    } else {
                        return {
                            ...item,
                            children: updateVisibility(item.children, [
                                ...currentPath,
                                item.name
                            ])
                        };
                    }
                } else {
                    return item;
                }
            });
        };

        const updatedProjectFiles = updateVisibility(projectFiles);
        setProjectFiles(updatedProjectFiles);
    };

    const copyToClipboard = async () => {
        const fileStructureString = createFileStructureString(
            convertToTreeNodeProps(projectFiles, 'root')
        );
        await navigator.clipboard.writeText(fileStructureString);
    };

    return (
        <div className="flex flex-col m-4 space-y-4">
            <FileTreeHeader
                loadProject={loadProject}
                copyToClipboard={copyToClipboard}
            />
            <FileTreeContainer>
                <FileTree
                    files={convertToTreeNodeProps(projectFiles, 'root')}
                    onToggleVisibility={updateShowChildren}
                />
            </FileTreeContainer>
        </div>
    );
};

const FileTreeContainer: React.FC<FileTreeContainerProps> = ({ children }) => {
    return (
        <div className="border-2 rounded-lg border-primary bg-base-300 m-4 p-4">
            {children}
        </div>
    );
};

export default FileTreeDisplay;
