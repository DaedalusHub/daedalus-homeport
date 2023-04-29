// useFormLogic.ts
import { useState } from 'react';
import { getLogger } from '@/lib/logger';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const log = getLogger('useFormLogic');

const useFormLogic = (onCompleted) => {
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    const generatePrompt = (values) => {
        const prompt = `You are assisting me on a project with the following details:
- Title: ${values.name}
- Intent: ${values.intent}
- Goals:
${values.goals.map((goal, index) => `  ${index + 1}. ${goal}`).join('\n')}`;

        setGeneratedPrompt(prompt);
    };

    const handleSubmit = async (values, actions) => {
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

    return { handleSubmit, generatePrompt, generatedPrompt };
};

export default useFormLogic;
