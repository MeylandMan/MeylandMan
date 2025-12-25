import { useState } from 'react';

import { leftNavLinks } from '@constants/index.js';


const NavItems = ({ onClick = () => {} }) => (
    <div className="flex gap-8 max-sm:flex-col max-sm:gap-4 max-sm:bg-black max-sm:p-4 max-sm:rounded-md">
        <ul className="flex flex-col items-center gap-4 sm:flex-row md:gap-6 relative z-20">
            {leftNavLinks.map((item) => (
            <li key={item.id} className="text-neutral-400 hover:text-white font-generalsans max-sm:hover:bg-black-500 max-sm:w-full max-sm:rounded-md py-2 max-sm:px-5">
                <a href={item.href} className="text-lg hover:text-white transition-colors" onClick={onClick}>
                {item.name}
                </a>
            </li>
            ))}
        </ul>
    </div>
);

const NavBar = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto c-space">
                    <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
                        Meyland
                    </a>
                    <nav>
                        <NavItems />
                    </nav>
                </div>
            </div>
            
        </header>
    )
}

export default NavBar;