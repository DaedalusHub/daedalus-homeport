import Head from 'next/head';
import React from 'react';

import ChatUI from '@/components/Chat/ChatUI';
import NavBar from '@/components/NavBar';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Daedalus Homeport</title>
                <link rel="icon" href="/daedalus.ico" />
            </Head>

            <NavBar />
            <main className="flex flex-col items-center space-y-8">
                <ChatUI />
            </main>
        </div>
    );
}
