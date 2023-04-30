export const showDirectoryPicker = async (opts) => {
    return await (window as any).showDirectoryPicker(opts);
};

export const getClientSideLoadDirectory =
    async (): Promise<FileSystemDirectoryHandle | null> => {
        const opts = {
            types: [
                {
                    description: 'Directories',
                    accept: {
                        'inode/directory': ['.']
                    }
                }
            ],
            excludeAcceptAllOption: true,
            multiple: false
        };

        const handle = await showDirectoryPicker(opts);

        if (handle) {
            return handle;
        } else {
            return null;
        }
    };
