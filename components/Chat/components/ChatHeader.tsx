import { ChatMessageType, importFromJson } from "@/components/Chat/utils/chatHelpers";

const importMessages = (file: File, onImport: (data: ChatMessageType[]) => void) => {
    const reader = new FileReader();
    reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
            const messages = importFromJson(result);
            if (messages) {
                onImport(messages);
            } else {
                console.error("Failed to import messages. Invalid data format.");
            }
        }
    };
    reader.readAsText(file);
};

interface ChatHeaderProps {
    onSave: () => void;
    onClear: () => void;
    onExport: () => void;
    onImport: (data: ChatMessageType[]) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
                                                   onSave,
                                                   onClear,
                                                   onExport,
                                                   onImport
                                               }) => {
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) importMessages(file, onImport);
    };

    return (
        <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-base-100-contents">
                Daedalus Chat
            </h1>
            <div className="flex space-x-3 mb-4 h-fit">
                <button
                    onClick={onSave}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-focus"
                >
                    Save
                </button>
                <button
                    onClick={onExport}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-focus"
                >
                    Export
                </button>
                <label
                    htmlFor="import"
                    className="bg-secondary text-white px-4 py-2 rounded cursor-pointer hover:bg-secondary-focus"
                >
                    Import
                </label>
                <input
                    type="file"
                    id="import"
                    accept=".json"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                />
                <button
                    onClick={onClear}
                    className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-focus"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
