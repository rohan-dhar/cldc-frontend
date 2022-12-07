import {
	Button,
	Card,
	Group,
	Image,
	NavLink,
	Text,
	Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import genClassName from "../../utils/genClassNames";
import { BiHome } from "react-icons/bi";
import { BsFolder2Open } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { CgMathPlus } from "react-icons/cg";

import { IoIosTimer } from "react-icons/io";

import "./ui.css";
import { useLocation } from "react-router-dom";
import tokenStorage from "../../utils/tokenStorage";
import useIdentity from "../../hooks/useIdentity";
import { useState } from "react";
import { useCallback } from "react";

export const Page = ({ className, ...rest }) => {
	return (
		<main
			className={genClassName({ base: "page", additional: className })}
			{...rest}
		/>
	);
};

const navOptions = [
	{ text: "Home", icon: <BiHome />, to: "/home" },
	{ text: "Albums", icon: <BsFolder2Open />, to: "/albums" },
	{ text: "Memories", icon: <IoIosTimer />, to: "/memories" },
];

export const AuthPage = ({ className, children, title, AddModal, ...rest }) => {
	const { pathname } = useLocation();
	const { user, setUser } = useIdentity();

	const navigate = useNavigate();

	const handleLogout = () => {
		tokenStorage.clear();
		setUser(null);
		navigate("/");
	};

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalClose = useCallback(() => {
		setModalOpen(false);
	}, []);

	console.log("user :>> ", user);

	return (
		<Page className={"auth-page"} {...rest}>
			<aside className="auth-page-aside">
				<Title className="auth-page-aside-logo">Oceane.</Title>
				<main>
					<nav>
						{navOptions.map(({ text, icon, to }) => (
							<NavLink
								className="auth-page-nav-link"
								key={to}
								label={text}
								icon={icon}
								active={to === pathname}
								onClick={() => navigate(to)}
							/>
						))}
					</nav>
					<Card shadow={"md"}>
						<section className="auth-page-aside-profile">
							<img src={user.image} alt="" />
							<main>
								<Title order={5}>{user.name}</Title>
								<Text color={"gray.5"}>{user.email}</Text>
							</main>
						</section>
						<Button
							className="auth-page-aside-logout"
							color={"red"}
							leftIcon={<BiLogOutCircle />}
							onClick={handleLogout}
						>
							Logout
						</Button>
					</Card>
				</main>
			</aside>
			<main className="auth-page-main">
				<Title className="auth-page-main-title">{title}</Title>
				{children}
				{!!AddModal && (
					<Button
						className="auth-page-main-add"
						onClick={() => setModalOpen(true)}
					>
						<CgMathPlus />
					</Button>
				)}
			</main>
			{<AddModal opened={modalOpen} onClose={handleModalClose} />}
		</Page>
	);
};

export const ImageTile = ({ src, name, className, ...rest }) => {
	return (
		<section
			className={genClassName({ base: "image-tile", additional: className })}
			{...rest}
		>
			<img src={src} alt="" />
			<p>{name}</p>
		</section>
	);
};
