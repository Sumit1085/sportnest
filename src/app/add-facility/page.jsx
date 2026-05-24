'use client';

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@heroui/react";
import { MdAddCircle, MdOutlineSports, MdLocationOn, MdAttachMoney, MdPeople, MdAccessTime, MdDescription } from "react-icons/md";

export default function AddFacilityPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [name, setName] = useState("");
    const [type, setType] = useState("Football Turf");
    const [imageURL, setImageURL] = useState("");
    const [location, setLocation] = useState("");
    const [pricePerHour, setPricePerHour] = useState("");
    const [capacity, setCapacity] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Available slots selection
    const timeSlots = [
        "06:00 - 08:00",
        "08:00 - 10:00",
        "10:00 - 12:00",
        "12:00 - 14:00",
        "14:00 - 16:00",
        "16:00 - 18:00",
        "18:00 - 20:00",
        "20:00 - 22:00",
        "22:00 - 24:00"
    ];
    const [selectedSlots, setSelectedSlots] = useState([]);

    const handleSlotChange = (slot) => {
        if (selectedSlots.includes(slot)) {
            setSelectedSlots(selectedSlots.filter(s => s !== slot));
        } else {
            setSelectedSlots([...selectedSlots, slot]);
        }
    };

    useEffect(() => {
        if (!isPending && !user) {
            toast.error("Please login to access this page.");
            router.push("/login?callback=/add-facility");
        }
    }, [user, isPending, router]);

    if (isPending) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#F4F4F7]">
                <Spinner size="lg" color="warning" />
                <p className="text-gray-500 font-medium animate-pulse">Verifying session...</p>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (!name || !imageURL || !location || !pricePerHour || !capacity || !description) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (selectedSlots.length === 0) {
            toast.error("Please select at least one available time slot.");
            return;
        }

        try {
            setIsSubmitting(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            
            const response = await fetch(`${apiUrl}/facility`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    type,
                    thumbnail: imageURL,
                    location,
                    price_per_hour: parseFloat(pricePerHour),
                    capacity: parseInt(capacity),
                    available_slots: selectedSlots,
                    description,
                    owner_email: user.email,
                    status: "available"
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add facility");
            }

            toast.success("Facility added successfully!");
            router.push("/manage-facilities");
        } catch (error) {
            console.error("Add Facility Error:", error);
            toast.error("Failed to add facility. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F4F4F7] py-12 px-4 md:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                
                {/* Form Header */}
                <div className="bg-[#071B34] text-white p-8 md:p-10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-extrabold flex items-center gap-3">
                            <MdAddCircle className="text-orange-500 text-4xl" />
                            Add New Facility
                        </h1>
                        <p className="text-gray-300 mt-2 max-w-xl">
                            List your sports facility on SportNest to start receiving bookings from verified athletes.
                        </p>
                    </div>
                    {/* Decorative shape */}
                    <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-orange-500/10" />
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                    
                    {/* Facility Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Facility Name
                        </label>
                        <div className="relative">
                            <MdOutlineSports className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="e.g. Camp Nou Turf, Wembley Arena"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 text-black transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Facility Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Facility Type
                            </label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-2xl py-4 px-4 text-black transition-all cursor-pointer"
                            >
                                <option value="Football Turf">Football Turf</option>
                                <option value="Badminton Court">Badminton Court</option>
                                <option value="Swimming Lane">Swimming Lane</option>
                                <option value="Tennis Court">Tennis Court</option>
                                <option value="Basketball Court">Basketball Court</option>
                                <option value="Cricket Net">Cricket Net</option>
                            </select>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Image URL (e.g. from imgbb/postimage)
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com/court.jpg"
                                value={imageURL}
                                onChange={(e) => setImageURL(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 px-4 text-black transition-all"
                                required
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Location
                        </label>
                        <div className="relative">
                            <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="e.g. 123 Sports Ave, Sector 5, Dhaka"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 text-black transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Price per hour */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price Per Hour (৳)
                            </label>
                            <div className="relative">
                                <MdAttachMoney className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="500"
                                    value={pricePerHour}
                                    onChange={(e) => setPricePerHour(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 text-black transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Capacity (No. of players)
                            </label>
                            <div className="relative">
                                <MdPeople className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="10"
                                    value={capacity}
                                    onChange={(e) => setCapacity(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 text-black transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Available Time Slots */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <MdAccessTime size={18} className="text-gray-400" />
                            Available Time Slots
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                            {timeSlots.map((slot) => (
                                <label
                                    key={slot}
                                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer select-none transition-all ${
                                        selectedSlots.includes(slot)
                                            ? "bg-orange-500 border-orange-500 text-white"
                                            : "bg-white border-gray-200 hover:border-orange-200 text-gray-700"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedSlots.includes(slot)}
                                        onChange={() => handleSlotChange(slot)}
                                        className="hidden"
                                    />
                                    {slot}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <MdDescription size={18} className="text-gray-400" />
                            Description
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Describe your arena, amenities, safety guidelines, rules..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 px-4 text-black transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Auto-filled owner email banner */}
                    <div className="bg-orange-50/70 border border-orange-100 p-4 rounded-2xl flex justify-between items-center text-xs md:text-sm text-gray-600">
                        <span>Owner Email (Auto-filled)</span>
                        <span className="font-semibold text-black bg-white px-3 py-1.5 rounded-lg border border-orange-100">
                            {user.email}
                        </span>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-full transition-all shadow-lg shadow-orange-500/20 active:scale-98 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isSubmitting ? "Submitting Facility..." : "Create Facility"}
                    </button>

                </form>

            </div>
        </main>
    );
}
