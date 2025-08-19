import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { appTheme } from "@/shared/ui/theme";
import { AppRouter } from "./Router";

export default function App() {
    return (
        <MantineProvider theme={appTheme}>
            <ModalsProvider>
                <Notifications position="top-right" />
                <AppRouter />
            </ModalsProvider>
        </MantineProvider>
    );
}
