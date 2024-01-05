import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req) {
    if (auth.userId && auth.isPublicRoute) {
      let path = "/";

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/") {
      const orgSelection = new URL("/", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
