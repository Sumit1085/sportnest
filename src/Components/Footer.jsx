import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-[#071B34] text-gray-300 py-8 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="text-center lg:text-left">
                        <h2 className="text-white text-xl font-bold">
                            SportNest
                        </h2>

                        <p className="text-sm mt-2">
                            © 2026 CourtCommander. Elevate Your Game.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="#" className="hover:text-white transition">
                            Privacy Policy
                        </Link>

                        <Link href="#" className="hover:text-white transition">
                            Terms of Service
                        </Link>

                        <Link href="#" className="hover:text-white transition">
                            Contact Support
                        </Link>

                        <Link href="#" className="hover:text-white transition">
                            Partner With Us
                        </Link>
                    </div>

                    {/* Icons */}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition cursor-pointer">
                            🌐
                        </div>

                        <div className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:border-white hover:text-white transition cursor-pointer">
                            📱
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;