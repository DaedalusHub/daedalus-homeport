// FileTreeNode.tsx
import React, { useState } from 'react';

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
    const [showChildren, setShowChildren] = useState(false);

    const toggleVisibility = () => {
        if (isDirectory) {
            setShowChildren(!showChildren);
        }
    };

    return (
        <li className="ml-4 cursor-pointer select-none">
            <span onClick={toggleVisibility}>
                {isDirectory ? (
                    <strong className="text-primary-content text-lg">
                        {name}/
                    </strong>
                ) : (
                    <code className="text-primary-content/80">{name}</code>
                )}
            </span>
            {isDirectory && showChildren && children && (
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
