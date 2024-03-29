import { useEffect,useState } from "react";

import { getCategories } from "@/apis/categories";
import Dropdown from "@/components/common/dropdown/Dropdown";

type Item = {
  id: number;
  name: string;
};

type AddCategoryDropdownProps = {
  onSelect: (option: string) => void;
}

export default function AddCategoryDropdown({ onSelect }: AddCategoryDropdownProps) {
  const [category, setCategory] = useState<Item[]>([]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryData = await getCategories();
        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const items: Item[] = category.map(category => ({ id: category.id, name: category.name }));

  return (
    <Dropdown items={items} onSelect={(item) => onSelect(item.name)} >
      <Dropdown.Button placeholder="카테고리 선택" variant={"basic"} />
      <Dropdown.List />
    </Dropdown>
  );
}
