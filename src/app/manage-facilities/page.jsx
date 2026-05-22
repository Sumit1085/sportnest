'use client';

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Spinner } from "@heroui/react";
import { MdSettings, MdEdit, MdDelete, MdLocationOn, MdAttachMoney, MdPeople, MdClose, MdWarning } from "react-icons/md";

export default function ManageFacilitiesPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [facilities, setFacilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingFacility, setEditingFacility] = useState(null);

    // Edit Form state
    const [editName, setEditName] = useState("");
    const [editType, setEditType] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editLocation, setEditLocation] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editCapacity, setEditCapacity] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editSlots, setEditSlots] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

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

    const fetchMyFacilities = async () => {
        if (!user) return;
        try {
            setIsLoading(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/facility`, { cache: 'no-store' });
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            // Filter to show only facilities owned by this user
            const owned = data.filter(f => f.owner_email === user.email);
            setFacilities(owned);
        } catch (error) {
            console.error("Fetch facilities error:", error);
            toast.error("Failed to load facilities");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending && !user) {
            toast.error("Please login to access this page.");
            router.push("/login?callback=/manage-facilities");
        }
    }, [user, isPending, router]);

    useEffect(() => {
        if (user) {
            fetchMyFacilities();
        }
    }, [user]);

    if (isPending || (user && isLoading)) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#F4F4F7]">
                <Spinner size="lg" color="warning" />
                <p className="text-gray-500 font-medium animate-pulse">Loading facilities...</p>
            </div>
        );
    }

    if (!user) return null;

    const handleDelete = async (id, name) => {
        const confirmed = window.confirm(`⚠️ WARNING ⚠️\n\nAre you absolutely sure you want to delete "${name}"?\n\nThis will remove the facility forever. This action cannot be undone.`);
        if (!confirmed) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/facility/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) throw new Error("Failed to delete");

            toast.success("Facility deleted successfully!");
            fetchMyFacilities(); // reload list
        } catch (error) {
            console.error("Delete facility error:", error);
            toast.error("Failed to delete facility. Please try again.");
        }
    };

    const handleStartEdit = (facility) => {
        setEditingFacility(facility);
        setEditName(facility.name);
        setEditType(facility.type || "Football Turf");
        setEditImage(facility.thumbnail || facility.image);
        setEditLocation(facility.location);
        setEditPrice(facility.price_per_hour);
        setEditCapacity(facility.capacity);
        setEditDescription(facility.description);
        setEditSlots(facility.available_slots || []);
    };

    const handleSlotChange = (slot) => {
        if (editSlots.includes(slot)) {
            setEditSlots(editSlots.filter(s => s !== slot));
        } else {
            setEditSlots([...editSlots, slot]);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (editSlots.length === 0) {
            toast.error("Please select at least one available slot.");
            return;
        }

        try {
            setIsUpdating(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            const res = await fetch(`${apiUrl}/facility/${editingFacility._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editName,
                    type: editType,
                    thumbnail: editImage,
                    location: editLocation,
                    price_per_hour: parseFloat(editPrice),
                    capacity: parseInt(editCapacity),
                    available_slots: editSlots,
                    description: editDescription
                })
            });

            if (!res.ok) throw new Error("Update failed");

            toast.success("Facility updated successfully!");
            setEditingFacility(null); // close edit state
            fetchMyFacilities(); // refresh list
        } catch (error) {
            console.error("Update facility error:", error);
            toast.error("Failed to update facility");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F4F4F7] py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-[#071B34] flex items-center gap-3">
                            <MdSettings className="text-orange-500" />
                            Manage Facilities
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Manage all arenas you listed. Edit details, time slots, or remove facilities.
                        </p>
                    </div>

                    <button 
                        onClick={() => router.push("/add-facility")}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3.5 rounded-2xl transition duration-200 shadow-md shadow-orange-500/10 cursor-pointer text-sm"
                    >
                        + Add Facility
                    </button>
                </div>

                {/* Facilities List Grid */}
                {facilities.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
                        <MdWarning className="text-5xl text-orange-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800">No Facilities Found</h3>
                        <p className="text-gray-500 mt-2 mb-6">
                            You haven't listed any sports facilities on SportNest yet.
                        </p>
                        <button
                            onClick={() => router.push("/add-facility")}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3.5 rounded-xl cursor-pointer"
                        >
                            List Your First Facility
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {facilities.map((fac) => (
                            <div 
                                key={fac._id} 
                                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col h-full"
                            >
                                {/* Thumbnail */}
                                <div className="relative h-48 w-full bg-gray-100">
                                    <Image 
                                        src={fac.thumbnail || "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600"} 
                                        alt={fac.name}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                        {fac.type || "Sports Arena"}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-extrabold text-xl text-[#071B34] line-clamp-1">
                                            {fac.name}
                                        </h3>
                                        
                                        <div className="flex items-center text-gray-500 text-sm mt-2">
                                            <MdLocationOn className="text-orange-500 mr-1 text-base flex-shrink-0" />
                                            <span className="line-clamp-1">{fac.location}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mt-4 border-t border-b border-gray-100 py-3 text-sm">
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <MdAttachMoney className="text-orange-500 text-lg" />
                                                <span>৳{fac.price_per_hour}/hr</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-gray-600">
                                                <MdPeople className="text-orange-500 text-lg" />
                                                <span>{fac.capacity} players</span>
                                            </div>
                                        </div>

                                        {/* Available Slots Preview */}
                                        <div className="mt-4">
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Available Slots:</span>
                                            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                                                {fac.available_slots && fac.available_slots.length > 0 ? (
                                                    fac.available_slots.map((s, idx) => (
                                                        <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-1 rounded-md">
                                                            {s}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-400">None defined</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3 mt-6">
                                        <button 
                                            onClick={() => handleStartEdit(fac)}
                                            className="flex items-center justify-center gap-1.5 border border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3 rounded-xl transition duration-200 cursor-pointer text-xs uppercase"
                                        >
                                            <MdEdit className="text-base" /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(fac._id, fac.name)}
                                            className="flex items-center justify-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition duration-200 cursor-pointer text-xs uppercase"
                                        >
                                            <MdDelete className="text-base" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* EDITING OVERLAY MODAL */}
                {editingFacility && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100 animate-in fade-in zoom-in duration-200">
                            
                            {/* Modal Header */}
                            <div className="bg-[#071B34] text-white p-6 flex justify-between items-center sticky top-0 z-10">
                                <div>
                                    <h3 className="text-xl font-bold">Edit Facility Details</h3>
                                    <p className="text-xs text-gray-300 mt-1">{editingFacility.name}</p>
                                </div>
                                <button 
                                    onClick={() => setEditingFacility(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition cursor-pointer"
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>

                            {/* Modal Form */}
                            <form onSubmit={handleUpdate} className="p-6 md:p-8 space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Facility Name</label>
                                    <input 
                                        type="text" 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-xl p-3.5 text-black"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Type</label>
                                        <select 
                                            value={editType}
                                            onChange={(e) => setEditType(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-xl p-3.5 text-black bg-white cursor-pointer"
                                        >
                                            <option value="Football Turf">Football Turf</option>
                                            <option value="Badminton Court">Badminton Court</option>
                                            <option value="Swimming Lane">Swimming Lane</option>
                                            <option value="Tennis Court">Tennis Court</option>
                                            <option value="Basketball Court">Basketball Court</option>
                                            <option value="Cricket Net">Cricket Net</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Image URL</label>
                                        <input 
                                            type="url" 
                                            value={editImage}
                                            onChange={(e) => setEditImage(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-xl p-3.5 text-black"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Location</label>
                                    <input 
                                        type="text" 
                                        value={editLocation}
                                        onChange={(e) => setEditLocation(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-xl p-3.5 text-black"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Price Per Hour (৳)</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-xl p-3.5 text-black"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Capacity</label>
                                        <input 
                                            type="number" 
                                            min="1"
                                            value={editCapacity}
                                            onChange={(e) => setEditCapacity(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-xl p-3.5 text-black"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Available Slots Checkboxes */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Available Time Slots</label>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                        {timeSlots.map((slot) => (
                                            <label 
                                                key={slot}
                                                className={`flex items-center gap-2 p-2.5 rounded-lg border text-[11px] font-bold cursor-pointer transition ${
                                                    editSlots.includes(slot)
                                                        ? "bg-orange-500 border-orange-500 text-white"
                                                        : "bg-white border-gray-200 text-gray-700 hover:border-orange-100"
                                                }`}
                                            >
                                                <input 
                                                    type="checkbox"
                                                    checked={editSlots.includes(slot)}
                                                    onChange={() => handleSlotChange(slot)}
                                                    className="hidden"
                                                />
                                                {slot}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Description</label>
                                    <textarea 
                                        rows="3"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 focus:border-orange-500 outline-none rounded-xl p-3.5 text-black resize-none"
                                        required
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 justify-end pt-4 border-t border-gray-100">
                                    <button 
                                        type="button" 
                                        onClick={() => setEditingFacility(null)}
                                        className="border border-gray-300 hover:bg-gray-50 font-bold px-5 py-3 rounded-xl transition cursor-pointer text-xs uppercase"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={isUpdating}
                                        className={`bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition cursor-pointer text-xs uppercase shadow-md shadow-orange-500/10 ${isUpdating ? 'opacity-50' : ''}`}
                                    >
                                        {isUpdating ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
