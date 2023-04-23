import { Dispatch, SetStateAction } from 'react';

const useGoals = (
    goals: string[],
    setGoals: Dispatch<SetStateAction<string[]>>
) => {
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

    return { addGoal, removeGoal, handleGoalChange };
};

export default useGoals;
