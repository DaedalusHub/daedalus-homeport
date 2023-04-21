import Head from 'next/head';
import React, { useState } from 'react';

import ChatUI from '@/components/Chat/ChatUI';
import NavBar from '@/components/NavBar';
import FileTreeDisplay from '@/components/FileTree/FileTreeDisplay';
import Onboarding from "@/components/Onboarding";

export default function Home() {
    const [selectedTab, setSelectedTab] = useState('chat');

    const renderContent = () => {
        if (selectedTab === 'chat') {
            return <ChatUI />;
        } else if (selectedTab === 'project') {
            return <Onboarding />;
        } else if (selectedTab === 'directory') {
            return <FileTreeDisplay />;
        }
    };

    return (
        <div>
            <Head>
                <title>Daedalus Homeport</title>
                <link rel="icon" href="/daedalus.ico" />
            </Head>
            <main>
                <div className="App">
                    <NavBar
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
