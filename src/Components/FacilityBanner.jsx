
import Image from "next/image";

export default function FacilityBanner({ images, status }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[400px] md:h-[600px] mb-12 overflow-hidden rounded-xl">
            
            {/* MAIN IMAGE */}
            <div className="">
                <Image src={images} alt="facility" fill className="object-cover" />

                <span className="absolute top-6 left-6 bg-green-600 text-white px-4 py-1 rounded-full text-sm">
                    {status}
                </span>
            </div>

            {/* SIDE IMAGES */}
            
        </section>
    );
}