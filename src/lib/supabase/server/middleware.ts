import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";

import { checkAuth } from "./auth";

export async function updateSession(request: NextRequest) {
  console.log("Middleware processing request:", {
    path: request.nextUrl.pathname,
    method: request.method,
    hasCookies: request.cookies.getAll().length > 0,
    cookies: request.cookies.getAll().map((c) => c.name),
  });

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = request.cookies.get(name);
          console.log(
            `Getting cookie ${name}:`,
            cookie?.value ? "exists" : "not found"
          );
          return cookie?.value;
        },
        set(name: string, value: string, options: any) {
          console.log(`Setting cookie ${name}`);
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          console.log(`Removing cookie ${name}`);
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Refresh the session if it exists
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const {
      data: { session: refreshedSession },
    } = await supabase.auth.refreshSession();
    console.log("Session refreshed:", !!refreshedSession);
  }

  const isAuthenticated = await checkAuth(supabase);
  console.log("Auth check result:", { isAuthenticated });

  const url = request.nextUrl.clone();

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    console.log("Checking dashboard access...");
    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting to login");
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
    console.log("Authenticated, allowing dashboard access");
  }

  return response;
}
