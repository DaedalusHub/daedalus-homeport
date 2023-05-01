// useProjects.ts
import { useEffect, useState } from 'react';
import { getLogger } from '@/lib/logger';
import { ProjectInterface } from '@/components/Project/useGoals';

const log = getLogger('useProjects');

const useProjects = (
    onSelectedProjectChange?: (project: ProjectInterface | null) => void
) => {
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    const [selectedProject, setSelectedProject] =
        useState<ProjectInterface | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/get-projects');
                const data = await response.json();
                const projectsWithId = data.map(
                    (project: ProjectInterface, index: number) => ({
                        ...project,
                        id: `project-${index}` // Adding an ID property to each project
                    })
                );
                setProjects((prevProjects) => {
                    log.debug(`Projects: ${JSON.stringify(prevProjects)}`);
                    return projectsWithId;
                });
                setSelectedProject(projectsWithId[0]);
            } catch (error) {
                log.error(`Error fetching projects: ${error}`);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject && onSelectedProjectChange) {
            onSelectedProjectChange(selectedProject);
        }
    }, [selectedProject, onSelectedProjectChange]);

    return { projects, selectedProject, setSelectedProject };
};

export default useProjects;
