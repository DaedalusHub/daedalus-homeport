// chatHelpers.ts
export interface ChatMessage {
    role: string;
    content: string;
}

export function importFromJson(
    file: File,
    onSuccess: (messages: ChatMessage[]) => void
) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const fileContent = event.target?.result;
        if (typeof fileContent === 'string') {
            const importedMessages = JSON.parse(fileContent) as ChatMessage[];

            // Process imported messages
            const processedMessages = importedMessages.map((message) => ({
                ...message,
                content: message.originalContent
            }));

            onSuccess(processedMessages);
        } else {
            console.error('Unable to read file content');
        }
    };
    reader.onerror = () => {
        console.error('Error occurred while reading the file');
    };
    reader.readAsText(file);
}

export function saveMessagesToFile(messages: ChatMessage[]) {
    const chatText = messages
        .map((message) => `--${message.role}--\n\n${message.content}`)
        .join('\n\n\n');

    const blob = new Blob([chatText], { type: 'text/plain;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'chat_history.txt';
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
        type: 'application/json;charset=utf-8'
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'chat_history.json';
    link.click();
    URL.revokeObjectURL(href);
}
