import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { processPaymentEvent, verifyDodoWebhook } from "@/lib/webhook";

export async function POST(request: Request) {
  try {
    const raw = await request.text();
    await verifyDodoWebhook(raw, request.headers);
    const id = request.headers.get("webhook-id") ?? "unknown";
    await processPaymentEvent(JSON.parse(raw), id);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Dodo webhook rejected/failed", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Invalid webhook" }, { status: 401 });
  }
}
