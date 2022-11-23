import classes from "./Status.module.css";

export const Status = ({ status }) => {
	return (
		<div className={`${classes.container}`}>
			<div className={classes.statusWrapper}>
				{status ? "Connected" : "Disconnected"}
				<div
					className={`${classes.circle} ${
						status ? classes.succes : classes.error
					}`}
				></div>
			</div>
		</div>
	);
};
