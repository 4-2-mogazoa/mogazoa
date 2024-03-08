import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";

import useOutsideClick from "@/hooks/common/useOutsideClick";
import cn from "@/utils/cn";

type Props<T extends { id: number; name: string }> =
	HTMLAttributes<HTMLElement> &
		VariantProps<typeof dropdownVariants> & {
			placeholder: string;
			items: Array<T>;
			onSelectItem: (item: T) => void;
		};

const dropdownVariants = cva(
	"flex w-full items-center justify-between rounded-[0.8rem] ",
	{
		variants: {
			variant: {
				dropdown:
					"bg-[#252530] px-[2rem] py-[1.25rem] outline outline-[#353542] md:py-[1.5rem] lg:py-[2rem]",
				smallDropdown: "w-[6.2rem] md:w-[14rem] lg:w-[16rem]",
				filteredDropdown:
					"bg-[#252530] px-[2rem] py-[1.25rem] text-[1.4rem] text-white outline outline-[#353542] placeholder:text-[1.4rem] placeholder:text-gray-200 focus:outline-[#5097FA] md:py-[1.5rem] lg:py-[2rem] lg:text-[1.6rem] placeholder:lg:text-[1.6rem]",
			},
		},
	},
);

export default function Dropdown<T extends { id: number; name: string }>({
	variant,
	placeholder,
	items,
	onSelectItem,
	...props
}: Props<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<T>();
	const [filterQuery, setFilterQuery] = useState("");
	const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
	const inputRef = useRef<HTMLInputElement>(null);

	const filteredItems = items.filter((item) => item.name.includes(filterQuery));

	const dropdownIcon = "/icons/drop_down.svg";

	const handleSelectItem = (item: T) => {
		setSelectedItem(item);
		setIsOpen(false);
		onSelectItem(item);

		if (variant === "filteredDropdown" && inputRef.current) {
			inputRef.current.value = item.name;
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;

		if (!query.length) {
			setFilterQuery(query);
			setIsOpen(false);
			return;
		}

		setFilterQuery(query);
		setIsOpen(true);
	};

	return (
		<div
			ref={dropdownRef}
			className={clsx(
				"relative flex flex-col gap-[0.5rem]",
				variant === "smallDropdown" &&
					"w-[10.2rem] items-center md:w-[18rem] lg:w-[20rem]",
			)}
		>
			{variant === "dropdown" && (
				<button
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					className={cn(
						dropdownVariants({ variant }),
						isOpen && "outline-[#5097FA]",
					)}
					onClick={() => setIsOpen(!isOpen)}
					{...props}
				>
					<span className="text-[1.4rem] text-gray-200 lg:text-[1.6rem]">
						{selectedItem ? selectedItem.name : placeholder}
					</span>
					<motion.div
						animate={isOpen ? "open" : "close"}
						variants={{ open: { rotate: 180 }, close: { rotate: 0 } }}
					>
						<Image
							src={dropdownIcon}
							alt="드랍다운 아이콘"
							width={30}
							height={30}
						/>
					</motion.div>
				</button>
			)}
			{variant === "smallDropdown" && (
				<button
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					className={cn(dropdownVariants({ variant }))}
					onClick={() => setIsOpen(!isOpen)}
					{...props}
				>
					<span
						className={clsx(
							"text-[1.4rem] text-gray-200 lg:text-[1.6rem]",
							isOpen && "text-white",
						)}
					>
						{selectedItem ? selectedItem.name : items[0].name}
					</span>
					<motion.div
						animate={isOpen ? "open" : "close"}
						variants={{ open: { rotate: 180 }, close: { rotate: 0 } }}
					>
						<Image
							src={dropdownIcon}
							alt="드랍다운 아이콘"
							width={30}
							height={30}
						/>
					</motion.div>
				</button>
			)}
			{variant === "filteredDropdown" && (
				<input
					type="text"
					aria-haspopup="listbox"
					aria-label="드롭다운 아이템 필터링"
					ref={inputRef}
					className={cn(dropdownVariants({ variant }))}
					placeholder={placeholder}
					onChange={handleChange}
					{...props}
				/>
			)}
			{(variant !== "filteredDropdown" ||
				(filterQuery && filteredItems.length !== 0)) && (
				<motion.ul
					role="listbox"
					animate={isOpen ? "open" : "close"}
					variants={{
						open: {
							opacity: 1,
						},
						close: { opacity: 0 },
					}}
					transition={{ duration: 0.1 }}
					style={{ pointerEvents: isOpen ? "auto" : "none" }}
					className="absolute top-[100%] mt-[0.6rem] flex w-full flex-col gap-[0.5rem] rounded-[0.8rem] bg-[#252530] p-[1rem] outline outline-[#353542]"
				>
					{filteredItems?.map((item) => (
						<li
							role="option"
							aria-selected={selectedItem?.id === item.id}
							key={item.id}
						>
							<button
								onClick={() => handleSelectItem(item)}
								className="w-full rounded-[0.6rem] px-[2rem] py-[0.6rem] text-left text-gray-200 hover:bg-[#353542] hover:text-white"
							>
								<span className="text-[1.4rem] lg:text-[1.6rem]">
									{item.name}
								</span>
							</button>
						</li>
					))}
				</motion.ul>
			)}
		</div>
	);
}
