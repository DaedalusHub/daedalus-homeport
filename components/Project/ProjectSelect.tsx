// ProjectSelect.tsx
import React from 'react';
import { Field } from 'formik';

interface ProjectSelectProps {
    projects: any[];
    selectedProject: any;
    setSelectedProject: (project: any) => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({
    projects,
    selectedProject,
    setSelectedProject
}) => {
    return (
        <div className="flex flex-row items-center">
            <label
                htmlFor="projects"
                className="block mb-1 mr-2 min-w-fit text-primary-content"
            >
                Select a Project:
            </label>
            <Field
                as="select"
                name="projects"
                value={selectedProject?.id}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const projectId = e.target.value.toString();
                    const project = projects.find((p) => p.id === projectId);
                    if (project) {
                        setSelectedProject(project);
                    } else {
                        console.error(`Project not found for ID: ${projectId}`);
                    }
                }}
                className="input input-bordered w-full mb-2 min-w-fit text-primary-content bg-base-200"
            >
                {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </Field>
        </div>
    );
};

export default ProjectSelect;
