import { useLayoutEffect, useEffect, useState } from "react";
import _ from "lodash";

import Navigation from "./components/navigation/Navigation";
import FileController from "./components/file_controller/FileController";
import FilterableItemList from "./components/filterable_item_list/FilterableItemList";
import Settings from "./components/settings/Settings";

const modes = [
  {
    name: "authorityObjects",
    description: "объекты полномочий",
  },
  {
    name: "roles",
    description: "роли",
  },
  {
    name: "mapping",
    description: "маппинг",
  },
];

export default function App() {
  const [activeMode, setActiveMode] = useState(modes[0].name);
  const [authorityObjectsModel, setAuthorityObjectsModel] = useState(readAuthorityObjectsModelFromLocalStorage());
  const [authorityObjects, setAuthorityObjects] = useState(readAuthorityObjectsFromLocalStorage());
  const [selectedItem, setSelectedItem] = useState({});

  function readAuthorityObjectsModelFromLocalStorage() {
    const authorityObjectsModelStorageData = localStorage.getItem("authorityObjectsModel")
    const result = authorityObjectsModelStorageData ? JSON.parse(authorityObjectsModelStorageData) : []
    return result
  }

  function readAuthorityObjectsFromLocalStorage() {
    const authorityObjectsStorageData = localStorage.getItem("authorityObjects")
    const result = authorityObjectsStorageData ? JSON.parse(authorityObjectsStorageData) : []
    return result
  }

  useEffect(() => {
    const data = JSON.stringify(authorityObjectsModel)
    localStorage.setItem("authorityObjectsModel", data)
  }, [authorityObjectsModel])

  useEffect(() => {
    const data = JSON.stringify(authorityObjects)
    localStorage.setItem("authorityObjects", data)
  }, [authorityObjects])

  const models = {
    authorityObjects: authorityObjectsModel,
    roles: [],
    mapping: [],
  };

  const itemLists = {
    authorityObjects: authorityObjects,
    roles: [],
    mapping: [],
  };

  function handeModeSelect(mode) {
    setSelectedItem({});
    setActiveMode(mode);
  }

  function handleAuthorityObjectAdd() {
    const sorted = _.sortBy(authorityObjects, ["id"]);
    const { id } = _.last(sorted);
    setAuthorityObjects([
      {
        id: id + 1,
        editMode: false,
        name: `Объект полномочий ${id}`,
        resourceType: "EamTechnicalObject",
        actions: [],
        attributes: [],
      },
      ...authorityObjects,
    ]);
  }

  function handleAuthorityObjectRemove(id) {
    const newList = authorityObjects.filter(
      (authorityObject) => authorityObject.id !== id
    );

    setAuthorityObjects([...newList]);
  }

  function handleItemSelect(item) {
    if (selectedItem.editMode) {
      const approve = window.confirm('Несохранённые изменния будут потеряны. Продолжить?')

      if (approve) {
        setSelectedItem(item);
      }
    } else {
      setSelectedItem(item);
    }
  }

  function handleSelectedItemChange(item) {
    setSelectedItem(item);
  }

  function handleAuthorityObjectChange(itemSettings) {
    const index = _.findIndex(authorityObjects, ["id", itemSettings.id])
    const newList = authorityObjects.filter(
      (authorityObject) => authorityObject.id !== itemSettings.id
    );

    const head = _.slice(newList, 0, index)
    const tail = _.slice(newList, index)

    setAuthorityObjects([...head, itemSettings, ...tail]);
  }

  function handlehandleAuthorityObjectsUpload(items) {
    setSelectedItem({})
    setAuthorityObjects(items)
  }

  return (
    <div className="h-full">
      <header className="flex flex-row items-center justify-between header-height bg-gray-200">
        <Navigation
          onSelectMode={handeModeSelect}
          modes={modes}
          activeMode={activeMode}
        />
        <FileController
          onUploadAuthorutyObjectsModel={setAuthorityObjectsModel}
          onUploadAuthorityObjects={handlehandleAuthorityObjectsUpload}
          activeMode={activeMode}
          model={models[activeMode]}
          authorityObjects={authorityObjects}
        />
      </header>
      <div className="flex flex-row justify-between w-full body-height">
        <FilterableItemList
          model={models[activeMode]}
          itemList={itemLists[activeMode]}
          selectedItem={selectedItem}
          onSelectItem={handleItemSelect}
          onRemoveItem={handleAuthorityObjectRemove}
          onAddItem={handleAuthorityObjectAdd}
        />
        <Settings
          model={models[activeMode]}
          selectedItem={selectedItem}
          onSelectedItemChange={handleSelectedItemChange}
          onChangeAuthorityObject={handleAuthorityObjectChange}
        />
      </div>
    </div>
  );
}
