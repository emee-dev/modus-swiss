export const dynamic = "force-dynamic";

export type Params = {};

export const POST = async (req: Request) => {
  try {
    const params = (await req.json()) as Params;

    return Response.json({
      message: "Creating room please, check your email.",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal server error.", data: null });
  }
};
