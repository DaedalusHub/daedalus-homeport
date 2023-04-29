// Project.tsx
import React from 'react';
import { Toaster } from 'react-hot-toast';
import ProjectDetails from './ProjectDetails';
import useProjects from './useProjects';

interface ProjectProps {
    onCompleted: (values: {
        name: string;
        intent: string;
        goals: string[];
    }) => void;
}

const Project: React.FC<ProjectProps> = ({ onCompleted }) => {
    const { projects, selectedProject, setSelectedProject } = useProjects();

    return (
        <div className="bg-base-100 p-8 min-h-fit h-1/2 flex flex-col w-screen">
            <ProjectDetails
                projects={projects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                onCompleted={onCompleted}
                onSelectedProjectChange={(selectedProject) => {
                    setSelectedProject(selectedProject);
                }}
            />
            <Toaster />
        </div>
    );
};

export default Project;
