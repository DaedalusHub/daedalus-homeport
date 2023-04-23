import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { getLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';
import GoalsInput from './GoalsInput';
import useGoals from './useGoals';

const log = getLogger('Onboarding');

interface OnboardingProps {
    onCompleted: (values: {
        name: string;
        intent: string;
        goals: string[];
    }) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onCompleted }) => {
    const { goals, addGoal, removeGoal, handleGoalChange, setGoals } =
        useGoals();

    const [projects, setProjects] = useState<any[]>([]);
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const initialValues = {
        name: selectedProject?.name || '',
        intent: selectedProject?.intent || '',
        goals: selectedProject?.goals || goals
    };

    useEffect(() => {
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

        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            const updatedGoals = selectedProject.goals;
            setGoals(updatedGoals);
        }
    }, [selectedProject]);

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
        <div className="bg-base-100 p-8 min-h-fit h-1/2 flex flex-col w-screen">
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid, setFieldValue }) => (
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
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
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
                                goals={goals}
                                addGoal={addGoal}
                                removeGoal={removeGoal}
                                handleGoalChange={handleGoalChange}
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-accent mt-4"
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            <Toaster />
        </div>
    );
};

export default Onboarding;
