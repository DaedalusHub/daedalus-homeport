import React from 'react';

interface RoleLabelProps {
    role: string;
}

const RoleLabel: React.FC<RoleLabelProps> = ({ role }) => {
    return (
        <div
            className={`min-w-fit w-32 rounded px-2 py-1 text-white text-center ${
                role === 'User' ? 'bg-primary' : 'bg-secondary'
            }`}
        >
            <strong className="font-bold">{role}</strong>
        </div>
    );
};

export default RoleLabel;
