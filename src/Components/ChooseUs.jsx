import {
    ShieldCheck,
    Zap,
    Lock,
} from "lucide-react";

const ChooseUs = () => {
    const features = [
        {
            icon: <ShieldCheck size={28} />,
            title: "Verified Facilities",
            desc: "Every court and turf on our platform is hand-inspected for quality and safety standards.",
        },
        {
            icon: <Zap size={28} />,
            title: "Easy Booking",
            desc: "Real-time availability and 3-click booking system designed for athletes on the move.",
        },
        {
            icon: <Lock size={28} />,
            title: "Secure Payments",
            desc: "Enterprise-grade encryption ensures your transactions and data are always protected.",
        },
    ];
    return (
        <div className="w-full">
            <section className="bg-[#071B34] text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
                        Why Choose Us
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {features.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="bg-orange-500 p-4 rounded-xl mb-5 shadow-lg">
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-semibold mb-3">
                                    {item.title}
                                </h3>

                                <p className="text-gray-300 text-sm leading-7 max-w-xs">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChooseUs;