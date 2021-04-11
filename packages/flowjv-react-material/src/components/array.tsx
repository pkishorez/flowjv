import { Button, FormLabel, IconButton } from "@material-ui/core";
import { AutoFlow } from "flowjv-react";
import { IArrayConfig } from "flowjv-react/dist/form/config";
import React from "react";
import { UI } from "../type";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

export const ArrayUI = ({
	config,
}: {
	config: IArrayConfig<
		UI.StringUI,
		UI.NumberUI,
		UI.BooleanUI,
		UI.EnumUI,
		UI.CustomUI,
		UI.ArrayUI
	>;
}) => {
	const {
		path,
		value = [],
		insertAtIndex,
		deleteAtIndex,
		uniqueIndexes,
		schema: { ui, ...schema },
	} = config;
	return (
		<div
			style={{
				marginTop: 20,
			}}
		>
			{schema.label && (
				<FormLabel style={{ display: "flex", alignItems: "center" }}>
					{schema.label}{" "}
				</FormLabel>
			)}
			<div
				style={{
					padding: 10,
					backgroundColor: "rgba(0,0,0,0.03)",
				}}
			>
				{value.map((_, i) => (
					<div
						style={{
							display: "flex",
							alignItems: "center",
						}}
						key={uniqueIndexes[i] ?? i}
					>
						<div
							style={{
								flexGrow: 1,
							}}
						>
							<AutoFlow path={[...path, i]} />
						</div>
						{ui?.length === value.length
							? null
							: (ui?.minLength === undefined ||
									value.length > ui?.minLength) && (
									<IconButton
										size="medium"
										style={{ marginTop: -10 }}
										onClick={() => deleteAtIndex(i)}
									>
										<DeleteIcon style={{ fontSize: 18 }} />
									</IconButton>
							  )}
					</div>
				))}
				{ui?.length === value.length ? null : (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							marginTop: 10,
						}}
					>
						{(ui?.maxLength === undefined ||
							value.length < ui?.maxLength) && (
							<Button
								size="medium"
								variant="outlined"
								onClick={() => insertAtIndex(value.length)}
							>
								Add <AddIcon style={{ fontSize: 10 }} />
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
