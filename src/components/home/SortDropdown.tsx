import Dropdown from "@/components/common/dropdown/Dropdown";

type Item = {
  id: number;
  name: string;
};

const SortData: Item[] = [
  { id: 1, name: "최신순" },
  { id: 2, name: "별점 높은순" },
  { id: 3, name: "좋아요순" }
];

type SortDropdownProps = {
  onSelect: (option: string) => void;
}

export default function SortDropdown({ onSelect }: SortDropdownProps) {
  return (
    <Dropdown items={SortData} onSelect={(item) => onSelect(item.name)} className="mr-[3rem] md:mr-[8rem] lg:m-0">
      <Dropdown.Button placeholder="최신순" variant={"small"} />
      <Dropdown.List />
    </Dropdown>
  );
}
