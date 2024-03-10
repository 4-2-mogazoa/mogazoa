import clsx from "clsx";
import {
	createContext,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useMemo,
	useState,
} from "react";

import useOutsideClick from "@/hooks/common/useOutsideClick";

import DropdownFilterInput from "./DropdownFilterInput";
import DropdownList from "./DropdownList";
import DropdownToggleButton from "./DropdownToggleButton";

export type Item = {
	id: number;
	name: string;
};

type DropdownContextType<T extends Item> = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	selectedItem: T | null;
	setSelectedItem: Dispatch<SetStateAction<T | null>>;
	onSelect: (item: T) => void;
	setFilterQuery: Dispatch<SetStateAction<string>>;
	filteredItems: T[];
	setButtonVariant: Dispatch<SetStateAction<string>>;
	inputRef: RefObject<HTMLInputElement> | null;
	setInputRef: Dispatch<SetStateAction<RefObject<HTMLInputElement> | null>>;
};

export const DropdownContext = createContext<DropdownContextType<any>>(null!);

type Props<T extends Item> = {
	items: T[];
	defaultItem?: T;
	onSelect: (item: T) => void;
	children: ReactNode;
};

export default function Dropdown<T extends Item>({
	items,
	defaultItem,
	onSelect,
	children,
}: Props<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const [filterQuery, setFilterQuery] = useState("");
	const [selectedItem, setSelectedItem] = useState<T | null | undefined>(
		defaultItem,
	);
	const [buttonVariant, setButtonVariant] = useState("");
	const [inputRef, setInputRef] = useState<RefObject<HTMLInputElement> | null>(
		null,
	);

	const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

	const filteredItems = useMemo(
		() => items.filter((item) => item.name.includes(filterQuery)),
		[filterQuery, items],
	);

	return (
		<DropdownContext.Provider
			value={{
				isOpen,
				setIsOpen,
				selectedItem,
				setSelectedItem,
				onSelect,
				setFilterQuery,
				filteredItems,
				setButtonVariant,
				inputRef,
				setInputRef,
			}}
		>
			<div
				ref={dropdownRef}
				className={clsx(
					"relative flex flex-col gap-[0.5rem]",
					buttonVariant === "small" &&
						"w-[10.2rem] items-center md:w-[18rem] lg:w-[20rem]",
				)}
			>
				{children}
			</div>
		</DropdownContext.Provider>
	);
}

Dropdown.Button = DropdownToggleButton;
Dropdown.Input = DropdownFilterInput;
Dropdown.List = DropdownList;
