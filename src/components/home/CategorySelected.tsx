import Dropdown from "@/components/common/dropdown/Dropdown";
import ProductCard from "@/components/common/productcard/ProductCard";

type Item = {
  id: number;
  name: string;
};

const DropdownData: Item[] = [
  { id: 1, name: "최신순" },
  { id: 2, name: "별점 높은순" },
  { id: 3, name: "좋아요순" }
];

export default function CategorySelected () {
  return (
    <div>
      <div className="flex flex-row">
        <div>
          전자기기의 모든 상품
        </div>
        <Dropdown items={DropdownData} onSelect={(item) => console.log(item)}>
          <Dropdown.Button placeholder="최신순" variant={"small"} />
          <Dropdown.List />
        </Dropdown>
      </div>
    </div>
  );
}
