import { getPersonsDB } from "@/db/persons";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ eventid: string }>;

export async function GET(req: NextRequest, segmentData: { params: Params }) {
  console.log(
    "### APP LOGGING ### => GET handler execution for persons/eventid api !"
  );
  const params = await segmentData.params;
  const eventid = params.eventid;

  const persons = await getPersonsDB(+eventid);

  console.log(
    "### APP LOGGING ### => Result of getPersonsDB -- from route handler :"
  );
  console.log(persons);

  return NextResponse.json(persons);
}
