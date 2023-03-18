import { useState, useRef, useEffect } from "react";
import { autoResizeTextarea, requestAPI } from "../utils";
import TextareaAutosize from 'react-textarea-autosize';
import {EditorView, basicSetup } from "codemirror"
import {keymap} from "@codemirror/view";
import {EditorState } from "@codemirror/state";
import {StreamLanguage} from "@codemirror/language"
import { yaml } from '@codemirror/legacy-modes/mode/yaml'
import {oneDark} from "@codemirror/theme-one-dark";

interface Props {
    generator: GeneratorState;
    value: string;
    setValue: (value: string) => void;
    getInputValue: (name: string) => string;
}

interface GeneratorState {
    name: string;
    placeholder: string;
    description: string;
    value: string;
    inputDependencies: string[];
    type?: string;
    language?: string;
}

export function Generator({ generator, value, setValue, getInputValue }: Props) {
    const [loading, setLoading] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const title = generator.name
        .charAt(0).toUpperCase() + generator.name.slice(1)
        .replace(/([a-z\s])([A-Z])/g, '$1 $2')

    useEffect(() => {
        if (generator.type === "code" && editorRef.current) {
            const state = EditorState.create({
                doc: value,
                extensions: [
                    basicSetup,
                    keymap.of([
                        {
                            key: 'Ctrl-Enter',
                            run: handleSubmit,
                        },
                    ]),
                    StreamLanguage.define(yaml),
                    oneDark,
                ],
            })
            const view = new EditorView({
                state: state,
                parent: editorRef.current,
                lineWrapping: true,
                width: editorRef.current.offsetWidth * 0.8,
            });

            view.dispatch({
                changes: { from: 0, to: value.length, insert: value },
            });

            return () => view.destroy();
        } else {
            autoResizeTextarea(textAreaRef);
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = generator.inputDependencies.reduce((acc, input) => {
                acc[input] = getInputValue(input);
                return acc;
            }, {});
            const resultValue = await requestAPI(payload, generator.name);
            setValue(resultValue);
        } catch (error: unknown) {
            console.error(error);
            if (error instanceof Response) {
                const errorMessage = await error.json().then(data => data.error.message);
                alert(errorMessage);
            } else {
                console.error(`Error with API request: ${error}`);
                alert(`An error occurred during your request.`);
            }
        } finally {
            setLoading(false);
        }
        return true
    };

    let field;
    if (generator.type === "code") {
        field = (<div
            ref={editorRef}
            className="max-w-full h-auto w-full min-h-[100px] resize:both focus"
        />);
    } else {
        field = (<TextareaAutosize
            name={generator.name}
            placeholder={generator.placeholder}
            value={value}
            onChange={handleChange}
            className="textarea textarea-bordered textarea-primary w-full min-w-fit min-h-[100px] resize:both focus:ring-2 focus:ring-primary text-lg"
        />);
    }

    const buttonClasses =
        "btn w-fit " +
        (loading ? "btn-neutral cursor-not-allowed text-neutral-content" : "btn-primary text-primary-content");

    return (
        <div className="generator rounded-box bg-neutral text-neutral-content space-y-3 min-w-fit p-6 min-h-fit h-auto" style={{ maxWidth: "100%", overflowX: "hidden" }}>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col form-control space-y-4 w-full"
            >
                <div className="flex flex-row justify-between min-h-fit h-auto">
                    <h3 className="text-2xl text-primary">{title}</h3>
                    <input
                        type="submit"
                        value={loading ? "Loading..." : "Generate"}
                        className={buttonClasses}
                    />
                </div>
                <p>{generator.description}</p>
                {field}
            </form>
        </div>
    );
}
