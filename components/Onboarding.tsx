// Part: components/Onboarding.tsx
// Code Reference: https://github.com/jaredpalmer/formik
// Documentation: https://formik.org/docs/overview

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { Toaster, toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { getLogger } from '@/lib/logger';
import { v4 as uuidv4 } from 'uuid';

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
    const [goals, setGoals] = useState<string[]>([]);

    const initialValues = {
        name: '',
        intent: '',
        goals,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Please enter a name for your project.'),
        intent: Yup.string().required(
            'Please enter the intent of your project.'
        ),
        goals: Yup.array().of(
            Yup.string().required('Please enter a goal.')
        ),
    });

    const handleSubmit = async (
        values: { name: string; intent: string; goals: string[] },
        actions: FormikHelpers<{ name: string; intent: string; goals: string[] }>
    ) => {
        try {
            toast.loading('Submitting...');
            log.debug(`Submitting project details: ${JSON.stringify(values)}`);

            const projectId = uuidv4(); // Generates a unique project ID

            const response = await fetch('/api/save-project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId, ...values }),
            });

            if (response.ok) {
                log.info(`Project details saved to Redis for project ID: ${projectId}`);
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

    React.useEffect(() => {
        if (goals.length === 0) {
            addGoal();
        }
    }, [goals]);

    const addGoal = () => {
        setGoals([...goals, '']);
    };

    const removeGoal = (index: number) => {
        setGoals(goals.filter((_, i) => i !== index));
    };

    const handleGoalChange = (index: number, value: string) => {
        const updatedGoals = goals.map((goal, i) => (i === index ? value : goal));
        setGoals(updatedGoals);
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
                                <div className="flex flex-col items-start">
                                    <label htmlFor="goals" className="block mb-1 font-bold">
                                        Project Goals:
                                    </label>
                                    {goals.map((goal, index) => (
                                        <div
                                            key={`goal-${index}`}
                                            className="mb-2 flex items-center space-x-2 w-4/5"
                                        >
                                            <span className="font-semibold">{index + 1}.</span>
                                            <Field
                                                name={`goals[${index}]`}
                                                value={goal}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    handleGoalChange(index, e.target.value)
                                                }
                                                placeholder={`Goal ${index + 1}`}
                                                className="input input-bordered w-full inline-block"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeGoal(index)}
                                                className="btn btn-error btn-xs"
                                            >
                                                Remove
                                            </button>
                                            <ErrorMessage
                                                key={`error-goal-${index}`}
                                                name={`goals[${index}]`}
                                                render={(msg) => (
                                                    <p className="text-error text-sm mb-2">{msg}</p>
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={addGoal}
                                    className="btn btn-primary mb-2 mr-2"
                                >
                                    Add Goal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="btn btn-secondary mt-4 mr-2"
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
