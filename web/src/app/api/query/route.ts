import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  console.log(req);
  const store = cookies();
  const session = store.get("session")?.value;
  if (session == null) {
    return new NextResponse("", { status: 401 });
  }

  console.log(JSON.stringify({ session }, null, 4));
  const body = await req.json();
  console.log(JSON.stringify({ body }, null, 4));
  const headers = req.headers;
  console.log(JSON.stringify({ headers }, null, 4));

  return NextResponse.json({ data: { id: 1 } });
};
