// FileTree.tsx
import React from 'react';
import FileTreeNode, { FileTreeNodeProps } from './FileTreeNode';

export interface FileTreeProps {
    files: FileTreeNodeProps[];
}

const FileTree: React.FC<FileTreeProps> = ({ files }) => {
    const sortedFiles = files.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) {
            return a.name.localeCompare(b.name);
        }
        return a.isDirectory ? -1 : 1;
    });

    return (
        <ul>
            {sortedFiles.map((file, index) => (
                <FileTreeNode key={index} {...file} />
            ))}
        </ul>
    );
};

export default FileTree;
