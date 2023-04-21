// src/components/Onboarding/Onboarding.tsx

import React, { useState } from 'react';
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
    const [step, setStep] = useState<number>(1);
    const { goals, addGoal, removeGoal, handleGoalChange } = useGoals();

    const initialValues = {
        name: '',
        intent: '',
        goals
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
        <div className="bg-base-100 p-8 min-h-fit h-1/2 flex flex-col w-screen">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isValid }) => (
                    <Form className="bg-base-200 p-6 rounded-lg shadow-lg">
                        {step === 1 && (
                            <>
                                <h2 className="text-2xl text-primary-content mb-4">
                                    Welcome! Let's get started.
                                </h2>
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
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="btn btn-accent mt-4"
                                >
                                    Next
                                </button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <GoalsInput
                                    goals={goals}
                                    addGoal={addGoal}
                                    removeGoal={removeGoal}
                                    handleGoalChange={handleGoalChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="btn btn-secondary mt4 mr-2"
                                >
                                    Previous
                                </button>
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-accent mt-4"
                                >
                                    Submit
                                </button>
                            </>
                        )}
                    </Form>
                )}
            </Formik>
            <Toaster />
        </div>
    );
};

export default Onboarding;
