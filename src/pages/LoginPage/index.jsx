import { Card, Center, Container, Title } from "@mantine/core";
import Page from "../Page";

const LoginPage = () => {
	return (
		<Container
			h="100vh"
			fluid
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[5]
						: theme.colors.gray[1],
			})}
			p={0}
		>
			<Center h="100%">
				<Card shadow="sm" w="400px">
					<Title align="center" order={2}>
						Login
					</Title>
				</Card>
			</Center>
		</Container>
	);
};
export default LoginPage;
