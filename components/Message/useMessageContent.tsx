import { useMemo } from 'react';
import CodeBlock from './CodeBlock';

const useMessageContent = (content: string | JSX.Element) => {
    return useMemo(() => {
        if (typeof content === 'string') {
            const lines = content.split(/\r\n|\r|\n/);
            const parsedLines = [];
            let isCodeBlock = false;
            let codeLines = [];
            let language;

            for (let index = 0; index < lines.length; index++) {
                const line = lines[index];

                if (line.startsWith('```') && !isCodeBlock) {
                    isCodeBlock = true;
                    language = line.slice(3).trim();
                    continue;
                }

                if (line.endsWith('```') && isCodeBlock) {
                    isCodeBlock = false;
                    const codeString = codeLines.join('\n');
                    parsedLines.push(
                        <CodeBlock
                            index={index}
                            language={language || 'text'}
                            codeString={codeString}
                        />
                    );
                    codeLines = [];
                    continue;
                }

                if (isCodeBlock) {
                    codeLines.push(line);
                } else {
                    parsedLines.push(<div key={index}>{line}</div>);
                }
            }

            return parsedLines;
        } else {
            return content;
        }
    }, [content]);
};

export default useMessageContent;
