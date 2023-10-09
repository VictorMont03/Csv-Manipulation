export function Base({
	slug,
	label,
	isRequired,
	isErrored,
	errorMessage,
	children,
}) {
	return (
		<div className="input-wrapper">
			{!!label && (
				<label className="input-wrapper__label" htmlFor={slug}>
					{isRequired && <span>* </span>}
					{label}
				</label>
			)}
			{children}
			{isErrored && (
				<span className="input-wrapper__error-message">{errorMessage}</span>
			)}
		</div>
	);
}