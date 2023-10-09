import classnames from "classnames";

export function Button({
	children,
	size = "lg",
	isFullWidth,
	isLoading,
	loadingText,
	...props
}) {
	const classNames = classnames({
		btn: true,
		[`btn--${size}`]: true,
		"btn--full": isFullWidth,
		loading: isLoading,
	});

	if (isLoading) {
		return (
			<button className={classNames} {...props}>
				<div className="loading__spinner" />
				<span className="loading__text">{loadingText}</span>
			</button>
		);
	}

	return (
		<button className={classNames} {...props}>
			{children}
		</button>
	);
}