// useFormLogic.ts
import { useState } from 'react';
import { getLogger } from '@/lib/logger';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { FormikHelpers } from 'formik';

const log = getLogger('useFormLogic');

export interface ProjectFormValues {
    name: string;
    intent: string;
    goals: string[];
}

const useFormLogic = (onCompleted: (values: ProjectFormValues) => void) => {
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    const generatePrompt = (formikValues: ProjectFormValues) => {
        const promptValues = formikValues;
        const prompt = `You are assisting me on a project with the following details:\n
- Title: ${promptValues.name}\n
- Intent: ${promptValues.intent}\n
- Goals:\n
${promptValues.goals
    .map((goal, index) => `  ${index + 1}. ${goal}`)
    .join('\n')}`;

        setGeneratedPrompt(prompt);
    };

    const handleSubmit = async (
        values: ProjectFormValues,
        actions: FormikHelpers<ProjectFormValues>
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
                const errorMessage = await response.text();
                log.error(`Error submitting project details: ${errorMessage}`);
                toast.dismiss();
                toast.error('Error');
                actions.setSubmitting(false);
                return;
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

    return { handleSubmit, generatePrompt, generatedPrompt };
};

export default useFormLogic;
