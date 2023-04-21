import React from 'react';
import Logo from '@/components/Logo';

interface NavBarProps {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ selectedTab, setSelectedTab }) => {
    const renderTabs = () => {
        const tabs = [
            { id: 'chat', label: 'Chat' },
            { id: 'project', label: 'Project' },
            { id: 'directory', label: 'Project Files' }
        ];

        return tabs.map((tab) => (
            <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`tab tab-boxed rounded-lg text-primary-content ${
                    selectedTab === tab.id ? 'tab-active bg-primary' : ''
                }`}
            >
                {tab.label}
            </button>
        ));
    };

    return (
        <nav className="navbar mb-4 bg-primary-focus/50 justify-between">
            <div className="px-2 mx-2">
                <h1 className="font-bold text-4xl text-primary-content p-2 rounded-lg">
                    Daedalus Homeport
                </h1>
            </div>
            <div className="flex items-center space-x-4">{renderTabs()}</div>
            <div className="">
                <Logo />
            </div>
        </nav>
    );
};

export default NavBar;
