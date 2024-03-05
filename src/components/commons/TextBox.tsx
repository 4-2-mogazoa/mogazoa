import React, { ChangeEvent, useState } from "react";

import { cn } from "@/utils/cn";

export default function TextBox() {
	const [count, setCount] = useState(0);

	const onTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCount(e.target.value.length);
	};

	return (
		<div className="min-h-[8.8rem] rounded-xl border border-[#353542] bg-[#252530] p-[2rem]">
			<textarea
				maxLength={300}
				className="w-full resize-none overflow-hidden border-none bg-[#252530] text-[1.6rem] text-white placeholder:text-[1.6rem] focus:outline-none"
				placeholder="리뷰를 작성해 주세요"
				rows={3}
				onChange={onTextareaHandler}
			/>
			<div>
				<p className="text-right text-[1.4rem] text-[#6E6E82]">
					<span>{count}</span>
					<span>/300 자</span>
				</p>
			</div>
		</div>
	);
}
