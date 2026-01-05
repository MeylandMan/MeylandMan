import { useState } from 'react';

import { leftNavLinks } from '@constants/index.js';


const NavItems = ({ onClick = () => {} }) => (
    <div className="flex gap-8 max-md:flex-col max-md:gap-4 max-md:bg-black max-md:p-4 max-md:rounded-md">
        <ul className="flex flex-col items-center gap-4 md:flex-row md:gap-6 relative z-20">
            {leftNavLinks.map((item) => (
            <li key={item.id} className="text-neutral-400 hover:text-white font-generalsans max-md:hover:bg-black-500 max-md:w-full max-md:rounded-md py-2 max-md:px-5">
                <a href={item.href} className="text-lg hover:text-white transition-colors" onClick={onClick}>
                {item.name}
                </a>
            </li>
            ))}
        </ul>
    </div>
);

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center py-5 mx-auto c-space">
                    <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
                        Meyland
                    </a>

                    <button
                        onClick={toggleMenu}
                        className="text-neutral-400 hover:text-white focus:outline-none md:hidden flex"
                        aria-label="Toggle menu">
                        <img src={isOpen ? './assets/close.svg' : './assets/menu.svg'} alt="toggle" className="w-6 h-6" />
                    </button>

                    <nav className="md:flex hidden">
                        <NavItems />
                    </nav>
                </div>
            </div>
            

            <div className={`absolute left-0 right-0 bg-black-200 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden z-20 mx-auto md:hidden block ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <nav>
                    <NavItems onClick={closeMenu} />
                </nav>
            </div>
        </header>
    )
}

export default NavBar;