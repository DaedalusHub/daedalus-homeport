import React, { useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import GoalsInput from './GoalsInput';
import useFormLogic, { ProjectFormValues } from './useFormLogic';
import ProjectSelect from './ProjectSelect';
import useGoals, { ProjectInterface } from '@/components/Project/useGoals';

interface ProjectDetailsProps {
    projects: ProjectInterface[];
    selectedProject: ProjectInterface | null;
    setSelectedProject: (project: ProjectInterface | null) => void;
    onCompleted: (values: ProjectFormValues) => void;
    onSelectedProjectChange: (project: ProjectInterface | null) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    projects,
    selectedProject,
    setSelectedProject,
    onCompleted
}) => {
    const {
        goals: projectGoals,
        addGoal,
        removeGoal,
        handleGoalChange
    } = useGoals(selectedProject);

    const validationSchema = Yup.object({
        name: Yup.string().required('Please enter a name for your project.'),
        intent: Yup.string().required(
            'Please enter the intent of your project.'
        ),
        goals: Yup.array().of(Yup.string().required('Please enter a goal.'))
    });

    const initialValues = {
        name: selectedProject?.name || '',
        intent: selectedProject?.intent || '',
        goals: selectedProject?.goals || []
    };

    const { handleSubmit, generatePrompt, generatedPrompt } =
        useFormLogic(onCompleted);

    const formikProps = {
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: handleSubmit
    };

    useEffect(() => {
        generatePrompt({
            name: selectedProject?.name || '',
            intent: selectedProject?.intent || '',
            goals: selectedProject?.goals || []
        });
    }, [selectedProject, generatePrompt]);

    return (
        <Formik {...formikProps}>
            {(formik) => (
                <Form id="project-details-form">
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-2xl text-primary-content mb-4">
                            Project Driven AI Generation
                        </h2>
                        <ProjectSelect
                            projects={projects}
                            selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject}
                        />
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
                            disabled={!formik.isValid}
                            className="btn btn-accent mt-4 mr-2"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            disabled={!formik.isValid}
                            onClick={() => generatePrompt(formik.values)}
                            className="btn btn-secondary mt-4"
                        >
                            Generate Prompt
                        </button>
                        {generatedPrompt && (
                            <div className="mt-4">
                                <p className="text-xl">Generated Prompt:</p>
                                <pre className="bg-base-100 p-4 rounded-lg overflow-x-auto">
                                    <code className="text-sm text-accent-content">
                                        {generatedPrompt}
                                    </code>
                                </pre>
                            </div>
                        )}
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ProjectDetails;
