import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/",
    },
});

export const config = {
    matcher: [
        "/home/:path*",
        "/projects/:path*",
        "/storys/:path*",
        "/internalproblems/:path*",
        "/tasks/:path*",
        "/manageddata/:path*",
    ]
};