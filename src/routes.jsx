import RouteRenderer from "./components/RouteRenderer";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import LoginPage from "./pages/LoginPage";
import { Route } from "react-router-dom";

const routesData = [
	{
		path: "/",
		Page: RootPage,
		props: { loggedIn: true, loggedOut: true },
		routeProps: {},
	},
	{
		path: "/home",
		Page: HomePage,
		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/login",
		Page: LoginPage,
		props: { loggedOut: true },
		routeProps: {},
	},
];

const routes = routesData.map(({ path, Page, props, routeProps }) => {
	return (
		<Route
			path={path}
			exact={true}
			{...routeProps}
			key={path}
			element={
				<RouteRenderer path={path} {...props}>
					<Page />
				</RouteRenderer>
			}
		/>
	);
});

export default routes;
