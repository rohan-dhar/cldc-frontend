import { Alert, Loader, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_URL } from "../../conf/urls";
import useResource from "../../hooks/useResource";
import { Card, Title } from "@mantine/core";
import { Page } from "../../components/ui";
import "./login-page.css";
import { GoogleLogin } from "@react-oauth/google";
import tokenStorage from "../../utils/tokenStorage";

const LoginPage = () => {
	const [formError, setFormError] = useState(null);
	const [token, setToken] = useState(false);

	const [{ data, loading, error }, login] = useResource(
		{ url: LOGIN_URL, method: "POST", data: { value: { google_jwt: token } } },
		false,
		false
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (!data?.data?.jwt) return;
		tokenStorage.set(data?.data?.jwt);
		navigate("/");
	}, [data, navigate]);

	const handleSuccess = ({ credential }) => {
		setToken(credential);
		login();
	};
	const handleError = () => {
		setFormError(
			"Please select and authorize a Google account to proceed. We need access to your Google account to create an account on X"
		);
	};

	return (
		<Page className={"login-page"}>
			<Card className="login-page-card" p={"xl"} radius="md">
				<Title order={1} className="login-page-title">
					Welcome to <Text color={"blue"}>Oceane</Text>
				</Title>
				<Title order={4} className="login-page-heading">
					Sign in with your Google account to continue. If you do not have an
					account already, we will create a new account for you.
				</Title>
				{loading ? (
					<Loader className="loader" />
				) : (
					<>
						<GoogleLogin
							width="100%"
							onSuccess={handleSuccess}
							onError={handleError}
							useOneTap
							shape="pill"
							theme="filled_blue"
						/>
						{(error || formError) && (
							<Alert color={"red"} title="Oops" className="login-page-error">
								{error ? "Could not log you in. Try again later." : formError}
							</Alert>
						)}
					</>
				)}
			</Card>
		</Page>
	);
};

export default LoginPage;
