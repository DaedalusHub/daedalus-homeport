import { hgetallAsync, hsetAsync } from './redisClient';
import { getLogger } from './logger';

const log = getLogger('Project');

export const saveProjectDetails = async (
    projectId: string,
    name: string,
    intent: string,
    goals: string[]
) => {
    const projectKey = `projects`;
    const projectField = `project:${projectId}`;
    const projectDetails = JSON.stringify({ name, intent, goals });

    try {
        await hsetAsync(projectKey, projectField, projectDetails);
        log.info(`Project details saved for projectId ${projectId}`);
    } catch (error) {
        log.error(`Error saving project details: ${error}`);
        throw error;
    }
};

export const getAllProjects = async () => {
    const projectKey = `projects`;
    const projectDetailsList = await hgetallAsync(projectKey);

    if (!projectDetailsList) {
        log.warn(`No projects found`);
        return [];
    }

    const projects = Object.values(projectDetailsList)
        .map((projectDetails) => JSON.parse(projectDetails))
        .filter((project) => project !== null);

    log.info(`Fetched all projects: ${JSON.stringify(projects)}`);

    return projects;
};
