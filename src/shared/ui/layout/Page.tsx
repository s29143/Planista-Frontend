import { Container, Title, Stack } from "@mantine/core";

export function Page(props: { title: string; children: React.ReactNode; right?: React.ReactNode }) {
    const { title, right, children } = props;
    return (
    <Container size="lg" py="lg">
        <Stack gap="md">
            <div className="flex items-center justify-between">
                <Title order={2}>{title}</Title>
                {right}
            </div>
            {children}
        </Stack>
    </Container>
    );
}
