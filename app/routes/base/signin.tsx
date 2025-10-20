import { type LoaderFunctionArgs, redirect } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
  return redirect("/", { headers: request.headers });
}
