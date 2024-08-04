import { Outlet /* useLocation */ } from "react-router-dom";
// import { pathKeys } from "@/shared/lib/react-router";
import { BrandLink, SignInLink, SignUpLink } from "./layout.ui";
// import {
//   // Footer,
//   BrandLink,
//   HomeLink,
//   SignInLink,
//   SignUpLink,
// } from './layout.ui'

export function GuestLayout() {
  // const location = useLocation();
  return (
    <>
      <div className="flex min-h-screen">
        {/* <Sidebar /> */}
        <div className="w-full">
          {/* {!location.pathname.startsWith(pathKeys.login()) &&
            !location.pathname.startsWith(pathKeys.register()) && <Navbar />} */}
          <GuestNavbar />
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

function GuestNavbar() {
  return (
    <header className="flex w-full flex-row items-center gap-6 border-b px-4 py-4 dark:bg-black">
      <div className="flex w-full flex-row justify-between">
        <h1 className="flex items-center gap-2 font-bold">
          <BrandLink />
        </h1>
        <nav aria-label="Guest Navigation">
          <ul className="flex flex-row space-x-4">
            <li>
              <SignInLink />
            </li>
            <li>
              <SignUpLink />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
