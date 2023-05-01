export const getClientSideLoadDirectory =
    async (): Promise<FileSystemDirectoryHandle | null> => {
        const handle = await window.showDirectoryPicker();

        if (handle) {
            return handle;
        } else {
            return null;
        }
    };
