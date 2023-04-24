// Part: /pages/index.tsx
// Code Reference: https://github.com/vercel/next.js/
// Documentation: https://nextjs.org/docs/

import Head from 'next/head';
import React, { useState } from 'react';

import ChatUI from '@/components/Chat/ChatUI';
import NavBar from '@/components/NavBar';
import FileTreeDisplay from '@/components/FileTree/FileTreeDisplay';
import Project from '@/components/Project/Project';
import { getLogger } from '@/lib/logger';

const log = getLogger('Home');

export default function Home() {
    const [selectedTab, setSelectedTab] = useState('chat');
    const [projectDetails, setProjectDetails] = useState<{
        name: string;
        intent: string;
        goals: string[];
    } | null>(null);

    const handleProjectCompleted = (values: {
        name: string;
        intent: string;
        goals: string[];
    }) => {
        log.info(`Project details received: ${JSON.stringify(values)}`);
        setProjectDetails(values);
    };

    const renderContent = () => {
        if (selectedTab === 'chat') {
            return <ChatUI />;
        } else if (selectedTab === 'project') {
            return <Project onCompleted={handleProjectCompleted} />;
        } else if (selectedTab === 'directory') {
            return <FileTreeDisplay />;
        }
    };

    return (
        <div>
            <Head>
                <title>Daedalus HomePort</title>
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
