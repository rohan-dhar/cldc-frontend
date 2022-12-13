import RouteRenderer from "./components/RouteRenderer";
import HomePage from "./pages/HomePage";
import RootPage from "./pages/RootPage";
import LoginPage from "./pages/LoginPage";
import { Route } from "react-router-dom";
import AlbumsPage from "./pages/AlbumsPage";

import { BiHome, BiSearchAlt } from "react-icons/bi";
import { BsFolder2Open } from "react-icons/bs";
import { GrShareOption } from "react-icons/gr";

import SearchPage from "./pages/SearchPage";
import AlbumDetailPage from "./pages/AlbumDetailPage.jsx";

export const routesData = [
	{
		path: "/",
		page: <RootPage />,
		props: { loggedIn: true, loggedOut: true },
		routeProps: {},
	},
	{
		path: "/login",
		page: <LoginPage />,
		props: { loggedOut: true },
		routeProps: {},
	},
	{
		path: "/album/:albumId",
		page: <AlbumDetailPage />,

		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/home",
		name: "Home",
		icon: <BiHome />,

		page: <HomePage />,
		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/albums",
		name: "Albums",
		icon: <BsFolder2Open />,

		page: <AlbumsPage />,
		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/sharedAlbums",
		name: "Shared with me",
		icon: <GrShareOption />,

		page: <AlbumsPage key="shared-albums-page" shared />,
		props: { loggedIn: true },
		routeProps: {},
	},
	{
		path: "/search",
		page: <SearchPage />,
		name: "Search",
		icon: <BiSearchAlt />,

		props: { loggedIn: true },
		routeProps: {},
	},
];

const routes = routesData.map(({ path, page, props, routeProps }) => {
	return (
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
	);
});

export default routes;
