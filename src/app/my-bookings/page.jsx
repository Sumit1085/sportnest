'use client';

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@heroui/react";
import {
    MdBook,
    MdCalendarToday,
    MdAccessTime,
    MdCancel,
    MdHourglassEmpty,
    MdCheckCircle,
    MdRemoveCircle
} from "react-icons/md";

export default function MyBookingsPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const router = useRouter();

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Redirect if not logged in
    useEffect(() => {
        if (!isPending && !user) {
            toast.error("Please login to access this page.");
            router.push("/login?callback=/my-bookings");
        }
    }, [user, isPending, router]);

    // Fetch bookings
    useEffect(() => {
        if (!user) return;

        const loadBookings = async () => {
            try {
                setIsLoading(true);

                const apiUrl =
                    process.env.NEXT_PUBLIC_API_URL ||
                    "http://localhost:8000";

                const res = await fetch(
                    `${apiUrl}/booking?email=${user.email}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch bookings");
                }

                const data = await res.json();

                // Sort latest first
                data.sort(
                    (a, b) =>
                        new Date(b.createdAt || 0) -
                        new Date(a.createdAt || 0)
                );

                setBookings(data);
            } catch (error) {
                console.error("Fetch bookings error:", error);
                toast.error("Failed to load your bookings");
            } finally {
                setIsLoading(false);
            }
        };

        loadBookings();
    }, [user]);

    if (isPending || (user && isLoading)) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-[#F4F4F7]">
                <Spinner size="lg" color="warning" />
                <p className="text-gray-500 font-medium animate-pulse">
                    Loading bookings...
                </p>
            </div>
        );
    }

    if (!user) return null;

    const handleCancelBooking = async (id, facilityName) => {
        const confirmed = window.confirm(
            `⚠️ Cancel Booking ⚠️\n\nAre you sure you want to cancel your booking for "${facilityName}"?\n\nThis will update your booking status to cancelled.`
        );

        if (!confirmed) return;

        try {
            const apiUrl =
                process.env.NEXT_PUBLIC_API_URL ||
                "http://localhost:8000";

            const res = await fetch(
                `${apiUrl}/booking/${id}/cancel`,
                {
                    method: "PATCH",
                }
            );

            if (!res.ok) {
                throw new Error("Failed to cancel booking");
            }

            toast.success("Booking cancelled successfully!");

            // Update UI instantly without re-fetching
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === id
                        ? { ...booking, status: "cancelled" }
                        : booking
                )
            );
        } catch (error) {
            console.error("Cancel booking error:", error);
            toast.error("Failed to cancel booking. Please try again.");
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-700 border-green-200";

            case "cancelled":
                return "bg-red-100 text-red-700 border-red-200";

            case "pending":
            default:
                return "bg-amber-100 text-amber-700 border-amber-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "confirmed":
                return <MdCheckCircle className="text-lg" />;

            case "cancelled":
                return <MdRemoveCircle className="text-lg" />;

            case "pending":
            default:
                return (
                    <MdHourglassEmpty className="text-lg animate-spin-slow" />
                );
        }
    };

    return (
        <main className="min-h-screen bg-[#F4F4F7] py-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-black text-[#071B34] flex items-center justify-center md:justify-start gap-3">
                        <MdBook className="text-orange-500" />
                        My Bookings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View, track, or cancel reservations for sports facilities you booked.
                    </p>
                </div>

                {/* Empty State */}
                {bookings.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
                        <MdHourglassEmpty className="text-5xl text-orange-400 mx-auto mb-4" />

                        <h3 className="text-xl font-bold text-gray-800">
                            No Bookings Found
                        </h3>

                        <p className="text-gray-500 mt-2 mb-6">
                            You havent booked any arenas yet. Explore facilities to find one!
                        </p>

                        <button
                            onClick={() => router.push("/all-facilities")}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3.5 rounded-xl cursor-pointer"
                        >
                            Browse Facilities
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition duration-200"
                            >

                                {/* Info Section */}
                                <div className="space-y-3 grow">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="font-extrabold text-xl text-[#071B34]">
                                            {booking.facility_name}
                                        </h3>

                                        {/* Status Badge */}
                                        <span
                                            className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${getStatusStyle(
                                                booking.status
                                            )}`}
                                        >
                                            {getStatusIcon(booking.status)}

                                            <span className="capitalize">
                                                {booking.status}
                                            </span>
                                        </span>
                                    </div>

                                    {/* Booking Details */}
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">

                                        <div className="flex items-center gap-1.5">
                                            <MdCalendarToday className="text-orange-500" />

                                            <span>
                                                Date:{" "}
                                                <span className="font-semibold text-gray-700">
                                                    {booking.booking_date}
                                                </span>
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <MdAccessTime className="text-orange-500" />

                                            <span>
                                                Time:{" "}
                                                <span className="font-semibold text-gray-700">
                                                    {booking.time_slot}
                                                </span>
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5">
                                            <MdHourglassEmpty className="text-orange-500" />

                                            <span>
                                                Duration:{" "}
                                                <span className="font-semibold text-gray-700">
                                                    {booking.hours} hr(s)
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Price & Actions */}
                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">

                                    <div className="text-left md:text-right">
                                        <span className="text-xs text-gray-400 font-semibold block uppercase">
                                            Total Amount
                                        </span>

                                        <span className="text-2xl font-black text-orange-500">
                                            ৳{booking.total_price}
                                        </span>
                                    </div>

                                    {/* Cancel Button */}
                                    {booking.status === "pending" && (
                                        <button
                                            onClick={() =>
                                                handleCancelBooking(
                                                    booking._id,
                                                    booking.facility_name
                                                )
                                            }
                                            className="flex items-center justify-center gap-1.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 font-bold px-4 py-3 rounded-xl transition duration-200 cursor-pointer text-xs uppercase"
                                        >
                                            <MdCancel className="text-base" />
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}