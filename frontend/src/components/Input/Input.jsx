import { useRef } from "react";
import classnames from "classnames";


// Components
import { Base } from "./Base";

export function Input({
	label,
	name,
	leftElement,
	rightElement,
	register,
	required = false,
	isErrored,
	errorMessage,
	...props
}) {
	// Classnames
	const erroredClassNames = classnames({
		"--invalid": isErrored,
	});

	// Refs
	const inputRef = useRef(null);

	// Functions
	const setInputFocus = (e) => {
		if (!inputRef.current) return;

		inputRef.current.focus();
	};

	return (
		<Base
			label={label}
			isRequired={required}
			isErrored={isErrored}
			errorMessage={errorMessage}
		>
			<div
				className={`input__container input${erroredClassNames}`}
				onClick={setInputFocus}
				tabIndex={0}
			>
				{!!leftElement && (
					<div className="input__icon icon--left">{leftElement}</div>
				)}
				<input
					ref={inputRef}
					className={`input__element element${erroredClassNames}`}
					tabIndex={-1}
					{...register(name, { required })}
					{...props}
				/>
				{!!rightElement && (
					<div className="input__icon icon--right">{rightElement}</div>
				)}
			</div>
		</Base>
	);
}