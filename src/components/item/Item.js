import Icon from "../icon/Icon";

export default function Item({
  item,
  selectedItem,
  onSelectItem,
  onRemoveItem,
}) {
  function handleItemRemove() {
    const approve = window.confirm("Удалить?");

    if (!approve) {
      return;
    }

    onSelectItem({});
    onRemoveItem(item.id);
  }

  return (
    <div
      className={`flex flex-row items-center justify-between cursor-pointer hover:bg-gray-300 ${
        selectedItem.id === item.id && "bg-gray-400"
      }`}
    >
      <div
        title={item.name}
        onClick={() => {
          onSelectItem({ ...item });
        }}
        className="mx-1 p-2 w-11/12"
      >
        {item.name.length > 34 ? `${item.name.substring(0, 34)}...` : item.name}
      </div>
      <div onClick={handleItemRemove} className="py-2 px-3">
        <Icon type="bin" size="xs" />
      </div>
    </div>
  );
}
