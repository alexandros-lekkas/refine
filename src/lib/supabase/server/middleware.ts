import { NextResponse, type NextRequest } from "next/server";

import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

import { checkAllRoles, checkAuth, checkRole } from "./auth";

async function protectPath(
  supabase: SupabaseClient,
  roles: string[],
  allRequired: boolean = false,
  unauthorizedPath: string = "/unauthorized"
) {
  let authorized = false;

  if (allRequired) {
    authorized = await checkAllRoles(supabase, roles);
  } else {
    authorized = await checkRole(supabase, roles);
  }

  if (!authorized) {
    return unauthorizedPath;
  }

  return null;
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const isAuthenticated = await checkAuth(supabase);
  const url = request.nextUrl.clone();

  const protectedPaths = ["/admin", "/user"];

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    if (!isAuthenticated) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }

    let pathname: string | null = "";

    if (request.nextUrl.pathname.startsWith("/admin/shipping")) {
      pathname = await protectPath(
        supabase,
        ["admin", "shipping_admin"],
        true,
        "/auth/forbidden"
      );
    } else if (request.nextUrl.pathname.startsWith("/admin/users")) {
      pathname = await protectPath(
        supabase,
        ["admin", "users_admin"],
        true,
        "/auth/forbidden"
      );
    } else if (request.nextUrl.pathname.startsWith("/admin")) {
      pathname = await protectPath(
        supabase,
        ["admin"],
        false,
        "/auth/forbidden"
      );
    }

    if (pathname) {
      url.pathname = pathname;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
