const genPrefixedClass = ({ prefix = "", className = "" } = {}) => {
	if (!prefix || !className || typeof className !== "string") return className;
	let classes = className.trim().split(" ");
	classes = classes.map((className) => `${prefix}-${className}`);
	return classes.join(" ");
};
const genClassName = ({
	base = "",
	conditionals = {}, // {"condition-class-name-like-this": boolean indicating presence}
	additional = "",
	prefix = "",
} = {}) => {
	let className = genPrefixedClass({ prefix, className: base });

	const conditionalArray = Object.entries(conditionals);
	conditionalArray.forEach(([conditionalClass, condition]) => {
		if (!!condition) {
			className = `${className} ${genPrefixedClass({
				prefix,
				className: conditionalClass,
			})}`;
		}
	});

	if (additional) {
		className = `${className} ${additional}`;
	}
	return className;
};

export default genClassName;
