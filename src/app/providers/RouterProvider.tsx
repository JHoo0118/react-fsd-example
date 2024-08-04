import { createElement, lazy } from "react";
import {
  Outlet,
  // NavLink,
  // Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  // redirect,
  // useRouteError,
} from "react-router-dom";
import { compose, withSuspense } from "@/shared/lib/react";
import { pathKeys } from "@/shared/lib/react-router";
import { FullPageLoading } from "@/shared/ui/loading";
import { homePageRoute } from "@/pages/home";
import { loginPageRoute } from "@/pages/login";
import { page404Route } from "@/pages/page-404";
import { registerPageRoute } from "@/pages/register";
// import { articlePageRoute } from '@/pages/article'
// import { editorPageRoute } from '@/pages/editor'
// import { homePageRoute } from '@/pages/home'
// import { loginPageRoute } from '@/pages/login'
// import { page404Route } from '@/pages/page-404'
// import { profilePageRoute } from '@/pages/profile'
// import { registerPageRoute } from '@/pages/register'
// import { settingsPageRoute } from '@/pages/settings'
// import { compose, withSuspense } from '@/shared/lib/react'
// import { pathKeys } from '@/shared/lib/react-router'
// import { Skeleton } from '@/shared/ui/skeleton'
// import { Spinner } from '@/shared/ui/spinner'
// import { Stack } from '@/shared/ui/stack'

export function BrowserRouter() {
  return <RouterProvider router={browserRouter} />;
}

const enhance = compose((component) =>
  withSuspense(component, { FallbackComponent: LayoutSkeleton }),
);

const GenericLayout = lazy(() =>
  import("@/pages/layouts").then((module) => ({
    default: module.GenericLayout,
  })),
);

const GuestLayout = lazy(() =>
  import("@/pages/layouts").then((module) => ({
    default: module.GuestLayout,
  })),
);

// const UserLayout = lazy(() =>
//   import('@/pages/layouts').then((module) => ({
//     default: module.UserLayout,
//   })),
// )

const browserRouter = createBrowserRouter([
  {
    // errorElement: <BubbleError />,
    children: [
      {
        element: createElement(enhance(GenericLayout)),
        children: [homePageRoute],
      },
      {
        element: createElement(enhance(GuestLayout)),
        children: [loginPageRoute, registerPageRoute],
      },
      {
        element: createElement(Outlet),
        children: [page404Route],
      },
      {
        loader: async () => redirect(pathKeys.page404()),
        path: "*",
      },
    ],
  },
]);

// const browserRouter = createBrowserRouter([
//   {
//     errorElement: <BubbleError />,
//     children: [
//       {
//         element: createElement(enhance(GenericLayout)),
//         children: [homePageRoute, articlePageRoute, profilePageRoute],
//       },
//       {
//         element: createElement(enhance(UserLayout)),
//         children: [editorPageRoute, settingsPageRoute],
//       },
//       {
//         element: createElement(enhance(GuestLayout)),
//         children: [loginPageRoute, registerPageRoute],
//       },
//       {
//         element: createElement(Outlet),
//         children: [page404Route],
//       },
//       {
//         loader: async () => redirect(pathKeys.page404()),
//         path: '*',
//       },
//     ],
//   },
// ])

// // https://github.com/remix-run/react-router/discussions/10166
// function BubbleError() {
//   const error = useRouteError()

//   if (error) throw error
//   return null
// }

function LayoutSkeleton() {
  return <FullPageLoading />;
}
