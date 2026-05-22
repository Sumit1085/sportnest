'use client'

import { ArrowRightFromSquare, Bars, Gear, Persons } from "@gravity-ui/icons";
import { authClient } from '@/lib/auth-client';
import { Avatar, Dropdown, Label, Spinner } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';

const Header = () => {
    const { data: session ,isPending} = authClient.useSession();
    const user = session?.user;

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await authClient.signOut();
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">

            <nav className="flex items-center justify-between px-5 md:px-10 py-4">

                {/* Logo */}
                <div className="text-xl md:text-2xl font-extrabold">
                    Sport<span className="text-black">Nest</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className="hover:text-orange-500 transition">
                        Home
                    </Link>

                     <Link href="/all-facilities" className="hover:text-orange-500 transition">
                        All Facilities
                    </Link>

                    {user && (
                        <>
                            <Link href="/my-bookings" className="hover:text-orange-500 transition">
                                My Bookings
                            </Link>

                            <Link href="/add-facility" className="hover:text-orange-500 transition">
                                Add Facility
                            </Link>

                            <Link href="/manage-facilities" className="hover:text-orange-500 transition">
                                Manage My Facilities
                            </Link>
                        </>
                    )}
                </div>

                {/* Right Side Desktop */}
                <div className="hidden md:flex items-center gap-4">

                    {user ? (
                        <Dropdown>

                            <Dropdown.Trigger className="rounded-full cursor-pointer">
                                <Avatar>
                                    <Avatar.Image src={user.image} alt={user.name} />
                                    <Avatar.Fallback>
                                        {user.name?.slice(0, 2).toUpperCase()}
                                    </Avatar.Fallback>
                                </Avatar>
                            </Dropdown.Trigger>

                            <Dropdown.Popover>
                                <div className="px-3 pt-3 pb-1">
                                    <p className="font-medium text-black">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>

                                <Dropdown.Menu>

                                    <Dropdown.Item>
                                        <Link href="/my-bookings" className="w-full text-left block text-sm text-gray-700">
                                            My Bookings
                                        </Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <Link href="/add-facility" className="w-full text-left block text-sm text-gray-700">
                                            Add Facility
                                        </Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item>
                                        <Link href="/manage-facilities" className="w-full text-left block text-sm text-gray-700">
                                            Manage My Facilities
                                        </Link>
                                    </Dropdown.Item>

                                    <Dropdown.Item variant="danger" onClick={handleLogout}>
                                        <div className="flex justify-between w-full text-left text-sm text-red-600">
                                            <span>Logout</span>
                                            <ArrowRightFromSquare className="size-3.5" />
                                        </div>
                                    </Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown.Popover>
                        </Dropdown>
                    ) : (
                        <>
                            <Link href="/login">
                                <button className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 cursor-pointer">
                                    Login
                                </button>
                            </Link>

                            <Link href="/register">
                                <button className="border border-orange-500 text-orange-500 px-5 py-2 rounded-md hover:bg-orange-50 cursor-pointer">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}

                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl text-black"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Bars/>
                </button>

            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-5 pb-4 flex flex-col gap-4 text-sm font-medium border-t">

                    <Link href="/" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-orange-500">
                        Home
                    </Link>

                    <Link href="/all-facilities" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-orange-500">
                        All Facilities
                    </Link>

                    {user && (
                        <>
                            <Link href="/my-bookings" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-orange-500">
                                My Bookings
                            </Link>

                            <Link href="/add-facility" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-orange-500">
                                Add Facility
                            </Link>

                            <Link href="/manage-facilities" onClick={() => setMenuOpen(false)} className="text-gray-800 hover:text-orange-500">
                                Manage Facilities
                            </Link>
                        </>
                    )}

                    <div className="flex gap-3 pt-2">

                        {isPending? <Spinner color="current" size="sm" />: user ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded-md w-full cursor-pointer"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="w-full" onClick={() => setMenuOpen(false)}>
                                    <button className="bg-orange-500 text-white px-4 py-2 rounded-md w-full cursor-pointer">
                                        Login
                                    </button>
                                </Link>

                                 <Link href="/register" className="w-full" onClick={() => setMenuOpen(false)}>
                                    <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md w-full cursor-pointer">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            )}

        </header>
    );
};

export default Header;