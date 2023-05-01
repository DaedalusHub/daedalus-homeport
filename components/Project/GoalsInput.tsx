import React from 'react';
import { ErrorMessage, Field } from 'formik';

interface GoalsInputProps {
    goals: string[];
    addGoal: () => void;
    removeGoal: (index: number) => void;
    handleGoalChange: (index: number, value: string) => void;
}

const GoalsInput: React.FC<GoalsInputProps> = ({
    goals,
    addGoal,
    removeGoal,
    handleGoalChange
}) => {
    return (
        <>
            <div className="flex flex-col items-start">
                <label htmlFor="goals" className="block mb-1 font-bold">
                    Project Goals:
                </label>
                {goals.map((goal, index) => (
                    <div
                        key={index}
                        className="mb-2 flex items-center space-x-2 w-4/5"
                    >
                        <span className="font-semibold">{index + 1}.</span>
                        <Field
                            name={`goals[${index}]`}
                            value={goal}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => handleGoalChange(index, e.target.value)}
                            placeholder={`Goal ${index + 1}`}
                            className="input input-bordered w-full inline-block"
                        />
                        <button
                            type="button"
                            onClick={() => removeGoal(index)}
                            className="btn btn-error btn-xs"
                        >
                            Remove
                        </button>
                        <ErrorMessage
                            name={`goals[${index}]`}
                            render={(msg) => (
                                <p className="text-error text-sm mb-2">{msg}</p>
                            )}
                        />
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={addGoal}
                className="btn btn-primary mb-2 mr-2"
            >
                Add Goal
            </button>
        </>
    );
};

export default GoalsInput;
