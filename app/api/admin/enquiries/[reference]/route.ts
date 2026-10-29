import { NextResponse } from "next/server";
import { updateEnquiryStatus, type Enquiry } from "@/lib/enquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ reference: string }> }) {
  // Development operations only. Production remains closed until a real auth
  // provider and server-side authorization policy are integrated.
  if (process.env.NODE_ENV === "production") return NextResponse.json({ error: "Operations access is not configured." }, { status: 404 });
  const { reference } = await params;
  let status: Enquiry["status"];
  try {
    const body = await request.json() as { status?: unknown };
    if (body.status !== "received" && body.status !== "qualifying" && body.status !== "closed") {
      return NextResponse.json({ error: "Choose a supported enquiry status." }, { status: 400 });
    }
    status = body.status;
  } catch {
    return NextResponse.json({ error: "The status change could not be read." }, { status: 400 });
  }
  try {
    if (!updateEnquiryStatus(reference, status)) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
    return NextResponse.json({ reference, status });
  } catch {
    return NextResponse.json({ error: "The change could not be saved." }, { status: 503 });
  }
}
