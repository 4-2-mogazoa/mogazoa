import Dropdown from '@/components/common/dropdown/Dropdown';

type AddCategoryDropdownProps = {
  items: { id: number; name: string }[];
  value: number;
  onSelect: (value: number) => void;
}

export default function AddCategoryDropdown({ items, value, onSelect }: AddCategoryDropdownProps) {

  return (
    <Dropdown
      items={items}
      onSelect={(item) => onSelect(item.id)}
    >
      <Dropdown.Button placeholder='카테고리 선택'>{items.find((item) => item.id === value)?.name}</Dropdown.Button>
      <Dropdown.List />
    </Dropdown>
  );
}
