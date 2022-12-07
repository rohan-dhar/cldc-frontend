import { MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, BrowserRouter as Router } from "react-router-dom";
import UserManager from "./components/managers/UserManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GOOGLE_CLIENT_ID } from "./conf";
import routes from "./routes";

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
					<ToastContainer autoClose={3000} newestOnTop draggable />
				</UserManager>
			</MantineProvider>
		</GoogleOAuthProvider>
	);
};
export default App;
