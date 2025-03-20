import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  console.log("Callback URL:", requestUrl.toString());
  console.log("All search params:", Object.fromEntries(requestUrl.searchParams));
  console.log("Code:", code);

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const adminClient = createAdminClient();
    console.log("Starting email verification process...");

    // Exchange the code for a session
    const {
      data: { user },
      error: sessionError,
    } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError) {
      console.error("Session error:", sessionError);
      return NextResponse.redirect(new URL("/auth/error", requestUrl.origin));
    }

    console.log("Session created successfully, user:", user?.id);

    if (user) {
      // Get the user's metadata (first_name and last_name from signup)
      const {
        data: { user: userData },
        error: getUserError,
      } = await supabase.auth.getUser();

      if (getUserError) {
        console.error("Error getting user data:", getUserError);
        return NextResponse.redirect(new URL("/auth/error", requestUrl.origin));
      }

      console.log("User metadata:", userData?.user_metadata);
      const metadata = userData?.user_metadata;

      // Check if user profile already exists
      const { data: existingProfile, error: checkError } = await adminClient
        .from("users")
        .select()
        .eq("id", user.id)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        console.error("Error checking existing profile:", checkError);
        return NextResponse.redirect(new URL("/auth/error", requestUrl.origin));
      }

      if (existingProfile) {
        console.log("User profile already exists, skipping creation");
      } else {
        console.log("Creating new user profile...");
        // Create the user profile in the users table using admin client
        const { data: newProfile, error: profileError } = await adminClient
          .from("users")
          .insert({
            id: user.id,
            first_name: metadata?.first_name || "",
            last_name: metadata?.last_name || "",
          })
          .select()
          .single();

        if (profileError) {
          console.error("Profile creation error:", profileError);
          return NextResponse.redirect(
            new URL("/auth/error", requestUrl.origin)
          );
        }

        console.log("User profile created successfully:", newProfile);
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}
