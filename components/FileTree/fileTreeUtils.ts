export const readDirectory = async (dirHandle) => {
    const entries = [];
    for await (const entry of dirHandle.values()) {
        if (entry.kind === 'directory') {
            const children = await readDirectory(entry);
            entries.push({
                id: entry.name,
                name: entry.name,
                isDirectory: true,
                children
            });
        } else {
            entries.push({
                id: entry.name,
                name: entry.name,
                isDirectory: false
            });
        }
    }
    return entries;
};

export const createFileStructureString = (files, level = 0) => {
    let result = '';
    files.forEach((file, index) => {
        const isLastItem = index === files.length - 1;
        const linePrefix = isLastItem ? '└── ' : '├── ';
        const indent = '│  '.repeat(level);

        if (file.isDirectory) {
            result += `${indent}${linePrefix}${file.name}/\n`;
            if (file.showChildren) {
                result += createFileStructureString(file.children, level + 1);
            }
        } else {
            result += `${indent}${linePrefix}${file.name}\n`;
        }
    });
    return result;
};
