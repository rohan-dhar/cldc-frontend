import { Button, Card, Loader, NavLink, Text, Title } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import genClassName from "../../utils/genClassNames";
import { BiLogOutCircle } from "react-icons/bi";
import { CgMathPlus } from "react-icons/cg";
import ModalImage from "react-modal-image";

import "./ui.css";
import { useLocation } from "react-router-dom";
import tokenStorage from "../../utils/tokenStorage";
import useIdentity from "../../hooks/useIdentity";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCallback } from "react";
import { routesData } from "../../routes";
import { IoChevronBack } from "react-icons/io5";
import anim from "../../conf/anim";

const motionProps = { initial: "initial", animate: "animate", exit: "exit" };

export const Page = ({ className, ...rest }) => {
	return (
		<motion.main
			variants={anim.page}
			{...motionProps}
			className={genClassName({ base: "page", additional: className })}
			{...rest}
		/>
	);
};

export const AuthPage = ({
	className,
	children,
	title,
	backText = null,
	backTo = null,
	AddModal = null,
	onAdd,
	loading = false,
	...rest
}) => {
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

	return (
		<Page className={"auth-page"} {...rest}>
			<motion.aside className="auth-page-aside">
				<Title className="auth-page-aside-logo">Oceane.</Title>
				<main>
					<nav>
						{routesData
							.filter(({ icon }) => !!icon)
							.map(({ name, icon, path }) => (
								<NavLink
									className="auth-page-nav-link"
									key={path}
									label={name}
									icon={icon}
									active={path === pathname}
									onClick={() => navigate(path)}
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
			</motion.aside>
			<main className="auth-page-main">
				<Title className="auth-page-main-title">
					<>
						{backText && (
							<Link className="auth-page-main-back" to={backTo}>
								<span>
									<IoChevronBack />
								</span>{" "}
								{backText}
							</Link>
						)}
						{title}
					</>
				</Title>
				{loading ? (
					<Loader className="loader auth-page-loader" />
				) : (
					<>
						{children}
						{!!AddModal && (
							<Button
								className="auth-page-main-add"
								onClick={() => setModalOpen(true)}
							>
								<CgMathPlus />
							</Button>
						)}
					</>
				)}
			</main>
			{AddModal && (
				<AddModal onAdd={onAdd} opened={modalOpen} onClose={handleModalClose} />
			)}
		</Page>
	);
};

export const ImageTile = ({
	src,
	name,
	className,
	height,
	imageModalMode = true,
	id,
	onClick,
	...rest
}) => {
	return (
		<section
			className={genClassName({ base: "image-tile", additional: className })}
			onClick={!imageModalMode ? () => onClick(id) : null}
			{...rest}
		>
			{imageModalMode ? (
				<ModalImage
					small={src}
					large={src}
					className="image-tile-image"
					alt={name}
					style={height ? { height } : {}}
					showRotate
				/>
			) : (
				<img
					small={src}
					className="image-tile-image"
					alt={name}
					style={height ? { height } : {}}
				/>
			)}

			<p>{name}</p>
		</section>
	);
};

export const ImageTiles = ({
	images,
	className = "",
	imageHeight,
	minWidth,
	imageModalMode,
	onClick,
	...rest
}) => {
	console.log("images :>> ", images);
	return (
		<section
			className={genClassName({ base: "image-tiles", additional: className })}
			style={{
				gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
			}}
			{...rest}
		>
			{Array.isArray(images)
				? images.map((image) => (
						<ImageTile
							height={imageHeight}
							key={image.src}
							src={image.src}
							name={image.name}
							imageModalMode={imageModalMode}
							onClick={onClick}
							id={image.id}
						/>
				  ))
				: null}
		</section>
	);
};
