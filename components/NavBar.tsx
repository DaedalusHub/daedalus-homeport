import React from 'react';
import Logo from '@/components/Logo';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar mb-4 bg-primary-focus/50 justify-between">
            <div className="px-2 mx-2">
                <h1 className="font-bold text-4xl text-primary-content p-2 rounded-lg">
                    Daedalus Homeport
                </h1>
            </div>
            <div className="">
                <Logo />
            </div>
        </nav>
    );
};

export default NavBar;
