import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "@mantine/core";
import { Page } from "@/shared/ui/layout/Page";

// const LoginModule = lazy(() => import("@/features/login/LoginModule"));
const router = createBrowserRouter([
    {
        path: "/",
        element: (
        <Page title="Home">
            <div>Witaj w aplikacji</div>
        </Page>
        ),
    },
    {
        path: "/login",
        element: (
        <Suspense fallback={<Loader />}>
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
