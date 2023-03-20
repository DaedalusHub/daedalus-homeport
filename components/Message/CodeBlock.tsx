import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

interface CodeBlockProps {
    language?: string;
    codeString: string;
    index: number;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
    language,
    codeString,
    index
}) => {
    return (
        <SyntaxHighlighter key={index} language={language || 'text'}>
            {codeString}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
