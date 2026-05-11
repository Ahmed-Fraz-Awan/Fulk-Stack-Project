export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analytics/:path*",
    "/planner/:path*",
    "/twin/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/chat/:path*",
    "/mood/:path*",
  ],
};
