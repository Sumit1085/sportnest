// app/register/page.jsx

import Image from "next/image";
import Link from "next/link";
import {
  MdPerson,
  MdMail,
  MdImage,
  MdLock,
  MdArrowForward,
  MdSportsTennis,
  MdBolt,
  MdInfo,
} from "react-icons/md";

import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#f8f9ff] text-[#0b1c30]">

      {/* LEFT SIDE */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative overflow-hidden bg-[#0b1c30]">

        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1400&auto=format&fit=crop"
          alt="Basketball Court"
          fill
          className="object-cover opacity-40"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white max-w-xl">

          <h1 className="text-5xl font-extrabold mb-4">
            SportNest
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-12">
            Experience the precision of elite sports management.
            Your journey to peak performance starts with a single tap.
          </p>

          <div className="space-y-6">

            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
                <MdSportsTennis className="text-2xl text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Global Access
                </h3>

                <p className="text-sm text-gray-400">
                  Over 500 premium facilities worldwide.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
                <MdBolt className="text-2xl text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Instant Booking
                </h3>

                <p className="text-sm text-gray-400">
                  Zero friction, from search to court.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Shape */}
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rotate-45 bg-orange-500/20" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-2">
              Join the Community
            </h2>

            <p className="text-gray-500">
              Create your account to start booking.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>

              <div className="relative">
                <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Email
              </label>

              <div className="relative">
                <MdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 transition-all"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Photo URL
              </label>

              <div className="relative">
                <MdImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none rounded-2xl py-4 pl-12 pr-4 transition-all"
                />
              </div>

              {/* Password Info */}
              <div className="flex items-start gap-2 mt-2">
                <MdInfo className="text-gray-400 text-lg mt-[2px]" />

                <p className="text-sm text-gray-500 italic">
                  6+ characters, 1 uppercase, 1 lowercase.
                </p>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              Register
              <MdArrowForward className="text-xl" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-gray-200" />

              <span className="text-sm text-gray-400">
                OR
              </span>

              <div className="flex-1 h-[1px] bg-gray-200" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full border-2 border-black hover:bg-gray-100 transition-all rounded-full py-4 font-medium flex items-center justify-center gap-3"
            >
              <FcGoogle className="text-2xl" />
              Google Sign Up
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-orange-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}