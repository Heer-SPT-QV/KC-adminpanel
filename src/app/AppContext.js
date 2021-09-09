import { createContext, useState } from 'react';
import routes from './fuse-configs/routesConfig';

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	return <Context.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, routes }}>{children}</Context.Provider>;
};
