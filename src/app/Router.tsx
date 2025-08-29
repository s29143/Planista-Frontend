import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "@mantine/core";
import { Page } from "@/shared/ui/layout/Page";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";

const AuthModule = lazy(() => import("@/features/auth"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Page title="Home">
          <div>Witaj w aplikacji</div>
        </Page>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <AuthModule />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Page title="404">Strona nie istnieje</Page>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
