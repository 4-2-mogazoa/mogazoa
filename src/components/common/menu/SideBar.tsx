import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Category } from '@/types/common';

type SideBarProps = {
  user?: UserType;
  isSidebarOpen?: boolean;
  className?: string;
  onCategorySelect: (CategoryId: number | null, categoryName: string | null) => void;
};

type UserType = {
  id: number;
};

export const SideBar: React.FC<SideBarProps> = ({ user, isSidebarOpen, onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://mogazoa-api.vercel.app/4-2/categories');
        setCategories(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(`카테고리를 불러오는 데 실패하였습니다: ${error.response}`);
        }
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  onCategorySelect(categoryId === selectedCategory ? null : categoryId, categoryName);
  };

  return (
    <div className={clsx('flex flex-col gap-[2rem] bg-[#1c1c22] pt-[4.5rem] text-white', !isSidebarOpen ? 'hidden md:block' : 'block')}>
      <h2 className={'mb-[2rem] ml-[3rem] text-[1.4rem] font-normal lg:text-[1.6rem]'}>카테고리</h2>
      <div className={'mx-[1rem] flex w-[16rem] flex-col gap-[0.4rem] lg:w-[20rem]'}>
        <ul className='flex flex-col'>
          {categories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className={clsx('h-[4.5rem] w-[100%] cursor-pointer rounded-[0.8rem] px-[2rem] py-[1.5rem] text-[1.4rem] font-medium lg:h-[5rem] lg:text-[1.6rem]', selectedCategory === category.id ? 'bg-[#353542] text-white' : 'text-[#6e6e82]')}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={'ml-[1rem] flex w-[16rem] flex-col gap-[0.4rem] lg:w-[20rem]'}>
        <Link href='#' className={'h-[4.5rem] w-[100%] px-[2rem] py-[1.5rem] text-[1.4rem] font-medium lg:h-[5rem] lg:text-[1.6rem]'}>
          {user ? '비교하기' : '로그인'}
        </Link>
        <Link href='#' className={'mb-[4.5rem] h-[4.5rem] w-[100%] px-[2rem] py-[1.5rem] text-[1.4rem] font-medium lg:h-[5rem] lg:text-[1.6rem]'}>
          {user ? '내 프로필' : '회원가입'}
        </Link>
      </div>
    </div>
  );
};
