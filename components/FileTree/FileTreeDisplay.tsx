// FileTreeDisplay.tsx
import React, { useState } from 'react';
import FileTree from './FileTree';

const FileTreeDisplay: React.FC = () => {
    const [projectFiles, setProjectFiles] = useState([
        { name: 'Please load a directory.', isDirectory: false }
    ]);

    const loadProject = async () => {
        const directoryHandle = await window.showDirectoryPicker();
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

    return (
        <div className="flex flex-col m-4 space-y-4">
            <div className="flex flex-row justify-between items-center m-4">
                <h1 className="text-2xl text-primary-content">
                    Project Directory
                </h1>
                <button
                    className="btn btn-secondary p-2 min-w-fit w-24 min-h-fit h-8"
                    onClick={loadProject}
                >
                    Load project
                </button>
            </div>
            <div className="border rounded-lg border-2 border-primary bg-base-300 m-4 p-4">
                <FileTree files={projectFiles} />
            </div>
        </div>
    );
};

export default FileTreeDisplay;
