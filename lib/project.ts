// lib/project.ts
import { getAsync, setAsync } from './redisClient';
import { getLogger } from './logger';

const log = getLogger('Project');

export const saveProjectDetails = async (
    projectId: string,
    name: string,
    intent: string,
    goals: string[]
) => {
    const projectKey = `project:${projectId}`;
    const projectDetails = JSON.stringify({ name, intent, goals });

    try {
        await setAsync(projectKey, projectDetails);
        log.info(`Project details saved for projectId ${projectId}`);
    } catch (error) {
        log.error(`Error saving project details: ${error}`);
        throw error;
    }
};

export const getProjectDetails = async (projectId: string) => {
    const projectKey = `project:${projectId}`;
    const projectDetails = await getAsync(projectKey);

    if (projectDetails) {
        return JSON.parse(projectDetails);
    }

    log.warn(`Project details not found for projectId ${projectId}`);
    return null;
};
