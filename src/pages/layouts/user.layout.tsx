import { withErrorBoundary } from "react-error-boundary";
import { NavLink, Outlet } from "react-router-dom";
import { compose, withSuspense } from "@/shared/lib/react";
import { pathKeys } from "@/shared/lib/react-router";
import { useSessionStore, PermissionService } from "@/shared/session";
import { Button } from "@/shared/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { ErrorHandler, logError } from "@/shared/ui/error-handler";
import { ProfileLink } from "./layout.ui";

const enhance = compose(
  (component) =>
    withErrorBoundary(component, {
      FallbackComponent: ErrorHandler,
      onError: logError,
    }),
  (component) =>
    withSuspense(component, { FallbackComponent: UserNavigationSkeleton }),
);

export function UserLayout() {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <div className="w-full">
        <UserNavbar />
        <Outlet />
      </div>
    </div>
  );
}

const UserNavbar = enhance(() => {
  const session = useSessionStore.use.session();

  const canUpdateProfile = PermissionService.useCanPerformAction(
    "update",
    "profile",
    { profileOwnerId: session?.username || "" },
  );

  return (
    <header className="flex w-full flex-row items-center gap-6 border-b px-4 py-4 dark:bg-black">
      <div className="flex w-full flex-row justify-between">
        <h1 className="flex items-center gap-2 font-bold">
          <NavLink to={pathKeys.home()}>React FSD</NavLink>
        </h1>
        <nav aria-label="User Navigation">
          <ul className="flex flex-row space-x-4">
            {canUpdateProfile && (
              <li>
                <ProfileLink />
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
});

// function Sidebar() {
//   return (
//     <nav className="flex h-screen flex-col items-center justify-between gap-10 overflow-scroll px-2 py-6 dark:bg-black">
//       <div className="flex flex-col items-center justify-center gap-8">
//         <NavLink
//           className="flex flex-row font-bold"
//           to={pathKeys.home()}
//         >
//           TEST
//         </NavLink>
//       </div>
//     </nav>
//   );
// }

function UserNavigationSkeleton() {
  return (
    <nav className="flex w-full flex-row items-center gap-6 border-b px-4 py-4 dark:bg-black">
      <div className="flex w-full flex-row justify-between">
        <h1 className="flex items-center gap-2 font-bold">
          <NavLink to={pathKeys.home()}>React FSD</NavLink>
        </h1>
        <ul className="flex flex-row space-x-4">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger
                disabled
                asChild
              >
                <Button variant="outline">...</Button>
              </DropdownMenuTrigger>
            </DropdownMenu>
          </li>
        </ul>
      </div>
    </nav>
  );
}
