import React from 'react';

interface ModelSelectorProps {
    models: string[];
    selectedModel: string;
    onModelSelect: (model: string) => void;
}

const ChatModelSelector: React.FC<ModelSelectorProps> = ({
    models,
    selectedModel,
    onModelSelect
}) => {
    const handleModelSelect = (model: string) => {
        onModelSelect(model);
    };

    return (
        <div className="dropdown dropdown-hover dropdown-top flex-none">
            <button
                className="btn"
                aria-label="Model selector"
                data-testid="model-selector-button"
            >
                {selectedModel}
            </button>
            <ul
                tabIndex={0}
                className="pr-2 shadow menu dropdown-content bg-base-300 w-auto"
                data-testid="model-selector-dropdown"
            >
                {models.map((model) => (
                    <li key={model}>
                        <a
                            aria-label={`Select ${model} model`}
                            href="../..#"
                            className="block px-4 py-2 text-sm min-w-fit uppercase"
                            onClick={(e) => {
                                e.preventDefault();
                                handleModelSelect(model);
                            }}
                        >
                            {model}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatModelSelector;
