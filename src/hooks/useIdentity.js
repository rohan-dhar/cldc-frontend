import { useCallback, useContext } from "react";
import { UserContext } from "../components/managers/UserManager";

const useIdentity = () => {
	const { user, setUser } = useContext(UserContext);
	const logout = useCallback(() => {
		setUser(null);
	}, [setUser]);
	return { user, setUser, logout };
};

export default useIdentity;
