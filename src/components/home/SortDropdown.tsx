import Dropdown from "@/components/common/dropdown/Dropdown";
import { Order } from "@/types/product";

type Item = {
	id: Order;
	name: string;
};

const SortData: Item[] = [
	{ id: "recent", name: "최신순" },
	{ id: "rating", name: "별점 높은순" },
	{ id: "reviewCount", name: "리뷰 많은순" },
];

type SortDropdownProps = {
	onSelect?: (option: Order) => void;
};

export default function SortDropdown({ onSelect }: SortDropdownProps) {
	return (
		<Dropdown
			items={SortData}
			onSelect={(item) => onSelect && onSelect(item.id)}
		>
			<Dropdown.Button placeholder="최신순" variant={"small"} />
			<Dropdown.List />
		</Dropdown>
	);
}
