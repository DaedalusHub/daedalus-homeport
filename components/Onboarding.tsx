import { useState } from 'react';
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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => (
                <Form>
                    {step === 1 && (
                        <>
                            <h2>Welcome! Let's get started.</h2>
                            <label htmlFor="name">Project Name:</label>
                            <Field
                                name="name"
                                placeholder="Enter your project name"
                            />
                            <ErrorMessage name="name" />
                            <label htmlFor="intent">Project Intent:</label>
                            <Field
                                name="intent"
                                placeholder="What's the intent of your project?"
                            />
                            <ErrorMessage name="intent" />
                            <button type="button" onClick={() => setStep(2)}>
                                Next
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <label htmlFor="goals">Project Goals:</label>
                            <Field
                                name="goals"
                                as="textarea"
                                placeholder="Define your project goals."
                            />
                            <ErrorMessage name="goals" />
                            <button type="button" onClick={() => setStep(1)}>
                                Previous
                            </button>
                            <button type="submit" disabled={!isValid}>
                                Submit
                            </button>
                        </>
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default Onboarding;
