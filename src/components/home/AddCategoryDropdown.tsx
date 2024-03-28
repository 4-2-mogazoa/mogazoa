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
  const [categories, setCategories] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const items: Item[] = categories.map(category => ({ id: category.id, name: category.name }));

  return (
    <Dropdown items={items} onSelect={(item) => onSelect(item.name)}>
      <Dropdown.Button placeholder="카테고리 선택" variant={"basic"} onClick={(e) => e.preventDefault()} />
      <Dropdown.List onClick={(e) => e.preventDefault()} />
    </Dropdown>
  );
}
