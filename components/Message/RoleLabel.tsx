import React from 'react';

interface RoleLabelProps {
    role: string;
}

const RoleLabel: React.FC<RoleLabelProps> = ({ role }) => {
    return (
        <div
            className={`min-w-fit w-24 rounded px-2 py-1 text-white text-center ${
                role === 'user' ? 'bg-primary' : 'bg-secondary'
            }`}
        >
            <strong className="font-bold">{role}</strong>
        </div>
    );
};

export default RoleLabel;
