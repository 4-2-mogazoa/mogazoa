import Dropdown from "@/components/common/dropdown/Dropdown";

type Item = {
  id: number;
  name: string;
};

type AddCategoryDropdownProps = {
  onSelect: (categoryId: number, categoryName: string) => void;
  items: Item[];
}
export default function AddCategoryDropdown({ onSelect, items }: AddCategoryDropdownProps) {
  return (
    <Dropdown items={items} onSelect={(item) => onSelect(item.id, item.name)} >
      <Dropdown.Button placeholder="카테고리 선택" variant={"basic"} />
      <Dropdown.List />
    </Dropdown>
  );
}
