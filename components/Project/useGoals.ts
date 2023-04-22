import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Goal {
    id: string;
    text: string;
}

const useGoals = (initialGoals?: string[]) => {
    const [goals, setGoals] = useState<Goal[]>(
        initialGoals?.map((goal) => ({ id: uuidv4(), text: goal })) || []
    );

    const addGoal = () => {
        setGoals((goals) => [...goals, { id: uuidv4(), text: '' }]);
    };

    const removeGoal = (goalId: string) => {
        setGoals((goals) => goals.filter((goal) => goal.id !== goalId));
    };

    const handleGoalChange = (goalId: string, newGoalText: string) => {
        setGoals((goals) =>
            goals.map((goal) =>
                goal.id === goalId ? { ...goal, text: newGoalText } : goal
            )
        );
    };

    return { goals, addGoal, removeGoal, handleGoalChange, setGoals };
};

export default useGoals;
