import { useEffect, useState } from 'react';
import { getLogger } from '@/lib/logger';

const log = getLogger('useGoals');

export interface ProjectInterface {
    id: string;
    name: string;
    intent: string;
    goals: string[];
}

const useGoals = (selectedProject: ProjectInterface | null) => {
    const [goals, setGoals] = useState<string[]>(
        selectedProject?.goals || ['']
    );

    useEffect(() => {
        log.debug(`Selected project: ${JSON.stringify(selectedProject)}`);
        setGoals((prevGoals) => {
            log.debug(`Updated goals: ${JSON.stringify(prevGoals)}`);
            return selectedProject?.goals || [''];
        });
    }, [selectedProject]);

    const addGoal = () => {
        setGoals((goals) => [...goals, '']);
    };

    const removeGoal = (index: number) => {
        setGoals((goals) => goals.filter((_, i) => i !== index));
    };

    const handleGoalChange = (index: number, newGoalText: string) => {
        setGoals((goals) =>
            goals.map((goal, i) => (i === index ? newGoalText : goal))
        );
    };

    log.debug(`Current goals: ${JSON.stringify(goals)}`);

    return {
        goals,
        addGoal,
        removeGoal,
        handleGoalChange,
        setGoals
    };
};

export default useGoals;
