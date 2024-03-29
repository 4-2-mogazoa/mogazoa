import { ChangeEvent,useEffect, useState } from "react";

import { getProductNames } from "@/apis/products";
import BasicButton from "@/components/common/button/BasicButton";
import AddImageBox from "@/components/common/inputs/AddImageBox";
import AddCategoryDropdown from "@/components/home/AddCategoryDropdown";

type AddProductModalProps = {
  closeModal: () => void;
	defaultValue?: string;
}

export default function AddProductModal ({ closeModal, defaultValue }: AddProductModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productImageUrl, setProductImageUrl] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productNameError, setProductNameError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [textAreaError, setTextAreaError] = useState<string>("");
  const [existingProductName, setExistingProductName] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const [count, setCount] = useState(
		defaultValue ? String(defaultValue).length : 0,
	);

	const handleOnTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCount(e.target.value.length);
	};

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    if (inputName.length <= 20) {
      setProductName(inputName);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setProductImageUrl(imageUrl);
  }

  useEffect(() => {
    const getProductName = async () => {
      try {
        const response = await getProductNames();
        setExistingProductName(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching product names: ", error);
      }
    };

    getProductName();
  }, []);

  const handleProductNameBlur = () => {
    if (!productName.trim()) {
      setProductNameError("상품 이름은 필수 입력입니다.");
    } else if (existingProductName.includes(productName)) {
      setProductNameError("이미 등록된 상품입니다.");
    } else {
      setProductNameError("");
    }
  };

  const handleTextareaBlur = () => {
    setIsFocused(false);
    if (count < 10) {
      setTextAreaError("최소 10자 이상 적어주세요.");
    } else {
      setTextAreaError("");
    }
  };

  const handleSubmitError = () => {
    if(!selectedCategory.trim()) {
      setCategoryError("카테고리를 선택해주세요.");
      setImageError("");
    } else if (!productImageUrl) {
      setImageError("대표 이미지를 추가해주세요.");
      setCategoryError("");
    } else {
      setCategoryError("");
      setImageError("");
    }
  }

  return (
    <div className="w-[100%] px-[4rem] md:w-[59rem] lg:w-[62rem]">
      <h2 className="text-[2.4rem] font-semibold text-white">상품 추가</h2>
      <div className="flex flex-col gap-[2rem]">
        <div className="flex w-[100%] flex-row justify-between">
          <div className="mr-[2rem] flex w-[100%] flex-col md:m-0 md:w-[36rem] md:gap-[1rem] lg:gap-[2rem]">
            <input value={productName} onChange={handleProductNameChange} onBlur={handleProductNameBlur} placeholder="상품명 (상품 등록 여부를 확인해주세요)" className="mt-[1rem] h-[5.5rem] w-full rounded-xl border border-[#353542] bg-[#252530] px-[2rem] py-[2.3rem] text-[1.4rem] text-white outline-none focus:border-main_blue" />
            {productNameError && <p className="text-[1.3rem] text-red">{productNameError}</p>}
            <AddCategoryDropdown onSelect={handleCategorySelect} />
            {categoryError && <p className="text-[1.3rem] text-red">{categoryError}</p>}
          </div>
          <div className="mt-[1rem]">
            <AddImageBox onImageSelect={handleImageSelect} />
          </div>
        </div>
        <div
					className={`min-h-[8.8rem] rounded-xl border ${isFocused ? "border-main_blue" : "border-[#353542]"} bg-[#252530] p-[2rem]`}
				>
					<textarea
						className="w-full resize-none overflow-hidden border-none bg-[#252530] text-[1.4rem] text-white placeholder:text-[1.4rem] placeholder:text-gray-200 focus:outline-none lg:text-[1.6rem] lg:placeholder:text-[1.6rem]"
						rows={3}
            onFocus={() => setIsFocused(true)}
            onBlur={handleTextareaBlur}
            maxLength={500}
            defaultValue={defaultValue}
            onChange={handleOnTextarea}
					/>
					<p className="text-right text-[1.4rem] text-[#6E6E82]">
          <span>{count}</span>
          <span>/500</span>
					</p>
				</div>
        {textAreaError && <p className="text-[1.3rem] text-red">{textAreaError}</p>}
        {imageError && <p className="text-[1.3rem] text-red">{imageError}</p>}
        <BasicButton label="추가하기" className="my-[4rem]" onClick={handleSubmitError} />
      </div>
    </div>
  );
}
