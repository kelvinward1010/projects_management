import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});

export const config = {
    matcher: [
        "/home/:path*",
        "/board/:path*",
        "/projects/:path*",
        "/issues/:path*",
    ]
};