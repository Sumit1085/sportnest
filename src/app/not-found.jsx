'use client';

import Link from "next/link";
import { MdOutlineSportsTennis, MdHome } from "react-icons/md";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F4F4F7] px-6 text-center">
            <div className="bg-white p-10 md:p-14 rounded-3xl shadow-xl max-w-md w-full border border-gray-100 flex flex-col items-center">
                
                {/* Sports icon with bounce animation */}
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 text-5xl mb-6 shadow-sm animate-bounce">
                    <MdOutlineSportsTennis />
                </div>

                <h1 className="text-6xl font-black text-[#071B34] tracking-tight">404</h1>
                
                <h2 className="text-xl font-bold text-gray-800 mt-4">
                    Out of Bounds!
                </h2>
                
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                    Oops! The page you are looking for has been kicked out of play or doesn't exist in our stadium. Let's get you back on the field.
                </p>

                <Link href="/" className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-2xl transition duration-200 shadow-md shadow-orange-500/10 flex items-center gap-2 text-sm select-none cursor-pointer">
                    <MdHome size={18} />
                    Back Home
                </Link>
            </div>
        </div>
    );
}
