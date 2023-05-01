import { useEffect, useState } from 'react';

export const useModels = () => {
    const [models, setModels] = useState<string[]>([]);

    useEffect(() => {
        async function fetchModels() {
            const response = await fetch('/api/models?type=gpt');
            const data = await response.json();
            setModels(data.models.sort() || []);
        }

        fetchModels();
    }, []);

    return models;
};
