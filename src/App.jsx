import { MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import UserManager from "./components/managers/UserManager";
import RouteRenderer from "./components/RouteRenderer";
import { GOOGLE_CLIENT_ID } from "./conf";
import routes from "./routes";
import Test from "./Test";

const App = () => {
	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<MantineProvider
				theme={{
					defaultRadius: "md",
				}}
			>
				<UserManager>
					<Router>
						<Routes>{routes}</Routes>
						{/* <Routes>
							<Route
								path={"/xyz"}
								exact={true}
								key={"/xyz"}
								element={<RouteRenderer path={"/"}>{"hello"}</RouteRenderer>}
							/>
						</Routes> */}
					</Router>
				</UserManager>
			</MantineProvider>
		</GoogleOAuthProvider>
	);
};
export default App;
