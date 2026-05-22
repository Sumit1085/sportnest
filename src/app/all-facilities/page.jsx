'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { MdFilterList, MdOutlineSports, MdAttachMoney, MdOutlineArrowDropDown } from 'react-icons/md';
import { Spinner } from '@heroui/react';
export default function AllFacilityPage() {
    const [facilities, setFacilities] = useState([]);
    const [filteredFacilities, setFilteredFacilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    useEffect(() => {
        const loadFacilities = async () => {
            try {
                setIsLoading(true);
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
                const res = await fetch(`${apiUrl}/facility`, { cache: 'no-store' });
                if (res.ok) {
                    const data = await res.json();
                    setFacilities(data);
                    setFilteredFacilities(data);
                }
            } catch (error) {
                console.error("Error loading facilities:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadFacilities();
    }, []);
    // Handle searching, filtering, and sorting
    useEffect(() => {
        let result = [...facilities];
        // 1. Search filter
        if (searchTerm.trim() !== "") {
            const query = searchTerm.toLowerCase();
            result = result.filter(
                f => f.name.toLowerCase().includes(query) || 
                     f.location.toLowerCase().includes(query)
            );
        }
        // 2. Type filter
        if (selectedType !== "All") {
            result = result.filter(f => f.type === selectedType);
        }
        // 3. Sorting
        if (sortBy === "price-low") {
            result.sort((a, b) => parseFloat(a.price_per_hour) - parseFloat(b.price_per_hour));
        } else if (sortBy === "price-high") {
            result.sort((a, b) => parseFloat(b.price_per_hour) - parseFloat(a.price_per_hour));
        } else if (sortBy === "capacity") {
            result.sort((a, b) => parseInt(b.capacity) - parseInt(a.capacity));
        }
        // setFilteredFacilities(result);
    }, [searchTerm, selectedType, sortBy, facilities]);
    const facilityTypes = ["All", "Football Turf", "Badminton Court", "Swimming Lane", "Tennis Court", "Basketball Court", "Cricket Net"];
    return (
        <div className="min-h-screen bg-[#F4F4F7] px-4 md:px-8 py-12">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center md:text-left mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-[#0B1B34] tracking-tight">
                        Find Your Perfect Court
                    </h1>
                    <p className="text-gray-500 mt-3 max-w-2xl text-sm md:text-base">
                        Browse premium arenas, professional-grade turf, and competitive venues curated for elite athletes.
                    </p>
                </div>
                {/* Filters Section */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                    
                    {/* Search Input */}
                    <div className="relative grow">
                        <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-bold" />
                        <input
                            type="text"
                            placeholder="Search by arena name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-3.5 pl-12 pr-4 text-black text-sm transition-all"
                        />
                    </div>
                    {/* Filter Type */}
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                        <div className="relative">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="w-full sm:w-48 appearance-none bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-2xl py-3.5 px-4 pr-10 text-black text-sm transition-all cursor-pointer"
                            >
                                {facilityTypes.map((t) => (
                                    <option key={t} value={t}>{t === "All" ? "All Categories" : t}</option>
                                ))}
                            </select>
                            <MdOutlineSports className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                        </div>
                        {/* Sort */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-48 appearance-none bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-2xl py-3.5 px-4 pr-10 text-black text-sm transition-all cursor-pointer"
                            >
                                <option value="default">Default Sorting</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="capacity">Highest Capacity</option>
                            </select>
                            <MdAttachMoney className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
                        </div>
                    </div>
                </div>
                {/* Facilities Grid */}
                {isLoading ? (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
                        <Spinner size="lg" color="warning" />
                        <p className="text-gray-500 font-medium">Fetching arenas...</p>
                    </div>
                ) : filteredFacilities.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 max-w-md mx-auto shadow-sm">
                        <p className="text-gray-400 text-lg font-semibold">No Arenas Found</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Try adjusting your search terms or selecting another category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredFacilities.map((facility) => (
                            <div
                                key={facility._id}
                                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-gray-100"
                            >
                                {/* Image */}
                                <div className="relative h-48 w-full bg-gray-100">
                                    <Image
                                        src={facility.thumbnail || "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600"}
                                        alt={facility.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {facility.type || "Sports Arena"}
                                    </span>
                                </div>
                                {/* Content */}
                                <div className="p-6 grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-2 mb-2">
                                            <h3 className="font-extrabold text-xl text-[#071B34] line-clamp-1">{facility.name}</h3>
                                            <span className="text-orange-600 font-black text-sm shrink-0">
                                                ৳{facility.price_per_hour}/hr
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <CiLocationOn size={16} className="mr-1 text-orange-600 shrink-0" />
                                            <span className="line-clamp-1">{facility.location}</span>
                                        </div>
                                    </div>
                                    <button className="w-full mt-6 bg-[#071B34] hover:bg-orange-500 text-white py-3.5 rounded-xl font-bold transition duration-200 shadow-sm cursor-pointer text-xs uppercase tracking-wider">
                                        <Link href={`/all-facilities/${facility._id}`} className="block w-full h-full text-center">
                                            Book Now
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
