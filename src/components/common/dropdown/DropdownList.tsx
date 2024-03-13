import { motion } from "framer-motion";
import { useContext } from "react";

import { DropdownContext, Item } from "./Dropdown";

export default function DropdownList<T extends Item>() {
	const {
		isOpen,
		filteredItems,
		selectedItem,
		setSelectedItem,
		setIsOpen,
		onSelect,
		inputRef,
	} = useContext(DropdownContext);

	const handleSelectItem = (item: T) => {
		setSelectedItem(item);
		setIsOpen(false);
		onSelect(item);

		if (inputRef && inputRef.current) {
			inputRef.current.value = item.name;
		}
	};

	if (filteredItems.length === 0) {
		return null;
	}

	return (
		<motion.ul
			role="listbox"
			animate={isOpen ? "open" : "close"}
			initial="close"
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
						className="w-full rounded-[0.6rem] px-[0.5rem] py-[0.6rem] text-left text-gray-200 hover:bg-[#353542] hover:text-white md:px-[2rem]"
					>
						<span className="text-[1.4rem] lg:text-[1.6rem]">{item.name}</span>
					</button>
				</li>
			))}
		</motion.ul>
	);
}
