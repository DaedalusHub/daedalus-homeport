import React, { useState } from 'react';

export interface FileTreeNodeProps {
    id: string;
    name: string;
    isDirectory: boolean;
    children?: FileTreeNodeProps[];
    showChildren?: boolean;
    onToggleVisibility?: (path: string[], showChildren: boolean) => void;
    path?: string[];
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
    id,
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
        <li className="ml-4 cursor-pointer select-none" key={id}>
            <code className="text-primary-content/80">
                {isDirectory ? (
                    <span
                        onClick={toggleVisibility}
                        data-testid="directoryElement"
                    >
                        <strong className="text-primary-content">
                            {name}/
                        </strong>
                    </span>
                ) : (
                    <span data-testid="fileElement">{name}</span>
                )}
            </code>
            {isDirectory && visible && children && (
                <ul>
                    {children.map((child) => (
                        <FileTreeNode
                            key={child.id}
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
