import React, { useState } from 'react';
import FileTree from './FileTree';
import { createFileStructureString, readDirectory } from './fileTreeUtils';

const FileTreeDisplay: React.FC = () => {
    const [projectFiles, setProjectFiles] = useState([
        { id: 'initial', name: 'Please load a directory.', isDirectory: false }
    ]);
    const [rootDirectory, setRootDirectory] = useState(null);

    const loadProject = async () => {
        const directoryHandle = await window.showDirectoryPicker();
        setRootDirectory(directoryHandle);
        const children = await readDirectory(directoryHandle);
        setProjectFiles(children);
    };

    const updateShowChildren = (path, showChildren) => {
        const updatedFiles = [...projectFiles];
        let currentLevel = updatedFiles;
        for (const part of path) {
            const index = currentLevel.findIndex(
                (entry) => entry.name === part
            );
            if (index !== -1) {
                if (part === path[path.length - 1]) {
                    currentLevel[index].showChildren = showChildren;
                } else {
                    currentLevel = currentLevel[index].children;
                }
            } else {
                break;
            }
        }
        setProjectFiles(updatedFiles);
    };

    const copyToClipboard = async () => {
        let fileStructureString = rootDirectory.name + '/\n';
        fileStructureString += createFileStructureString(projectFiles);
        await navigator.clipboard.writeText(fileStructureString);
    };

    return (
        <div className="flex flex-col m-4 space-y-4">
            <Header
                loadProject={loadProject}
                copyToClipboard={copyToClipboard}
            />
            <FileTreeContainer>
                <FileTree
                    files={projectFiles}
                    onToggleVisibility={updateShowChildren}
                />
            </FileTreeContainer>
        </div>
    );
};

const Header = ({ loadProject, copyToClipboard }) => {
    return (
        <div className="flex flex-row items-center m-4">
            <h1 className="text-2xl text-primary-content flex-none">
                Project Directory
            </h1>
            <div className="flex-1 flex flex-row justify-end items-center">
                <button
                    className="btn btn-secondary p-2 min-w-fit w-24 min-h-fit h-8 mr-2"
                    onClick={loadProject}
                >
                    Load project
                </button>
                <button
                    className="btn btn-accent p-2 min-w-fit w-24 min-h-fit h-8"
                    onClick={copyToClipboard}
                >
                    Copy to clipboard
                </button>
            </div>
        </div>
    );
};

const FileTreeContainer = ({ children }) => {
    return (
        <div className="border rounded-lg border-2 border-primary bg-base-300 m-4 p-4">
            {children}
        </div>
    );
};

export default FileTreeDisplay;
