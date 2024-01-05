export async function POST(req) {
  const data = await req.json();

  return Response.json(data);
}
