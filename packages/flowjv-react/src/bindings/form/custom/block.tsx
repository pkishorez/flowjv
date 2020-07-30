import { useContext } from "react";
import { formContext } from "../index";
import { lookup, execJSONExpression } from "flowjv";
import { IObjectIfBlock } from "flowjv/dist/jsonflow/blocks/object";

export const Block = ({ blockID }: { blockID: string }) => {
	const context = useContext(formContext);
	return context.renderBlockById(blockID);
};
export const IfBlock = ({
	blockID,
	ifTrue,
	ifFalse = null,
}: {
	blockID: string;
	ifTrue: any;
	ifFalse?: any;
}) => {
	const context = useContext(formContext);
	const { context: flowjvContext, data } = context.getContext();
	const { block, ref } = lookup.block(
		context.getContext().schema,
		blockID
	) as { block: IObjectIfBlock; ref: string[] };
	if (!block) return null;
	const cond = !!execJSONExpression(block.cond, {
		context: flowjvContext,
		data,
		refPath: ref,
	});
	return cond ? ifTrue : ifFalse;
};
