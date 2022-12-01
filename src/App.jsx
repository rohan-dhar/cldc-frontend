import { Routes, BrowserRouter as Router } from "react-router-dom";
import UserManager from "./components/managers/UserManager";
import routes from "./routes";

const App = () => {
	return (
		<UserManager>
			<Router>
				<Routes>{routes}</Routes>
			</Router>
		</UserManager>
	);
};
export default App;
