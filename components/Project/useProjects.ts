// useProjects.ts
import { useEffect, useState } from 'react';
import { getLogger } from '@/lib/logger';

const log = getLogger('useProjects');

const useProjects = (onSelectedProjectChange?: (project: any) => void) => {
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/get-projects');
                const data = await response.json();
                const projectsWithId = data.map((project, index) => ({
                    ...project,
                    id: `project-${index}` // Adding an ID property to each project
                }));
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
