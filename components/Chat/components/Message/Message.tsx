import React from "react";
<<<<<<<< HEAD:components/Chat/components/Message/Message.tsx
import RoleLabel from "./RoleLabel";
import useParsedMessageContent from "./useParsedMessageContent";
========
import RoleLabel from "../../Message/RoleLabel";
import useMessageContent from "../../Message/useMessageContent";
>>>>>>>> 26d149a (feat(chat): change pending response action to spinner in chat history):components/Chat/components/Message.tsx

interface MessageProps {
    role: string;
    rawContent: string;
}

const Message: React.FC<MessageProps> = ({ role, rawContent }) => {
    const messageContent = useParsedMessageContent(rawContent);

    return (
        <div
            className={`rounded-lg p-4 mb-4 ${
                role === "user" ? "bg-neutral" : "bg-neutral-focus"
            }`}
        >
            <div className="flex items-start">
                <RoleLabel role={role} />
                <div className="ml-4 flex-grow">
                    <div>{messageContent}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
