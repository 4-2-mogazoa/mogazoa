import { ChangeEvent, useEffect, useState } from 'react';

import { getCategories } from '@/apis/categories';
import { getProductDetail, getProductsName, patchProduct, postProducts } from '@/apis/products';
import BasicButton from '@/components/common/button/BasicButton';
import AddCategoryDropdown from '@/components/common/dropdown/product/AddCategoryDropdown';
import ProductDropdown from '@/components/common/dropdown/product/productDropdown';
import ProductImageInput from '@/components/common/inputs/product/ProductImageInput';

type ProductModalProps = {
  type: 'add' | 'edit';
  productId?: number;
  closeModal: () => void;
};

export default function ProductModal({ type, productId, closeModal }: ProductModalProps) {
  const [categoryId, setCategoryId] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [existingProductName, setExistingProductName] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>(existingProductName);
  const [isFocused, setIsFocused] = useState(false);
  const [count, setCount] = useState(description ? String(description).length : 0);
  const [nameError, setNameError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [imageError, setImageError] = useState<string>("");
  const [textareaError, setTextareaError] = useState<string>("");
  const [productDetail, setProductDetail] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const products = await getProductsName();
        const productsName = products.map((product) => product.name);
        setExistingProductName(productsName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (type === 'edit' && productId) {
      const fetchProductDetail = async () => {
        try {
          const fetchedProductDetail = await getProductDetail(productId);
          setProductDetail(fetchedProductDetail);
          setCount(String(fetchedProductDetail.description).length);
          setCategoryId(fetchedProductDetail.category.id);
          setDescription(fetchedProductDetail.description);
          setName(fetchedProductDetail.name);
          if (fetchedProductDetail.image !== "") {
            setImageUrl(fetchedProductDetail.image);
          }
        } catch (error) {
          console.error('Error fetching product detail:', error);
        }
      };

      fetchProductDetail();
    }
  }, [type, productId]);

  useEffect(() => {
    if (name && count >= 10) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [name, count]);

  const handleNameInputBlur = () => {
    if (name === "") {
      setNameError("상품 이름은 필수 입력입니다.");
    } else if (existingProductName.includes(name) && (type === 'add' || (type === 'edit' && name !== productDetail.name))) {
      setNameError("이미 등록된 상품입니다.");
    } else {
      setNameError("");
    }
  };

  const handleOnName = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setName(inputValue);

    if (inputValue === "") {
      setOptions([]);
    } else {
      setOptions(existingProductName.filter((ele) => ele.includes(inputValue)));
    }

    if (inputValue === "") {
      setNameError("상품 이름은 필수 입력입니다.");
    } else {
      setNameError("");
    }
  };

  const handleDropDownClick = (value: string) => {
    setName(value);
    if (existingProductName.includes(value) && (type === 'add' || (type === 'edit' && name !== productDetail.name))) {
      setNameError("이미 등록된 상품입니다.");
    } else {
      setNameError("");
    }
    setOptions([]);
  };

  const handleSubmit = () => {
    if (categoryId === 0) {
      setCategoryError("카테고리를 선택해주세요.");
    } else {
      setCategoryError("");
      if (imageUrl === "") {
        setImageError("대표 이미지를 추가해주세요.");
      } else {
        setImageError("");
        if (!nameError && !categoryError && !textareaError && !imageError) {
          if (type === 'add') {
            postProducts(categoryId, imageUrl, description, name)
              .then(() => {
                alert("상품이 등록되었습니다.");
              })
              .catch((error) => {
                alert("상품을 등록하는 데 실패하였습니다: " + error.message);
              });
          } else if (type === 'edit' && productId) {
            patchProduct(productId, categoryId, imageUrl, description, name)
            .then(() => {
              alert("상품이 수정되었습니다.");
            })
            .catch((error) => {
              alert("상품을 수정하는 데 실패하였습니다: " + error.message);
            });
          }
          closeModal();
        }
      }
    }
  };

  const handleOnTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCount(e.target.value.length);
    setDescription(e.target.value);
    if (1<= e.target.value.length && e.target.value.length < 10) {
      setTextareaError("최소 10자 이상 적어주세요.");
    } else {
      setTextareaError("");
    }
  };

  const handleTextareaBlur = () => {
    setIsFocused(false);
    if (1 <= count && count < 10) {
      setTextareaError("최소 10자 이상 적어주세요.");
    } else if (count === 0) {
      setTextareaError("상품 설명은 필수 입력입니다.");
    }
  };

  return (
    <div className="w-[100%] px-[4rem] md:w-[59rem] lg:w-[62rem]">
      <h2 className="text-[2.4rem] font-semibold text-white">{type === 'add' ? '상품 추가' : '상품 편집'}</h2>
      <div className="relative flex flex-col gap-[3rem]">
        <div className="flex w-[100%] flex-row justify-between">
          <div className="mr-[2rem] flex w-[100%] flex-col md:m-0 md:w-[36rem] md:gap-[1rem] lg:gap-[3rem]">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={name}
                onBlur={handleNameInputBlur}
                onChange={handleOnName}
                required
                placeholder="상품명 (상품 등록 여부를 확인해주세요)"
                className="mt-[1rem] h-[6.5rem] w-full rounded-xl border border-[#353542] bg-[#252530] px-[2rem] py-[2.3rem] text-[1.4rem] text-white outline-none focus:border-main_blue"
              />
              <ProductDropdown options={options} handleDropDownClick={handleDropDownClick} productDetailName={productDetail?.name} />
              {nameError && <p className="absolute top-[8rem] text-[1.3rem] text-red">{nameError}</p>}
            </div>
            <div>
              <AddCategoryDropdown items={categories} value={categoryId} onSelect={setCategoryId} categoryId={type === 'edit' ? categoryId : undefined} />
              {categoryError && <p className="absolute top-[17.5rem] text-[1.3rem] text-red">{categoryError}</p>}
            </div>
          </div>
          <div className="mt-[1rem]">
            {type === 'add' ? (
              <ProductImageInput type='add' setImageUrlProp={setImageUrl} imageUrl='' />
            ) : (
              <ProductImageInput type='edit' setImageUrlProp={setImageUrl} imageUrl={imageUrl} />
            )}
          </div>
        </div>
        <div
          className={`min-h-[8.8rem] rounded-xl border ${isFocused ? "border-main_blue" : "border-[#353542]"} bg-[#252530] p-[2rem]`}
        >
          <textarea
            value={description}
            className="w-full resize-none overflow-hidden border-none bg-[#252530] text-[1.4rem] text-white placeholder:text-[1.4rem] placeholder:text-gray-200 focus:border-main_blue focus:outline-none lg:text-[1.6rem] lg:placeholder:text-[1.6rem]"
            rows={3}
            onFocus={() => setIsFocused(true)}
            onBlur={handleTextareaBlur}
            maxLength={500}
            onChange={handleOnTextarea}
            placeholder="상품 설명을 입력해주세요."
          />
          <p className="text-right text-[1.4rem] text-[#6E6E82]">
            <span>{count}</span>
            <span>/500</span>
          </p>
        </div>
        {textareaError && <p className="absolute top-[35rem] text-[1.3rem] text-red">{textareaError}</p>}
        {imageError && <p className="absolute top-[37rem] text-[1.3rem] text-red">{imageError}</p>}
        <BasicButton
          label={type === 'add' ? "추가하기" : "저장하기"}
          className="my-[4rem]"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
}
