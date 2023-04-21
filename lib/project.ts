// lib/project.ts
import { getAsync, setAsync } from "./redisClient";
import { getLogger } from './logger';

const logger = getLogger('Project');

export const saveProjectDetails = async (
    projectId: string,
    name: string,
    intent: string,
    goals: string[]
) => {
    const projectKey = `project:${projectId}`;
    const projectDetails = JSON.stringify({ name, intent, goals });
    await setAsync(projectKey, projectDetails);

    logger.info(`Project details saved for projectId ${projectId}`);
};

export const getProjectDetails = async (projectId: string) => {
    const projectKey = `project:${projectId}`;
    const projectDetails = await getAsync(projectKey);

    if (projectDetails) {
        return JSON.parse(projectDetails);
    }

    logger.warn(`Project details not found for projectId ${projectId}`);
    return null;
};
