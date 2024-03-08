import React, { ChangeEvent, useState } from "react";

export default function TextBox() {
	const [count, setCount] = useState(0);
	const [isFocused, setIsFocused] = useState(false);

	const hadleOnTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCount(e.target.value.length);
	};

	return (
		<div
			className={`min-h-[8.8rem] rounded-xl border ${isFocused ? "border-main_blue" : "border-[#353542]"} bg-[#252530] p-[2rem]`}
		>
			<textarea
				maxLength={300}
				className="w-full resize-none overflow-hidden border-none bg-[#252530] text-[1.4rem] text-white placeholder:text-[1.4rem] focus:outline-none lg:text-[1.6rem] lg:placeholder:text-[1.6rem]"
				placeholder="리뷰를 작성해 주세요"
				rows={3}
				onChange={hadleOnTextarea}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
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
