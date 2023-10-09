import { Switch } from "react-router-dom";

import Public from "./public";

// Pages
import { Dashboard } from "../pages/dashboard";
import { List } from '../pages/list'

const Routes = () => {
	return (
		<Switch>
			<Public component={Dashboard} path="/" exact />
			<Public component={List} path="/list" exact />
		</Switch>
	);
};

export default Routes;