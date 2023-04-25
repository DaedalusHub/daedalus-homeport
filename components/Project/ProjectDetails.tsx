import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { getLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';
import GoalsInput from './GoalsInput';
import useGoals from './useGoals';
import toast from 'react-hot-toast';

const log = getLogger('ProjectDetails');

interface ProjectDetailsProps {
    projects: any[];
    selectedProject: any;
    setSelectedProject: (project: any) => void;
    onCompleted: (values: {
        name: string;
        intent: string;
        goals: string[];
    }) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    projects,
    selectedProject,
    setSelectedProject,
    onCompleted
}) => {
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const generatePrompt = (values: {
        name: string;
        intent: string;
        goals: string[];
    }) => {
        const prompt = `You are assisting me on a project with the following details:
- Title: ${values.name}
- Intent: ${values.intent}
- Goals:
${values.goals.map((goal, index) => `  ${index + 1}. ${goal}`).join('\n')}`;

        setGeneratedPrompt(prompt);
    };

    const {
        goals: projectGoals,
        addGoal,
        removeGoal,
        handleGoalChange
    } = useGoals();

    const initialValues = {
        name: selectedProject?.name || '',
        intent: selectedProject?.intent || '',
        goals: selectedProject?.goals || projectGoals
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Please enter a name for your project.'),
        intent: Yup.string().required(
            'Please enter the intent of your project.'
        ),
        goals: Yup.array().of(Yup.string().required('Please enter a goal.'))
    });

    const handleSubmit = async (
        values: { name: string; intent: string; goals: string[] },
        actions: FormikHelpers<{
            name: string;
            intent: string;
            goals: string[];
        }>
    ) => {
        try {
            toast.loading('Submitting...');
            log.debug(`Submitting project details: ${JSON.stringify(values)}`);

            const projectId = uuidv4(); // Generates a unique project ID

            const response = await fetch('/api/save-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectId, ...values })
            });

            if (response.ok) {
                log.info(
                    `Project details saved to Redis for project ID: ${projectId}`
                );
            } else {
                throw new Error(await response.text());
            }

            await new Promise((resolve) => {
                onCompleted(values);
                setTimeout(resolve, 1000);
            });
            toast.dismiss();
            toast.success('Submitted');
        } catch (error) {
            log.error(`Error submitting project details: ${error}`);
            toast.dismiss();
            toast.error('Error');
        }
        actions.setSubmitting(false);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, setFieldValue, values }) => (
                <Form>
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-2xl text-primary-content mb-4">
                            Project Driven AI Generation
                        </h2>
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
                                onChange={async (
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                    const projectId = e.target.value;
                                    const project = projects.find(
                                        (p) => p.id === projectId
                                    );
                                    setSelectedProject(project);

                                    setFieldValue('name', project.name);
                                    setFieldValue('intent', project.intent);
                                    setFieldValue('goals', project.goals);
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
                    </div>
                    <div className="bg-base-200 p-6 rounded-lg shadow-lg">
                        <label htmlFor="name" className="block mb-1">
                            Project Name:
                        </label>
                        <Field
                            name="name"
                            placeholder="Enter your project name"
                            className="input input-bordered w-full mb-2"
                        />

                        <ErrorMessage
                            name="name"
                            component="p"
                            className="text-error text-sm mb-2"
                        />
                        <label htmlFor="intent" className="block mb-1">
                            Project Intent:
                        </label>
                        <Field
                            name="intent"
                            placeholder="What's the intent of your project?"
                            className="input input-bordered w-full mb-2"
                        />
                        <ErrorMessage
                            name="intent"
                            component="p"
                            className="text-error text-sm mb-2"
                        />
                        <GoalsInput
                            goals={projectGoals}
                            addGoal={addGoal}
                            removeGoal={removeGoal}
                            handleGoalChange={handleGoalChange}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-accent mt-4 mr-2"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            disabled={!isValid}
                            onClick={() => generatePrompt(values)}
                            className="btn btn-secondary mt-4"
                        >
                            Generate Prompt
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProjectDetails;
