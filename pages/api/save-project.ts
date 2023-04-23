// pages/api/saveProject.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { saveProjectDetails } from '@/lib/project';
import { getLogger } from '@/lib/logger';

const log = getLogger('API');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { projectId, name, intent, goals } = req.body;
        log.info(`Saving project details: ${JSON.stringify({ projectId, name, intent, goals })}`);
        try {
            await saveProjectDetails(projectId, name, intent, goals);
            res.status(200).json({ message: 'Project details saved successfully' });
        } catch (error) {
            log.error(`Error saving project details: ${error}`);
            res.status(500).json({ message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
