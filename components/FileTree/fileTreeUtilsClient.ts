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

        const handle = await (window as any).showDirectoryPicker(opts);

        if (handle) {
            return handle;
        } else {
            return null;
        }
    };
