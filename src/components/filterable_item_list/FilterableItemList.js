import Search from "../search/Search";
import ItemList from "../item_list/ItemList";
import { useState } from "react";

export default function FilterableItemList({
  model,
  itemList,
  selectedItem,
  onSelectItem,
  onRemoveItem,
  onAddItem,
}) {
  const [filterText, setFilterText] = useState('');

  const active = model.length > 0

  return (
    <div className="filterable-item-list-height w-1/3 p-2 pl-4 bg-gray-50">
      <Search filterText={filterText} onFilterTextChange={setFilterText}/>
      <button onClick={onAddItem} disabled={!active} title={!active ? 'Загрузите модель' : ''} className={`my-2 py-1 px-4 ${active ? 'bg-gray-200' : 'bg-gray-100'} `}>+</button>
      <ItemList
        items={itemList}
        selectedItem={selectedItem}
        filterText={filterText}
        onSelectItem={onSelectItem}
        onRemoveItem={onRemoveItem}
      />
    </div>
  );
}
