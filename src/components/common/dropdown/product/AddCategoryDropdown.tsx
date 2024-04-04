import Dropdown from '@/components/common/dropdown/Dropdown';

type AddCategoryDropdownProps = {
  items: { id: number; name: string }[];
  value: number;
  onSelect: (value: number) => void;
  categoryId?: number;
}

export default function AddCategoryDropdown({ items, value, onSelect, categoryId }: AddCategoryDropdownProps) {
  const selectedCategory = categoryId ? items.find(item => item.id === categoryId) : null;

  return (
    <Dropdown
      items={items}
      onSelect={(item) => onSelect(item.id)}
    >
      <Dropdown.Button placeholder={selectedCategory ? selectedCategory.name : '카테고리 선택'}>
        {items.find(item => item.id === value)?.name}
      </Dropdown.Button>
      <Dropdown.List />
    </Dropdown>
  );
}
