import { ChangeEvent,useEffect, useState } from "react";

import { getCategories } from "@/apis/categories";
import { getProductNames, postProducts } from "@/apis/products";
import BasicButton from "@/components/common/button/BasicButton";
import AddImageBox from "@/components/common/inputs/AddImageBox";
import AddCategoryDropdown from "@/components/home/AddCategoryDropdown";

import ProductDropdown from "./productDropdown";

type Item = {
  id: number;
  name: string;
};

type AddProductModalProps = {
  type: 'add' | 'rewrite';
  closeModal?: () => void;
	defaultValue?: string;
}

export default function AddProductModal ({ type, closeModal, defaultValue }: AddProductModalProps) {
  const [category, setCategory] = useState<Item[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [productImageUrl, setProductImageUrl] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productNameError, setProductNameError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [textAreaError, setTextAreaError] = useState<string>("");
  const [existingProductName, setExistingProductName] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [options, setOptions] = useState<string[]>(existingProductName);
  const [count, setCount] = useState(defaultValue ? String(defaultValue).length : 0,);

  /* textArea 글자수 세기 */
	const handleOnTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setCount(e.target.value.length);
    if (count >= 10) {
      setTextAreaError("");
    }
	};

  /* 선택한 카테고리 정보 */
  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryId);
    setCategoryError("");
  };

  /* 상품명 */
  const handleProductNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value;
    if (inputName.length <= 20) {
      setProductName(inputName);
      const filteredOptions = existingProductName.filter(ele => ele.includes(inputName));
      setOptions(filteredOptions);
    } else {
      setProductName(inputName);
    }
  };

  /* 이미지 등록 */
  const handleImageSelect = (imageUrl: string) => {
    setProductImageUrl(imageUrl);
    setImageError("");
  }

  /* 상품명 중복 확인 및 자동완성을 위한 getProductName */
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

  /* 상품명 자동완성에 보여줄 드롭다운 옵션 */
  useEffect(() => {
    if(productName === '') {
      setOptions([]);
    } else {
      setOptions(existingProductName.filter((ele) => ele.includes(productName)));
    }
  }, []);

  /* 상품명 인풋 블러 */
  const handleProductNameBlur = () => {
    if (!productName.trim()) {
      setProductNameError("상품 이름은 필수 입력입니다.");
    } else if (existingProductName.includes(productName)) {
      setProductNameError("이미 등록된 상품입니다.");
    } else {
      setProductNameError("");
    }
  };

  /* 텍스트 인풋 블러 */
  const handleTextareaBlur = () => {
    setIsFocused(false);
    if (count < 10) {
      setTextAreaError("최소 10자 이상 적어주세요.");
    } else {
      setTextAreaError("");
    }
  };

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

  const handleSubmitError = () => {
    if(!selectedCategory.trim()) {
      setCategoryError("카테고리를 선택해주세요.");
    } else if (!productImageUrl) {
      setImageError("대표 이미지를 추가해주세요.");
    }
  }

  const handleDropDownClick = (value: string) => {
    setProductName(value);
    setOptions([]);
  };

  useEffect(() => {
    if(productName && count > 0) {
      setIsButtonDisabled(false);
    }
  }, [productName, count]);

  return (
    <div className="w-[100%] px-[4rem] md:w-[59rem] lg:w-[62rem]">
      <h2 className="text-[2.4rem] font-semibold text-white">{type === 'add' ? '상품 추가' : '상품 편집'}</h2>
      <div className="relative flex flex-col gap-[3rem]">
        <div className="flex w-[100%] flex-row justify-between">
          <div className="mr-[2rem] flex w-[100%] flex-col md:m-0 md:w-[36rem] md:gap-[1rem] lg:gap-[3rem]">
            <div className="relative">
              <input
                value={productName}
                onChange={handleProductNameChange}
                onBlur={handleProductNameBlur}
                placeholder="상품명 (상품 등록 여부를 확인해주세요)"
                className="mt-[1rem] h-[6.5rem] w-full rounded-xl border border-[#353542] bg-[#252530] px-[2rem] py-[2.3rem] text-[1.4rem] text-white outline-none focus:border-main_blue"
              />
              <ProductDropdown
                options={options}
                handleDropDownClick={handleDropDownClick}
              />
            </div>
            {productNameError && <p className="absolute top-[8rem] text-[1.3rem] text-red">{productNameError}</p>}
            <AddCategoryDropdown onSelect={handleCategorySelect} items={items} />
            {categoryError && <p className="absolute top-[17.5rem] text-[1.3rem] text-red">{categoryError}</p>}
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
            placeholder="상품 설명을 입력해주세요."
					/>
					<p className="text-right text-[1.4rem] text-[#6E6E82]">
          <span>{count}</span>
          <span>/500</span>
					</p>
				</div>
        {textAreaError && <p className="absolute top-[35rem] text-[1.3rem] text-red">{textAreaError}</p>}
        {imageError && <p className="absolute top-[37rem] text-[1.3rem] text-red">{imageError}</p>}
        <BasicButton label="추가하기" className="my-[4rem]" onClick={handleSubmitError} disabled={isButtonDisabled} />
      </div>
    </div>
  );
}
