// Components
import { Input } from "./Input";

export function File({ ...props }) {
	return (
		<Input
			type="file"
			accept='.csv'
			{...props}
		/>
	);
}