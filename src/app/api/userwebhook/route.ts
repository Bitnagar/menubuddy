import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import supabase from "@/utils/supabase";

// function extractNameFromEmail(firstname: string, email: string): string {
//   if (firstname === null) {
//     return email.slice(0, email.indexOf("@"));
//   } else {
//     return firstname;
//   }
// }

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  //   if (eventType === "user.created") {
  //     const { email_address } = evt.data.email_addresses[0];
  //     const { id, first_name, last_name, profile_image_url } = evt.data;
  //     console.log(id);

  //     const { data, error } = await supabase
  //       .from("user")
  //       .insert([
  //         {
  //           clerk_id: id,
  //           firstname: extractNameFromEmail(first_name, email_address),
  //           lastname: last_name,
  //           email: email_address,
  //           profile_image_url: profile_image_url,
  //           rate_limit: 5,
  //           hasOnBoarded: false,
  //         },
  //       ])
  //       .select();

  //     if (data === null && error !== null) {
  //       return NextResponse.json({ message: error.hint }, { status: 500 });
  //     }
  //   }

  //   if (eventType === "user.updated") {
  //     const { email_address } = evt.data.email_addresses[0];
  //     const { id, first_name, last_name, profile_image_url } = evt.data;
  //     const { data, error } = await supabase
  //       .from("user")
  //       .update({
  //         firstname: extractNameFromEmail(first_name, email_address),
  //         lastname: last_name,
  //         email: email_address,
  //         profile_image_url: profile_image_url,
  //         updated_at: `${new Date().toLocaleString()}`,
  //       })
  //       .eq("clerk_id", id)
  //       .select();

  //     if (data === null && error !== null) {
  //       return NextResponse.json(
  //         {
  //           message: error.hint
  //             ? error.hint
  //             : "Error occured in updating user. Check user details.",
  //         },
  //         { status: 500 }
  //       );
  //     }
  //   }

  if (eventType === "user.deleted") {
    const { id } = evt.data;
    await supabase.from("user").delete().eq("clerk_id", id);
    return NextResponse.json({ message: "User deleted." }, { status: 200 });
  }

  return NextResponse.json({ message: "Unknown Event type." }, { status: 500 });
}
