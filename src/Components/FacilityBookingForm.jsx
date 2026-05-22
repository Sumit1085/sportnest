'use client';
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function FacilityBookingForm({ facility }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();
    const [bookingDate, setBookingDate] = useState("");
    const [timeSlot, setTimeSlot] = useState(facility.available_slots?.[0] || "");
    const [hours, setHours] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const pricePerHour = parseFloat(facility.price_per_hour || 0);
    const subtotal = pricePerHour * hours;
    const serviceFee = subtotal * 0.1; // 10% booking service fee
    const total = subtotal + serviceFee;
    const handleConfirmBooking = async (e) => {
        e.preventDefault();
        // 1. Authenticate check
        if (!user) {
            toast.error("Please login to book a facility!");
            router.push(`/login?callback=/all-facilities/${facility._id}`);
            return;
        }
        // 2. Form validation
        if (!bookingDate) {
            toast.error("Please select a booking date!");
            return;
        }
        if (!timeSlot) {
            toast.error("Please select a time slot!");
            return;
        }
        if (hours <= 0) {
            toast.error("Hours must be greater than 0!");
            return;
        }
        try {
            setIsSubmitting(true);
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
            
            const response = await fetch(`${apiUrl}/booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    facility_id: facility._id,
                    facility_name: facility.name,
                    booking_date: bookingDate,
                    time_slot: timeSlot,
                    hours: parseInt(hours),
                    total_price: parseFloat(total.toFixed(2)),
                    user_email: user.email,
                    user_name: user.name
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to create booking");
            }
            const result = await response.json();
            toast.success("Booking placed successfully! Redirecting...");
            
            // Redirect to My Bookings page
            router.push("/my-bookings");
        } catch (error) {
            console.error("Booking Error:", error);
            toast.error("Booking failed! Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            {/* HEADER */}
            <div className="bg-[#071B34] text-white p-6">
                <div className="text-sm text-gray-300">Starts from</div>
                <div className="text-3xl font-bold text-orange-500">
                    ৳{pricePerHour} / hr
                </div>
                <div className="text-sm mt-2 text-gray-200">
                    👥 Capacity: <span className="font-semibold text-white">{facility.capacity || 0} players</span>
                </div>
            </div>
            {/* FORM */}
            <form className="p-6 space-y-4" onSubmit={handleConfirmBooking}>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Select Date
                    </label>
                    <input 
                        type="date" 
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full border border-gray-200 p-3 rounded-lg text-black focus:border-orange-500 outline-none" 
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Time Slot
                        </label>
                        <select 
                            value={timeSlot}
                            onChange={(e) => setTimeSlot(e.target.value)}
                            className="w-full border border-gray-200 p-3 rounded-lg text-black focus:border-orange-500 outline-none bg-white"
                        >
                            {facility.available_slots && facility.available_slots.length > 0 ? (
                                facility.available_slots.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))
                            ) : (
                                <option value="">No Slots</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Hours
                        </label>
                        <input 
                            type="number" 
                            min="1" 
                            max="24"
                            required
                            value={hours}
                            onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full border border-gray-200 p-3 rounded-lg text-black focus:border-orange-500 outline-none" 
                        />
                    </div>
                </div>
                {/* Price Breakdown */}
                <div className="border-t border-gray-100 pt-4 text-sm space-y-2 text-gray-600">
                    <div className="flex justify-between">
                        <span>৳{pricePerHour} × {hours} hours</span>
                        <span className="font-medium text-black">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>10% Service Fee</span>
                        <span className="font-medium text-black">৳{serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-dashed border-gray-100 pt-2 text-[#071B34]">
                        <span>Total Price</span>
                        <span className="text-orange-600">৳{total.toFixed(2)}</span>
                    </div>
                </div>
                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition duration-200 shadow-md shadow-orange-500/20 active:scale-98 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                </button>
                <p className="text-center text-xs text-gray-400">
                    Secure checkout. Status is pending until confirmation.
                </p>
            </form>
        </div>
    );
}
