import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface OnboardingProps {
    onCompleted: (values: {
        name: string;
        intent: string;
        goals: string;
    }) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onCompleted }) => {
    const [step, setStep] = useState<number>(1);

    const initialValues = {
        name: '',
        intent: '',
        goals: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Please enter a name for your project.'),
        intent: Yup.string().required(
            'Please enter the intent of your project.'
        ),
        goals: Yup.string().required('Please define the goals of your project.')
    });

    const handleSubmit = (
        values: { name: string; intent: string; goals: string },
        actions: FormikHelpers<{ name: string; intent: string; goals: string }>
    ) => {
        onCompleted(values);
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
                                <label htmlFor="goals" className="block mb-1">
                                    Project Goals:
                                </label>
                                <Field
                                    name="goals"
                                    as="textarea"
                                    placeholder="Define your project goals."
                                    className="textarea textarea-bordered w-full mb-2"
                                />
                                <ErrorMessage
                                    name="goals"
                                    component="p"
                                    className="text-error text-sm mb-2"
                                />
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
        </div>
    );
};

export default Onboarding;
