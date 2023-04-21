// src/hooks/useGoals.ts

import { useState } from 'react';

interface UseGoals {
    goals: string[];
    addGoal: () => void;
    removeGoal: (index: number) => void;
    handleGoalChange: (index: number, value: string) => void;
}

const useGoals = (initialGoals: string[] = []): UseGoals => {
    const [goals, setGoals] = useState<string[]>(initialGoals);

    const addGoal = () => {
        setGoals([...goals, '']);
    };

    const removeGoal = (index: number) => {
        setGoals(goals.filter((_, i) => i !== index));
    };

    const handleGoalChange = (index: number, value: string) => {
        const updatedGoals = goals.map((goal, i) =>
            i === index ? value : goal
        );
        setGoals(updatedGoals);
    };

    return {
        goals,
        addGoal,
        removeGoal,
        handleGoalChange
    };
};

export default useGoals;
