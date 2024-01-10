// export default function Page() {
//   /*
//     fetch data in server component about `hasOnBoarded`.
//     if (hasOnBoarded) {
//       show <UploadPhoto />
//     } else show Preferences

//     when user has saved all preferences, save them in database.
//     then for every sign out
//   */
//   return (
//     <div>
//       {hasOnBoarded && <UploadPhoto />}
//       {hasOnBoarded === false && <Preferences />}
//     </div>
//   );
// }
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return <div>Page</div>;
}
