// FileTreeNode.tsx
import React, { useState } from 'react';

export interface FileTreeNodeProps {
    name: string;
    isDirectory: boolean;
    children?: FileTreeNodeProps[];
    showChildren?: boolean;
    onToggleVisibility?: (path: string[], showChildren: boolean) => void;
    path?: string[];
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
    name,
    isDirectory,
    children,
    showChildren,
    onToggleVisibility,
    path = []
}) => {
    const [visible, setVisible] = useState(showChildren);

    const toggleVisibility = () => {
        if (isDirectory) {
            setVisible(!visible);
            onToggleVisibility && onToggleVisibility([...path, name], !visible);
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
            {isDirectory && visible && children && (
                <ul>
                    {children.map((child, index) => (
                        <FileTreeNode
                            key={index}
                            {...child}
                            onToggleVisibility={onToggleVisibility}
                            path={[...path, name]}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default FileTreeNode;
