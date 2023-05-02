import { useEffect, useState } from 'react';
import { getLogger } from '@/lib/logger';

const log = getLogger('useModels.ts');

export const useModels = () => {
    const [models, setModels] = useState<string[]>([]);

    useEffect(() => {
        async function fetchModels() {
            try {
                const response = await fetch('/api/models?type=gpt');

                if (!response.ok) {
                    log.error(`Server error: ${response.status}`);
                }

                const data = await response.json();
                log.info(`Found ${data.length} models`);
                log.debug(`Models: ${data.join(', ')}`);

                if (!data) {
                    log.warn('No models found');
                    setModels([]);
                } else {
                    setModels(data.sort());
                }
            } catch (error) {
                log.error(`Error fetching models: ${error}`);
                setModels([]);
            }
        }

        fetchModels();
    }, []);

    return models;
};
