import Image from "next/image";
import coverImg from '../../public/Container.png'
import Header from "@/Components/Header";
import FacilityFeatureCard from "@/Components/FacilityFeatureCard";
import Testimonial from "@/Components/Testimonial";
import ChooseUs from "@/Components/ChooseUs";

export default function Home() {
  return (
    <>
      <main className="min-h-screen  text-white">
       

        

        {/* Hero Section */}
        <section className="relative h-[90vh] w-full overflow-hidden">
          {/* Background Image */}
          <Image
            src={coverImg}
            alt="court"
            fill
            className="object-cover"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-5">
              Elevate Your Game
            </h1>

            <p className="max-w-xl text-gray-200 text-sm md:text-base mb-10">
              Find and book the best football turfs, badminton courts, and
              swimming pools near you
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-5">
              <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-3 rounded-md font-semibold">
                Explore Facilities
              </button>

              <button className="border border-white hover:bg-white hover:text-black transition px-8 py-3 rounded-md font-semibold">
                List Your Court
              </button>
            </div>
          </div>
        </section>

        <section className="px-6 py-12 bg-gray-50">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Top Rated Arenas
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Hand-picked premium facilities for professional play.
              </p>
            </div>

            <button className="text-sm font-semibold text-orange-600 hover:underline">
              View All →
            </button>
          </div>

         
          <div ><FacilityFeatureCard/></div>
          <div ><ChooseUs/></div>
          <div ><Testimonial/></div>
        </section>
      </main>
    </>
  );
}
