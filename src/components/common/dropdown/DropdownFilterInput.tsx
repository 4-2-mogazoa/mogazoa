import { cva, VariantProps } from "class-variance-authority";
import {
	ChangeEvent,
	InputHTMLAttributes,
	useContext,
	useEffect,
	useRef,
} from "react";

import cn from "@/utils/cn";

import { DropdownContext } from "./Dropdown";

type DropdownFilterProps = InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof dropdownFilterVariants>;

const dropdownFilterVariants = cva(
	"flex w-full items-center justify-between rounded-[0.8rem] bg-[#252530] px-[2rem] py-[1.7rem] text-[1.4rem] text-white outline outline-[#353542] placeholder:text-[1.4rem] placeholder:text-gray-200 focus:outline-[#5097FA] md:py-[1.95rem] lg:py-[2.3rem] lg:text-[1.6rem] placeholder:lg:text-[1.6rem]",
	{
		variants: {
			variant: {
				normal: "",
				withChip: "",
			},
		},
	},
);

export default function DropdownFilterInput({
	variant,
	...props
}: DropdownFilterProps) {
	const { setIsOpen, setFilterQuery, setInputRef } =
		useContext(DropdownContext);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFilterQuery(e.target.value);
	};

	useEffect(() => {
		setInputRef(inputRef);
	}, [setInputRef]);

	return (
		<div>
			<input
				type="text"
				aria-haspopup="listbox"
				aria-label="드롭다운 아이템 필터링"
				ref={inputRef}
				className={cn(dropdownFilterVariants({ variant }))}
				onChange={handleChange}
				onFocus={() => setIsOpen(true)}
				{...props}
			/>
		</div>
	);
}
