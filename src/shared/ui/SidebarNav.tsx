import {
  NavLink,
  Stack,
  Group,
  Divider,
  ScrollArea,
  Text,
  Paper,
  Avatar,
  Badge,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Building2,
  Users,
  ListTodo,
  Settings,
} from "lucide-react";
import { useMe } from "@/features/auth/api/queries";
import type { User } from "@/features/auth/model/store";

function roleBadge(role?: string): { color: string; label: string } {
  const r = (role || "USER").toUpperCase();
  switch (r) {
    case "ADMIN":
      return { color: "red", label: "Admin" };
    case "MANAGER":
      return { color: "violet", label: "Manager" };
    case "OWNER":
      return { color: "orange", label: "Owner" };
    default:
      return { color: "blue", label: r.charAt(0) + r.slice(1).toLowerCase() };
  }
}
function initials(u?: User) {
  const a = (u?.firstname || "").trim();
  const b = (u?.lastname || "").trim();
  const init = `${a[0] || ""}${b[0] || ""}`.toUpperCase();
  return init || (u?.username?.slice(0, 2).toUpperCase() ?? "?");
}

function isActivePath(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SidebarNav() {
  const { t } = useTranslation("common");
  const { pathname } = useLocation();
  const user = useMe().data;

  const name =
    [user?.firstname, user?.lastname].filter(Boolean).join(" ") ||
    user?.username;
  const { color, label } = roleBadge(user?.roles?.[0]);

  return (
    <Stack gap="md" h="100%">
      <Paper radius="md" p="sm">
        <Group wrap="nowrap" align="center">
          <Avatar radius="xl" size={36} color="blue">
            {initials(user)}
          </Avatar>

          <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" fw={600} lineClamp={1}>
              {name}
            </Text>

            <Group gap={6} justify="space-between" wrap="nowrap">
              <Text size="xs" c="dimmed" style={{ minWidth: 0 }} lineClamp={1}>
                @{user?.username}
              </Text>
              <Badge size="xs" variant="light" color={color}>
                {label}
              </Badge>
            </Group>
          </Stack>
        </Group>
      </Paper>
      <Divider />
      <ScrollArea type="auto" style={{ flex: 1 }}>
        <Stack gap={4} pr="xs">
          <NavLink
            component={Link}
            to="/"
            label={t("pages.dashboard", "Dashboard")}
            leftSection={<LayoutDashboard size={16} />}
            active={isActivePath(pathname, "/")}
          />

          {/* Firmy */}
          <NavLink
            label={t("pages.companies", "Companies")}
            component={Link}
            to="/companies"
            leftSection={<Building2 size={16} />}
            active={isActivePath(pathname, "/companies")}
          />
          <NavLink
            label={t("pages.contacts", "Contacts")}
            component={Link}
            to="/contacts"
            leftSection={<Users size={16} />}
            active={isActivePath(pathname, "/contacts")}
          />
          <NavLink
            label={t("pages.actions", "Actions")}
            component={Link}
            to="/actions"
            leftSection={<ListTodo size={16} />}
            active={isActivePath(pathname, "/actions")}
          />
          <NavLink
            label={t("pages.settings", "Settings")}
            leftSection={<Settings size={16} />}
            defaultOpened={pathname.startsWith("/settings")}
          >
            <NavLink
              label={t("pages.users", "Users")}
              component={Link}
              to="/users"
              leftSection={<Users size={16} />}
              active={isActivePath(pathname, "/users")}
            />
          </NavLink>
        </Stack>
      </ScrollArea>

      {/* Sekcja pomocy / stopka */}
      <Group justify="space-between" gap="xs">
        <Text size="xs" c="dimmed">
          v1.0
        </Text>
      </Group>
    </Stack>
  );
}
