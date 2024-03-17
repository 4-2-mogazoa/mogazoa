import Image from "next/image";

export default function FloatingPlus() {
  const plusSrc = '/icons/plus.svg';

  return (
    <div className="fixed right-[2rem] top-[71.2rem] size-[6rem] rounded-full bg-main-gradient p-[1rem] md:right-[3rem] md:top-[101.3rem] lg:bottom-[9rem] lg:right-[18rem]">
      <Image src={plusSrc} alt="추가 버튼" width={40} height={40} />
    </div>
  )
}
