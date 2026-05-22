import Image from "next/image";

export default function FacilityBanner({ facility }) {
    return (
        <section className="relative h-[300px] md:h-[450px] w-full mb-12 overflow-hidden rounded-2xl shadow-lg">
            <Image 
                src={facility.thumbnail || "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop"} 
                alt={facility.name} 
                fill 
                className="object-cover" 
                priority
            />
            {/* Dark gradient overlay for premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 text-white z-10">
                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
                    {facility.type || "Sports Arena"}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-md">
                    {facility.name}
                </h1>
            </div>
        </section>
    );
}