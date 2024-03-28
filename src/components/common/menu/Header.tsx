import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { KeyboardEvent,useEffect, useState } from 'react';

import useWindowWidth from '@/hooks/common/useWindowWidth';

type UserType = {
	id: number;
};

type HeaderType = 'homeHeader' | "";

type HeaderProps = {
  user?: UserType;
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
  headerType?: HeaderType;
  onSearch?: (searchKeyword: string) => void;
};

export default function Header({ user, isSidebarOpen, toggleSidebar, headerType, onSearch }: HeaderProps) {
  const currentWidth = useWindowWidth();
  const router = useRouter();

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isLogoOverflow, setIsLogoOverflow] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  
  const hamburgerSrc = '/icons/hamburger.svg';
  const logoSrc = '/icons/logo.svg';
  const searchSrc = '/icons/search.svg';
  const closeSrc = '/icons/close.svg';

	const toggleSearch = () => {
		setSearchVisible(!isSearchVisible);
	};

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      handleSearch();
      router.push('/');
      router.push({ pathname: '/', query: { search: searchValue } });
    }
  };

  const handleSearch = () => {
    if(onSearch) {
      onSearch(searchValue);
      router.push('/');
      router.push({ pathname: '/', query: { search: searchValue } });
    }
  };

  useEffect(() => {
    setIsLogoOverflow(currentWidth < 430);
  }, [currentWidth])

  return (
    <>
    <div className='flex h-[7rem] w-[100%] flex-row justify-between border-b border-black-bg bg-[#1c1c22] align-middle md:h-[8rem] lg:h-[10rem]'>
      <Image
        src={(isSidebarOpen || isDropdownOpen) ? closeSrc : hamburgerSrc}
        alt='side menu toggle'
        width={24}
        height={24}
        onClick={headerType === 'homeHeader' ? toggleSidebar : toggleDropdown}
        className='ml-[2rem] block cursor-pointer md:hidden'
      />
      {!(isLogoOverflow && isSearchVisible) && (
        <Link
          href='/'
          className='relative my-auto h-[1.8rem] w-[11.2rem] md:ml-[3rem] md:h-[2.4rem] md:w-[13.8rem] lg:ml-[12rem] lg:h-[2.8rem] lg:w-[16.6rem]'>
          <Image src={logoSrc} alt='Logo' className='absolute inset-0 object-cover' width={500} height={500} />
        </Link>
      )}
      <div className='flex flex-row align-middle'>
        <div className='my-auto mr-[2rem] flex h-[4.8rem] w-fit max-w-[30rem] flex-row rounded-[2.8rem] bg-black-bg px-[1.5rem] py-[1.6rem] align-middle text-[1.4rem] text-gray-300 md:hidden'>
          <Image src={searchSrc} alt='Search' width={24} height={24} className='cursor-pointer' onClick={toggleSearch} />
          {isSearchVisible && (
            <input placeholder='상품 이름을 검색해 보세요' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyPress} className='ml-[1.5rem] w-[80%] bg-black-bg outline-none'/>
          )}
        </div>
        <div className='my-auto hidden w-[30rem] flex-row rounded-[2.8rem] bg-black-bg px-[2rem] py-[1.6rem] align-middle text-[1.4rem] text-gray-300 md:flex md:h-[5rem] lg:flex lg:h-[5.6rem]'>
          <Image src={searchSrc} alt='Search' width={24} height={24} />
          <input placeholder='상품 이름을 검색해 보세요' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onKeyDown={handleKeyPress} className='w-[80%] bg-black-bg outline-none md:ml-[1rem] lg:ml-[2rem]'/>
        </div>
        <div className='my-auto ml-[6rem] hidden font-normal text-white md:mr-[3rem] md:block md:text-[1.4rem] lg:mr-[12rem] lg:block lg:text-[1.6rem]'>
          <Link href={user ? '/compare' : '/signin'} className='min-w-[3.7rem] md:mr-[3rem] lg:mr-[6rem]'>
            {user ? '비교하기' : '로그인'}
          </Link>
          <Link href={user ? '/profile/my' : 'signup'} className='min-w-[4.9rem]'>
            {user ? '내 프로필' : '회원가입'}
          </Link>
        </div>
      </div>
    </div>
    {headerType !== 'homeHeader' && isDropdownOpen && (
        <div className='flex w-[100%] flex-col items-center gap-[2rem] pt-[3rem] text-[1.4rem] text-white md:hidden'>
          <Link href={user ? '/compare' : '/signin'} className='cursor-pointer'>
            {user ? '비교하기' : '로그인'}
          </Link>
          <Link href={user ? '/profile/my' : 'signup'} className='cursor-pointer'>
            {user ? '내 프로필' : '회원가입'}
          </Link>
        </div>
      )}
    </>
  );
}
