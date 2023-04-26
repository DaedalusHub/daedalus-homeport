import React from 'react';

interface HeaderProps {
    loadProject: () => void;
    copyToClipboard: () => void;
}

const FileTreeHeader: React.FC<HeaderProps> = ({
    loadProject,
    copyToClipboard
}) => {
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

export default FileTreeHeader;
