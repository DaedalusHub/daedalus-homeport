import Head from 'next/head';
import Chat from '@/components/Chat';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Daedalus Homeport</title>
                <link rel="icon" href="/daedalus.ico" />
            </Head>

            <main className="flex flex-col items-center space-y-8">
                <h1 className="text-4xl text-primary">Daedalus Homeport</h1>
                <a href="https://en.wikipedia.org/wiki/Daedalus">
                    <img
                        alt="Daedalus Homeport"
                        src="/daedalus.png"
                        className="w-60"
                    />
                </a>
                <Chat />
            </main>
        </div>
    );
}
