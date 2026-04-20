import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    
    // Safety check just in case matcher fails
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const isAdmin = token?.role === "admin";
    const isEditor = token?.role === "editor";

    // If not admin/editor, redirect to login
    if (!isAdmin && !isEditor) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        
        // Exclude login page from protection
        if (pathname === "/admin/login") {
          return true;
        }

        // Must have a token to access any other /admin path
        return !!token;
      },
    },
  }
);

export const config = {
  // Protect all /admin routes except /admin/login
  // This matcher uses a negative lookahead to exclude 'login'
  matcher: ["/admin/((?!login).*)"],
};
