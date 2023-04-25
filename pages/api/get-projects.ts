import { NextApiRequest, NextApiResponse } from 'next';
import { getAllProjects } from '@/lib/project';
import { getLogger } from '@/lib/logger';

const log = getLogger('API');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        log.info(`Fetching all projects`);

        try {
            const projects = await getAllProjects();
            res.status(200).json(projects);
        } catch (error) {
            log.error(`Error fetching projects: ${error}`);
            res.status(500).json({ message: (error as Error).message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};
