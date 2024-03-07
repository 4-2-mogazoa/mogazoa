import React from "react";

import AddImageBox from "@/components/common/inputs/AddImageBox";
import Input from "@/components/common/inputs/Input";
import TextBox from "@/components/common/inputs/TextBox";

export default function Formtest() {
	return (
		<form className="h-full w-screen bg-black-300">
			<div className="p-20">
				<Input inputType="password" />
			</div>
			<div className="p-20">
				<TextBox />
			</div>
			<div className="p-20">
				<AddImageBox />
			</div>
		</form>
	);
}
