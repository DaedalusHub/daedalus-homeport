import { useEffect, useState } from 'react';
import { getLogger } from '@/lib/logger';

const log = getLogger('useModels.ts');

export const useModels = () => {
    const [models, setModels] = useState<string[]>([]);

    useEffect(() => {
        async function fetchModels() {
            const response = await fetch('/api/models?type=gpt');
            const data = await response.json();
            log.info(`Found ${data.models.length} models`);
            log.debug(`Models: ${data.models.join(', ')}`);
            if (!data.models) {
                log.warn('No models found');
                setModels([]);
            } else {
                setModels(data.models.sort());
            }
        }

        fetchModels();
    }, []);

    return models;
};
