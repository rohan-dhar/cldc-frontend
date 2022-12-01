import "./page.css";
const Page = ({ className = "", ...props }) => (
	<section className={`page ${className}`} {...props}></section>
);

export default Page;
