import RouteRenderer from "./components/RouteRenderer";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import LoginPage from "./pages/LoginPage";
import { Route } from "react-router-dom";

const routesData = [
	{
		path: "/",
		page: RootPage,
		props: { loggedIn: true, loggedOut: true },
		routeProps: {},
	},
	{
		path: "/home",
		page: HomePage,
		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/login",
		page: LoginPage,
		props: { loggedOut: true },
		routeProps: {},
	},
];

const routes = routesData.map(({ path, page, props, routeProps }) => (
	<Route
		path={path}
		exact={true}
		{...routeProps}
		key={path}
		element={
			<RouteRenderer path={path} {...props}>
				{page}
			</RouteRenderer>
		}
	/>
));

export default routes;
