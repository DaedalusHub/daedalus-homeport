import React from 'react';
import FileTreeNode, { FileTreeNodeProps } from './FileTreeNode';

export interface FileTreeProps {
    files: FileTreeNodeProps[];
    onToggleVisibility?: (path: string[], showChildren: boolean) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ files, onToggleVisibility }) => {
    const sortedFiles = files.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) {
            return a.name.localeCompare(b.name);
        }
        return a.isDirectory ? -1 : 1;
    });

    return (
        <ul>
            {sortedFiles.map((file) => (
                <FileTreeNode
                    key={file.id}
                    {...file}
                    onToggleVisibility={onToggleVisibility}
                />
            ))}
        </ul>
    );
};

export default FileTree;
