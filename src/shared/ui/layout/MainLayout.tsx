import { AppShell, Group, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ColorSchemeToggle } from "../ColorSchemeToggle";
import { LogoutButton } from "@/features/auth/ui/LogoutButton";

export default function MainLayout() {
  return (
    <AppShell header={{ height: 56 }} navbar={{ width: 260, breakpoint: "sm" }}>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text fw={600}>Planista</Text>

          <Group gap="md">
            <LanguageSwitcher />
            <ColorSchemeToggle />
            <LogoutButton />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md"></AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
