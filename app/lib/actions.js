"use server";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";
function isValid(value) {
  return value.trim() !== "";
}
export async function shareMeal(state, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isValid(meal.title) &&
    isValid(meal.summary) &&
    isValid(meal.instructions) &&
    isValid(meal.creator) &&
    isValid(meal.creator_email) &&
    meal.creator_email.includes("@") &&
    meal.image &&
    meal.image.size > 0
  ) {
    await saveMeal(meal);
    revalidatePath("/meals"); //Next.js removes the cached page. It fetches again.
    return redirect("/meals");
  } else {
    return {
      message: "Invalid input",
    };
  }
}
