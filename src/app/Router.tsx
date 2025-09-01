import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "@mantine/core";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import MainLayout from "@/shared/ui/layout/MainLayout";
import LoginLayout from "@/shared/ui/layout/LoginLayout";

const AuthModule = lazy(() => import("@/features/auth"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <div>Strona główna - dostęp tylko dla zalogowanych</div>,
      },
      {
        path: "*",
        element: <div>Strona nie istnieje</div>,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <LoginLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <AuthModule />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Strona nie istnieje</div>,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
