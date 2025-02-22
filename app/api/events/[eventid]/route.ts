import { getEventDB } from "@/db/events";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ eventid: string }>;

export async function GET(req: NextRequest, segmentData: { params: Params }) {
  console.log(
    "### APP LOGGING ### => GET handler execution for event/eventid api !"
  );
  const params = await segmentData.params;
  const eventid = params.eventid;

  const event = await getEventDB(+eventid);

  console.log(
    "### APP LOGGING ### => Result of getEventDB -- from route handler :"
  );
  console.log(event);

  return NextResponse.json(event);
}
