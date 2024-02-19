import { currentUser } from "@clerk/nextjs";
import PreferencesForm from "@/components/form/PreferencesForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();
  if (!user) redirect("/");

  const email = user.emailAddresses[0].emailAddress;
  let firstName = user.firstName
    ? user.firstName
    : email.slice(0, email.indexOf("@"));
  return <PreferencesForm firstname={firstName} />;
}
