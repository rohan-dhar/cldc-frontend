import { Alert, Loader } from "@mantine/core";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AuthPage } from "../../components/ui";
import { MAKE_SEARCH_URL } from "../../conf/urls";
import useResource from "../../hooks/useResource";
import genClassName from "../../utils/genClassNames";
import "./search-page.css";

const SEARCH_THROTTLE_DELAY = 200;

const SearchPage = () => {
	const [focussed, setFocussed] = useState(false);
	const inputRef = useRef();

	const [value, setValue] = useState("");

	const [{ loading, error, data }, fetchResults, reset] = useResource(
		{
			url: MAKE_SEARCH_URL(value),
		},
		false
	);

	const [results, setResults] = useState([]);

	useEffect(() => {
		if (!data) return;
		setResults(data);
		reset();
	}, [data, reset]);

	const timerRef = useRef(null);

	const handleChange = () => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		if (!inputRef.current.value.trim()) return setValue("");
		timerRef.current = setTimeout(() => {
			setValue(inputRef.current.value);
			fetchResults();
		}, SEARCH_THROTTLE_DELAY);
	};

	return (
		<AuthPage title="Search">
			<section
				className={genClassName({
					base: "search-page-input",
					conditionals: { "search-page-input-focussed": focussed },
				})}
			>
				<input
					placeholder="Start typing to search"
					onFocus={() => setFocussed(true)}
					onBlur={() => setFocussed(false)}
					onChange={handleChange}
					ref={inputRef}
				/>

				<motion.section
					animate={{ opacity: loading ? 0.8 : 0 }}
					className="search-page-loader"
				>
					<Loader />
				</motion.section>
			</section>
			{!value ? null : results.length === 0 && !error && !loading ? (
				<Alert color={"yellow"} title="No results 😪">
					We could not find any images for that search
				</Alert>
			) : error ? (
				<Alert color={"red"} title="Oops">
					We could not search for images right now. Please try again later.
				</Alert>
			) : results.length > 0 ? (
				`Found ${results.length} results`
			) : null}
		</AuthPage>
	);
};
export default SearchPage;
