type productDropdownProps = {
  options: string[];
  handleDropDownClick?: (productName: string) => void;
}

export default function ProductDropdown ({ options, handleDropDownClick }: productDropdownProps) {
  return (
    <ul>
      {options.map((value: any, index: number) => {
        return (
          <li key={index} onClick={() => handleDropDownClick && handleDropDownClick(value)}>
            <button className="w-full rounded-[0.6rem] px-[0.5rem] py-[0.6rem] text-left text-gray-200 hover:bg-[#353542] hover:text-white md:px-[2rem]">
              <span>{value}</span>
            </button>
          </li>
        )
      })}
    </ul>
  );
}
