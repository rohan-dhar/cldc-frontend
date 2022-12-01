import { useState } from "react";

const { memo, createContext } = require("react");

export const UserContext = createContext();

const UserManager = memo(({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
});

export default UserManager;
