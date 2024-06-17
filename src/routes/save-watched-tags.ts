import { ActionFunctionArgs, redirect } from "react-router-dom";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const watchedTags = formData.get("watchedTags") as string;

  await fetch("/api/users/1/watchedTags", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(watchedTags ? watchedTags.split(" ") : []),
  });

  return redirect("/questions");
}
