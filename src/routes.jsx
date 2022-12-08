import RouteRenderer from "./components/RouteRenderer";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import LoginPage from "./pages/LoginPage";
import { Route } from "react-router-dom";
import AlbumsPage from "./pages/AlbumsPage";

import { BiHome, BiSearchAlt } from "react-icons/bi";
import { BsFolder2Open } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import SearchPage from "./pages/SearchPage";

export const routesData = [
	{
		path: "/",
		Page: RootPage,
		props: { loggedIn: true, loggedOut: true },
		routeProps: {},
	},
	{
		path: "/login",
		Page: LoginPage,
		props: { loggedOut: true },
		routeProps: {},
	},
	{
		path: "/home",
		name: "Home",
		icon: <BiHome />,

		Page: HomePage,
		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/albums",
		name: "Albums",
		icon: <BsFolder2Open />,

		Page: AlbumsPage,
		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/search",
		Page: SearchPage,
		name: "Search",
		icon: <BiSearchAlt />,

		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/memories",
		Page: HomePage,
		name: "Memories",
		icon: <IoIosTimer />,

		props: { loggedIn: true },
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
