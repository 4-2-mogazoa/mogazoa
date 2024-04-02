import { useEffect,useMemo,useState } from 'react';

type ProductDropdownProps = {
  options: string[];
  productDetailName?: string;
  handleDropDownClick: (productName: string) => void;
};

export default function ProductDropdown({
  options,
  productDetailName,
  handleDropDownClick,
}: ProductDropdownProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowUp') {
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        }
      } else if (event.key === 'ArrowDown') {
        if (selectedIndex < options.length - 1) {
          setSelectedIndex(selectedIndex + 1);
        }
      } else if (event.key === 'Enter' && selectedIndex !== -1) {
        handleDropDownClick(options[selectedIndex]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex, options, handleDropDownClick]);

  const filteredOptions = useMemo(() => options.filter(option => option !== productDetailName), [options, productDetailName]);

  return (
    <ul className="absolute left-0 top-[8rem] z-10 w-full rounded-xl border-[#353542] bg-[#252530]">
      {filteredOptions.map((value: any, index: number) => {
        return (
          <li
            key={index}
            onClick={() => handleDropDownClick(value)}
            className={index === selectedIndex ? 'bg-[#353542] text-white' : ''}
          >
            <button
              className="w-full rounded-[0.6rem] px-[0.5rem] py-[1.5rem] text-left text-gray-200 hover:bg-[#353542] hover:text-white md:px-[2rem]"
            >
              <span className="text-[1.4rem] lg:text-[1.6rem]">{value}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
