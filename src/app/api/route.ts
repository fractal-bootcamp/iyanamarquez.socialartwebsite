const middleware = (fn: Function) => (req: Request, res: Response) => {
  console.log("I AM MIDDLEWARE");

  return fn(req, res);
};

export const GET = middleware(async (req, res) => {
  return Response.json({ data: "hEY I'm a thing!" });
});

export const POST = middleware(() => {
  return Response.json({ data: "hEY I'm a post!" });
});
