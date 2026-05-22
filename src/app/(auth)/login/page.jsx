// app/login/page.jsx
 "use client"
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import {
  MdMail,
  MdLock,
  MdLogin,
  MdSportsBasketball,
} from "react-icons/md";

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get("callback") || "/"

  const handleLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const loginData = Object.fromEntries(formData.entries())
    const { Email, Password } = loginData

    if (!Email || !Password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const { data, error } = await authClient.signIn.email({
        email: Email,
        password: Password,
        callbackURL: callback,
      })

      if (error) {
        toast.error(error.message || 'Login Failed. Check your email or password.')
        return
      }

      toast.success('Logged in successfully!')
      router.push(callback)
    } catch (err) {
      console.error(err)
      toast.error('An unexpected error occurred during login')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: callback
      })
    } catch (err) {
      console.error(err)
      toast.error('Google sign in failed')
    }
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#0b1426] text-white overflow-hidden">

      {/* LEFT SIDE */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative border-r border-white/10">

        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop"
          alt="Basketball"
          fill
          className="object-cover opacity-40"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 max-w-xl">
          <h1 className="text-5xl font-extrabold text-orange-500 mb-4">
            SportNest
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-12">
            Master your game with the ultimate sports management
            platform. Precision meets performance.
          </p>

          {/* Feature */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center">
              <MdSportsBasketball className="text-2xl text-white" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Elite Courts</h3>
              <p className="text-sm text-gray-400">
                The best surfaces for the best players.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Shape */}
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rotate-45 bg-orange-500/10" />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-400">
              Sign in to continue your journey.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-6" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Email Address
              </label>

              <div className="relative">
                <MdMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                name="Email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-white/10 border border-white/10 focus:border-orange-500 outline-none rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-300">
                  Password
                </label>


              </div>

              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

                <input
                name="Password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/10 focus:border-orange-500 outline-none rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 transition-all duration-200 rounded-full py-4 font-semibold flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              Login
              <MdLogin className="text-xl" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-white/10" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-white/10 hover:bg-white/5 transition-all rounded-full py-4 font-medium flex items-center justify-center gap-3 cursor-pointer"
            >
              <FcGoogle className="text-2xl" />
              Login with Google
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-400 mt-8">
            Dont have an account?{" "}
            <Link
              href="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}