import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    
    // Safety check: always allow login page and static assets
    if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const isAdmin = token?.role === "admin";
    const isEditor = token?.role === "editor";

    // If token exists but has no valid role, redirect to login
    if (!isAdmin && !isEditor) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    secret: process.env.NEXTAUTH_SECRET || "af7be50ac932cd471c79adf464e7dbbf",
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Exclude login page from protection
        if (pathname.startsWith("/admin/login") || pathname.startsWith("/api/auth")) {
          return true;
        }

        // Must have a token to access any other /admin path
        return !!token;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  // Protect all /admin routes except /admin/login
  matcher: ["/admin/((?!login).*)"],
};
