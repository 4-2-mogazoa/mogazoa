import { useRouter } from "next/router";
import { useEffect } from "react";

import useTrapFocus from '@/hooks/common/useTrapFocus';

type LoginModalProps = {
  closeModal: () => void;
}

export default function LoginModal({ closeModal }: LoginModalProps) {
  const router = useRouter();
  const { focusableElements } = useTrapFocus();

  const handleButtonClick = () => {
    router.push('/signin');
    closeModal();
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Enter') {
        handleButtonClick();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    focusableElements.current = Array.from(document.querySelectorAll('button'));
  });

  return (
    <div className="w-[100%] px-[3rem] text-white md:w-[40rem]">
      <h2 className="mb-[1rem] text-2xl md:mb-[2rem] md:text-[2rem]">로그인이 필요한 서비스입니다.</h2>
      <p className="mb-[2rem] text-xl md:mb-[3rem] md:text-[1.5rem]">로그인 하시겠습니까?</p>
      <button
        type="button"
        onClick={handleButtonClick}
        className="h-[3rem] w-[100%] rounded-[5rem] bg-main_indigo text-xl md:h-[5rem] md:text-[1.5rem]"
        ref={(button) => { if (button) focusableElements.current.push(button); }}
      >
        로그인
      </button>
    </div>
  );
};
