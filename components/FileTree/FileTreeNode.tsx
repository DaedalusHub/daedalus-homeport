// FileTreeNode.tsx
import React from 'react';

export interface FileTreeNodeProps {
    name: string;
    isDirectory: boolean;
    children?: FileTreeNodeProps[];
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
    name,
    isDirectory,
    children
}) => {
    return (
        <li>
            {isDirectory ? <strong>{name}/</strong> : name}
            {isDirectory && children && (
                <ul>
                    {children.map((child, index) => (
                        <FileTreeNode key={index} {...child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default FileTreeNode;
