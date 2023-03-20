import React from 'react';
import FileTree from './FileTree';

const projectFiles = [
    {
        name: 'src',
        isDirectory: true,
        children: [
            { name: 'index.ts', isDirectory: false },
            { name: 'App.tsx', isDirectory: false }
        ]
    },
    { name: 'package.json', isDirectory: false },
    { name: 'README.md', isDirectory: false }
];

const App: React.FC = () => {
    return (
        <div>
            <h1>Project Directory</h1>
            <FileTree files={projectFiles} />
        </div>
    );
};

export default App;
