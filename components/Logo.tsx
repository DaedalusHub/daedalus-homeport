import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => (
    <div className="mask mask-circle">
        <a href="https://en.wikipedia.org/wiki/Daedalus">
            <Image
                alt="Daedalus HomePort"
                src="/daedalus.png"
                width={64}
                height={64}
            />
        </a>
    </div>
);
export default Logo;
