import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { shadesOfPurple } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

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
        <SyntaxHighlighter
            key={index}
            language={language || 'text'}
            style={shadesOfPurple}
        >
            {codeString}
        </SyntaxHighlighter>
    );
};

export default CodeBlock;
