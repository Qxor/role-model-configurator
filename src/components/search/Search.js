import Icon from "../icon/Icon";

export default function Search({ filterText, onFilterTextChange }) {
  return (
    <div className="flex flex-row items-center w-full search-height bg-white">
      <input
        type="text"
        value={filterText}
        placeholder="Поиск..."
        onChange={(e) => onFilterTextChange(e.target.value)}
        className="p-2 w-full"
      />
      <div className="py-2 px-3 cursor-pointer">
        <Icon type="search" tooltip="Найти" size="xs" />
      </div>
    </div>
  );
}
