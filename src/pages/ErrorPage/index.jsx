import { Alert, Center } from "@mantine/core";
import { Page } from "../../components/ui";
import genClassNames from "../../utils/genClassNames";
import "./error-page.css";

const ErrorPage = ({ className = "", ...rest }) => {
	return (
		<Page
			className={genClassNames({ base: "error-page", additional: className })}
		>
			<Center>
				<Alert
					className="error-page-alert"
					color={"red"}
					title="Oops"
					{...rest}
				/>
			</Center>
		</Page>
	);
};

export default ErrorPage;
