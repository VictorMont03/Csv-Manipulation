import { Input as DefaultInput } from "./Input";
import { File as FileInput } from './File'

export function Input({ ...props }) {
	return <DefaultInput {...props} />;
}

Input.File = FileInput;