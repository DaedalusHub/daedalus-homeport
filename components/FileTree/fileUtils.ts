interface DirectoryPickerOptions {
    types: {
        description: string;
        accept: {
            'inode/directory': string[];
        };
    }[];
    excludeAcceptAllOption: boolean;
    multiple: boolean;
}

interface ExtendedWindow extends Window {
    showDirectoryPicker: (
        options: DirectoryPickerOptions
    ) => Promise<FileSystemDirectoryHandle>;
}

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

        const handle = await (window as ExtendedWindow).showDirectoryPicker(
            opts
        );

        if (handle) {
            return handle;
        } else {
            return null;
        }
    };
