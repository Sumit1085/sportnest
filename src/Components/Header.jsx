import Link from 'next/link';
import React from 'react';

const Header = () => {
    return (
        <div>
            <nav className="flex items-center justify-between px-10 py-5 bg-white text-black">
                {/* Logo */}
                <div className="text-2xl font-extrabold">
                    Sport<span className="text-black">Nest</span>
                </div>

                {/* Nav Links */}
                <div className="flex items-center gap-8 text-sm font-medium">
                    <Link
                        href={'/'}
                        className="text-orange-500 border-b-2 border-orange-500 pb-1"
                    >
                        Home
                    </Link>

                    <Link href="#" className="hover:text-orange-500 transition">
                        All Facilities
                    </Link>
                    <Link href="#" className="hover:text-orange-500 transition">
                        My Bookings
                    </Link>
                    <Link href="#" className="hover:text-orange-500 transition">
                        Manage My Facilities
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-5 text-sm">
                    <button className="hover:text-orange-500 transition">Login</button>

                    <div className="w-7 h-7 rounded-full border border-black flex items-center justify-center">
                        <span className="text-xs">◎</span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;