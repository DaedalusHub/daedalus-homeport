// FileTree.tsx
import React from 'react';
import FileTreeNode, { FileTreeNodeProps } from './FileTreeNode';

export interface FileTreeProps {
    files: FileTreeNodeProps[];
}

const FileTree: React.FC<FileTreeProps> = ({ files }) => {
    return (
        <ul>
            {files.map((file, index) => (
                <FileTreeNode key={index} {...file} />
            ))}
        </ul>
    );
};

export default FileTree;
