export interface ChatMessageType {
    role: string;
    content: string;
    key: string;
}

export function importFromJson(fileContent: string): ChatMessageType[] | undefined {
    try {
        return JSON.parse(fileContent) as ChatMessageType[];
    } catch (err) {
        console.error("Invalid JSON format");
        return undefined;
    }
}

export const importMessages = (file: File, onImport: (data: ChatMessageType[]) => void) => {
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

export function saveMessagesToFile(messages: ChatMessageType[]) {
    const chatText = messages
        .map((message) => `--${message.role}--\n\n${message.content}`)
        .join("\n\n\n");

    const blob = new Blob([chatText], { type: "text/plain;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "chat_history.txt";
    link.click();
    URL.revokeObjectURL(href);
}

export function exportToJson(messages: ChatMessageType[]) {
    const data = JSON.stringify(
        messages.map((message) => ({
            ...message
        }))
    );
    const blob = new Blob([data], {
        type: "application/json;charset=utf-8"
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = "chat_history.json";
    link.click();
    URL.revokeObjectURL(href);
}
