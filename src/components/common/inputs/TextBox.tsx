import { ChangeEvent, TextareaHTMLAttributes, useState } from "react";

export default function TextBox({
	maxLength,
	defaultValue,
	...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
	const [count, setCount] = useState(
		defaultValue ? String(defaultValue).length : 0,
	);
	const [isFocused, setIsFocused] = useState(false);

	const handleOnTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCount(e.target.value.length);
	};

	return (
		<div
			className={`min-h-[8.8rem] rounded-xl border ${isFocused ? "border-main_blue" : "border-[#353542]"} bg-[#252530] p-[2rem]`}
		>
			<textarea
				className="w-full resize-none overflow-hidden border-none bg-[#252530] text-[1.4rem] text-white placeholder:text-[1.4rem] placeholder:text-gray-200 focus:outline-none lg:text-[1.6rem] lg:placeholder:text-[1.6rem]"
				rows={3}
				onChange={handleOnTextarea}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				maxLength={maxLength}
				defaultValue={defaultValue}
				{...props}
			/>

			<p className="text-right text-[1.4rem] text-[#6E6E82]">
				<span>{count}</span>
				<span>/{maxLength}</span>
			</p>
		</div>
	);
}
