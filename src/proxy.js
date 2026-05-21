import { NextResponse } from 'next/server'
 // path to your Better Auth server instance
import { headers } from "next/headers";
import { auth } from './lib/auth';
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
     if(!session){
       return NextResponse.redirect(new URL('/login', request.url))
     }
     return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
    matcher: ['/all-facilities/:path+', '/my-bookings', '/manage-facilities']}