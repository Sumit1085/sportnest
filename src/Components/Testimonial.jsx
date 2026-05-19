import { Star } from 'lucide-react';
import React from 'react';

const Testimonial = () => {
    const reviews = [
        {
            name: "Marcus Jordan",
            role: "Futsal Enthusiast",
            initials: "MJ",
            review:
                "Booking a turf used to take forever on WhatsApp. Now I just find a slot and book it in seconds. The facilities are always top notch!",
        },
        {
            name: "Sarah Chen",
            role: "Tennis Coach",
            initials: "SC",
            review:
                "As a coach, reliability is everything. CourtCommander has never let me down. The payment system is seamless and very secure.",
        },
        {
            name: "David Wilson",
            role: "Weekend Warrior",
            initials: "DW",
            review:
                "Found some hidden gems in my neighborhood that I didn't even know existed. Great interface and very fast support.",
        },
    ];

    return (
        <div>
            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-[#071B34] mb-14">
                        Word from the Court
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
                            >
                                {/* Stars */}
                                <div className="flex gap-1 text-orange-500 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>

                                {/* Review */}
                                <p className="text-gray-600 text-sm leading-7 mb-6">
                                    {review.review}
                                </p>

                                {/* User */}
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                                        {review.initials}
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-sm text-[#071B34]">
                                            {review.name}
                                        </h4>

                                        <p className="text-xs text-gray-500">
                                            {review.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Testimonial;