import { v4 as uuid } from "uuid";
import _ from "lodash";

import Item from "../item/Item";

export default function ItemList({
  items,
  filterText,
  selectedItem,
  onSelectItem,
  onRemoveItem,
}) {
 
  if (items.length === 0) {
    return <></>;
  }
  
  const itemsList = items.reduce((acc, item) => {
    const newItem = (
      <Item
        key={uuid()}
        item={item}
        selectedItem={selectedItem}
        onSelectItem={onSelectItem}
        onRemoveItem={onRemoveItem}
      />
    );

    if (filterText === '') {
      return [...acc, newItem]
    }

    if (_.includes(item.name.toLowerCase(), filterText.toLowerCase())) {
      return [...acc, newItem]
    } else {
      return acc
    }
  }, []);

  return <div className="item-list-height overflow-auto">{itemsList}</div>;
}
