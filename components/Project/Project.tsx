import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { getLogger } from '@/lib/logger';
import ProjectDetails from './ProjectDetails';

const log = getLogger('Project');

interface ProjectProps {
    onCompleted: (values: {
        name: string;
        intent: string;
        goals: string[];
    }) => void;
}

const Project: React.FC<ProjectProps> = ({ onCompleted }) => {
    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/get-projects');
            const data = await response.json();
            setProjects(data);
            setSelectedProject(data[0]);
        } catch (error) {
            log.error(`Error fetching projects: ${error}`);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div className="bg-base-100 p-8 min-h-fit h-1/2 flex flex-col w-screen">
            <ProjectDetails
                projects={projects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                onCompleted={onCompleted}
            />
            <Toaster />
        </div>
    );
};

export default Project;
