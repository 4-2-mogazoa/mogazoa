import Link from "next/link";
import { KeyboardEventHandler } from "react";

import ModalWrapper from "@/components/common/modal/ModalWrapper";

type LoginModalProps = {
  onClose: () => void;
};

export default function LoginModal({ onClose }:LoginModalProps) {
  /* 수정 필요 */
const handleKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
  if (e.key === "Enter") {
    window.location.href = '/signin';
    e.preventDefault();
  } else {
    console.log('non modal required');
  }
};

return (
  <ModalWrapper
    id="login-modal"
    onRemove={onClose}
    config={{ isCloseClickOutside: true, isCloseESC: true }}
  >
    <div className="w-[100%] px-[3rem] text-white md:w-[40rem]">
      <h2 className="mb-[1rem] text-2xl md:mb-[2rem] md:text-[2rem]">로그인이 필요한 서비스입니다.</h2>
      <p className="mb-[2rem] text-xl md:mb-[3rem] md:text-[1.5rem]">로그인 하시겠습니까?</p>
      <Link href='/signin'><button type="button" onKeyDown={handleKeyDown} tabIndex={0} className="h-[3rem] w-[100%] rounded-[5rem] bg-main_indigo text-xl md:h-[5rem] md:text-[1.5rem]">로그인</button></Link>
    </div>
  </ModalWrapper>
);
};
