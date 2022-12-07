import { Container } from "@mantine/core";
import "./page.css";
const Page = ({ className = "", ...props }) => (
	<Container
		className="page"
		fluid
		sx={(theme) => ({
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		})}
		p={0}
		{...props}
	></Container>
);

export default Page;
