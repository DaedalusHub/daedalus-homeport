export interface ChatMessage {
    key: string;
    role: string;
    content: string;
}

export function importFromJson(fileContent: string): ChatMessage[] | undefined {
    try {
        return JSON.parse(fileContent) as ChatMessage[];
    } catch (err) {
        console.error("Invalid JSON format");
        return undefined;
    }
}

export function saveMessagesToFile(messages: ChatMessage[]) {
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

export function exportToJson(messages: ChatMessage[]) {
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
