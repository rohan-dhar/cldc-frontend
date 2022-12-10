import { MantineProvider } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, BrowserRouter as Router } from "react-router-dom";
import UserManager from "./components/managers/UserManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GOOGLE_CLIENT_ID } from "./conf";
import routes from "./routes";
import { AnimatePresence } from "framer-motion";

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
						<AnimatePresence>
							<Routes>{routes}</Routes>
						</AnimatePresence>
					</Router>
					<ToastContainer autoClose={3000} newestOnTop draggable />
				</UserManager>
			</MantineProvider>
		</GoogleOAuthProvider>
	);
};
export default App;
