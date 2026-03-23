import { data, redirect } from "react-router";
import type { Route } from "./+types/readingExperience";
import ReadingExperienceStep from "~/components/onboarding/setup/ReadingExperienceStep";
import { Types } from "mongoose";
import { requireUser } from "~/services/auth.server";
import User from "~/db/models/User";

function convertToObjectIds(ids: unknown): Types.ObjectId[] {
  if (!Array.isArray(ids)) {
    return [];
  }

  const result: Types.ObjectId[] = [];

  for (const id of ids) {
    if (typeof id === "string" && Types.ObjectId.isValid(id)) {
      result.push(new Types.ObjectId(id));
    }
  }

  return result;
}

export async function action({ request }: Route.ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const payload = formData.get("payload");

  if (typeof payload !== "string") {
    return data({ error: "Invalid data" }, { status: 400 });
  }

  let body: { genreIds: Types.ObjectId[]; authorIds: Types.ObjectId[] };
  try {
    body = JSON.parse(payload);
  } catch (error) {
    return data({ error: "Invalid data" }, { status: 400 });
  }

  await User.findByIdAndUpdate(user?._id, {
    $set: {
      favoriteGenres: convertToObjectIds(body.genreIds),
      favoriteAuthors: convertToObjectIds(body.authorIds),
      onboardingComplete: true,
    },
  }).lean();

  return redirect("/");
}

export default function ReadingExperienceRoute() {
  return <ReadingExperienceStep />;
}
