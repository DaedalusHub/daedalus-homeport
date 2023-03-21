// FileTreeDisplay.tsx
import React, { useState } from 'react';
import FileTree from './FileTree';

const FileTreeDisplay: React.FC = () => {
    const [projectFiles, setProjectFiles] = useState([
        { name: 'Please load a directory.', isDirectory: false }
    ]);
    const [rootDirectory, setRootDirectory] = useState(null);

    const loadProject = async () => {
        const directoryHandle = await window.showDirectoryPicker();
        setRootDirectory(directoryHandle);
        const children = await readDirectory(directoryHandle);
        setProjectFiles(children);
    };

    const readDirectory = async (dirHandle) => {
        const entries = [];
        for await (const entry of dirHandle.values()) {
            if (entry.kind === 'directory') {
                const children = await readDirectory(entry);
                entries.push({ name: entry.name, isDirectory: true, children });
            } else {
                entries.push({ name: entry.name, isDirectory: false });
            }
        }
        return entries;
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

    const createFileStructureString = (files, level = 0) => {
        let result = '';
        files.forEach((file) => {
            if (file.isDirectory) {
                result += `${'  '.repeat(level)}  ${file.name}/\n`;
                if (file.showChildren) {
                    result += createFileStructureString(
                        file.children,
                        level + 1
                    );
                }
            } else {
                result += `${'  '.repeat(level)}  ${file.name}\n`;
            }
        });
        return result;
    };

    return (
        <div className="flex flex-col m-4 space-y-4">
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
            <div className="border rounded-lg border-2 border-primary bg-base-300 m-4 p-4">
                <FileTree
                    files={projectFiles}
                    onToggleVisibility={updateShowChildren}
                />
            </div>
        </div>
    );
};

export default FileTreeDisplay;
