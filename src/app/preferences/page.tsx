import { currentUser } from "@clerk/nextjs";
import PreferencesForm from "@/components/form/PreferencesForm";

export default async function Page() {
  const user = await currentUser();
  let firstName = user?.firstName;
  if (!firstName) {
    const email = user?.emailAddresses[0].emailAddress;
    const fullnameFromEmail = user?.emailAddresses[0].emailAddress.slice(
      0,
      email?.indexOf("@")
    );
    return <PreferencesForm firstname={fullnameFromEmail} />;
  } else {
    return <PreferencesForm firstname={firstName} />;
  }
}
