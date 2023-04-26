import { useState } from 'react';

const useGoals = () => {
    const [goals, setGoals] = useState<string[]>(['']);

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

    return {
        goals,
        addGoal,
        removeGoal,
        handleGoalChange,
        setGoals
    };
};

export default useGoals;
