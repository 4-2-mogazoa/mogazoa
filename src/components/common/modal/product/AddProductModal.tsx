import { useState } from "react";

import BasicButton from "@/components/common/button/BasicButton";
import AddImageBox from "@/components/common/inputs/AddImageBox";
import Input from "@/components/common/inputs/Input";
import TextBox from "@/components/common/inputs/TextBox";
import ModalWrapper from "@/components/common/modal/ModalWrapper";
import AddCategoryDropdown from "@/components/home/AddCategoryDropdown";

type AddProductModalProps = {
  onClose: () => void;
}

export default function AddProductModal ({ onClose }: AddProductModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleAddProduct = () => {
    // Add product logic here
  };

  return (
    <ModalWrapper
      id="add-product-modal"
      onRemove={onClose}
      config={{ isCloseClickOutside: true, isCloseESC: true}}
    >
      <div className="w-[100%] px-[4rem] md:w-[59rem] lg:w-[62rem]">
        <h2 className="text-[2.4rem] font-semibold text-white">상품 추가</h2>
        <form className="flex flex-col gap-[2rem]">
          <div className="flex w-[100%] flex-row justify-between">
            <div className="mr-[2rem] flex w-[100%] flex-col md:m-0 md:w-[36rem] md:gap-[1rem] lg:gap-[2rem]">
              <Input inputType="textfield" />
              <AddCategoryDropdown onSelect={handleCategorySelect} />
            </div>
            <div className="mt-[1rem]">
              <AddImageBox />
            </div>
          </div>
          <TextBox maxLength={500} />
          <BasicButton label="추가하기" onClick={handleAddProduct} className="my-[4rem]" />
        </form>
      </div>
    </ModalWrapper>
  );
}
