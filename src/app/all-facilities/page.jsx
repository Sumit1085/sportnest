
// import { useMemo, useState } from 'react';
import { fetchFacility } from '@/lib/facility/data';
import { Description, Label, SearchField } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { CiLocationOn, CiSearch } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';



const AllFacilityPage = async () => {
    const facilities = await fetchFacility()
    // const [search, setSearch] = useState('');


    console.log(facilities)
    return (
        <div>
            <div className="min-h-screen bg-[#F4F4F7] px-4 md:px-8 py-10">

                {/* HEADER */}
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-[#0B1B34]">
                        Find Your Perfect Court
                    </h1>

                    <p className="text-gray-500 mt-3 max-w-xl">
                        Browse high-performance venues tailored for your competitive edge.
                    </p>

                    {/* SEARCH */}
                    <div className="relative mt-8 max-w-xl">


                        <SearchField name="search">
                            <Label>Search Facilities</Label>
                            <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input className="w-full" placeholder="Search Facilities..." />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                            <Description>Enter keywords to search for Facilities</Description>
                        </SearchField>
                    </div>

                    <div className='grid grid-cols-3 gap-5 my-10'>
                        {
                            facilities.map(facility => <div
                                key={facility._id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
                            >
                                {/* Image */}
                                <div className="relative h-44 w-full">
                                    <Image
                                        src={facility.thumbnail}
                                        alt={facility.name}
                                        fill
                                        className="object-cover"
                                    />

                                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                        {facility.status}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-lg text-black">{facility.name}</h3>
                                        <span className="text-orange-600 font-bold">
                                            ৳{facility.price_per_hour} / hr
                                        </span>
                                    </div>

                                    <div className="flex items-center text-gray-500 text-sm mt-1">
                                        <CiLocationOn size={14} className="mr-1 text-orange-600" />
                                        {facility.location}
                                    </div>



                                    {/* Button */}
                                    <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition">
                                        <Link href={`/all-facilities/${facility._id}`}>Book Now</Link>
                                    </button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllFacilityPage;


