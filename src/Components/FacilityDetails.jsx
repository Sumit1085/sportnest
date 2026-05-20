// components/FacilityDetails.jsx

import { CiLocationOn } from "react-icons/ci";

export default function FacilityDetails({ facility }) {
    console.log(facility)
    return (
        <div>
            <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                    Professional Grade
                </span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                    Indoor Courts
                </span>
            </div>

            <h1 className="text-4xl font-bold mb-3">{facility.name}</h1>

            <div className="flex items-center gap-2 text-gray-500">
                <CiLocationOn />
                {facility.location}
            </div>

            <p className="mt-6 text-gray-600 leading-relaxed">
                {facility.description}
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {["Air Conditioned", "Showers", "LED Lights", "Pro Shop"].map((item) => (
                    <div key={item} className="p-4 bg-gray-100 rounded-lg text-center text-sm">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}