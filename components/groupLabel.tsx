import React, { MutableRefObject, RefObject } from "react";

type Props = {
	label: string;
	placeholder: string;
	type: string;
	value: string;
    ref:RefObject<HTMLInputElement>
};

function groupLabel(_props: Props) {
	return (
		<div className="form-control mt-1">
			<label className="label">
				<span className="label-text-lg">{_props.label}</span>
			</label>
			<label className="input-group">
				<span>{_props.value}</span>
				<input
					type={_props.type}
					placeholder={_props.placeholder}
					className="input input-bordered"
                    ref={_props.ref}
				/>
			</label>
		</div>
	);
}

export default groupLabel;
