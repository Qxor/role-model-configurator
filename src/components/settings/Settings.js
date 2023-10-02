import _ from "lodash";

import AttributeList from "../attribute_list/AttributeList";
import ActionList from "../action_list/ActionList";
import ResourceList from "../resource_list/ResourceList";
import { useEffect, useState } from "react";

export default function Settings({
  model,
  selectedItem,
  onSelectedItemChange,
  onChangeAuthorityObject,
}) {
  const [settings, setSettings] = useState(selectedItem);

  useEffect(() => {
    setSettings(selectedItem);
  }, [selectedItem]);

  if (Object.keys(selectedItem).length === 0 || Object.keys(settings).length === 0) {
    return <></>;
  }

  const resources = model.map((item) => ({
    type: item.type,
    description: item.description,
  }));

  const actions = _.find(
    model,
    (item) => item.type === settings.resourceType
  ).actions;

  const attributes = _.find(
    model,
    (item) => item.type === settings.resourceType
  ).attributes;

  const operations = _.find(
    model,
    (item) => item.type === settings.resourceType
  ).operations;

  function handleEditButtonClick() {
    const { editMode, ...attributes } = settings;
    const updated = { ...attributes, editMode: true };
    
    onSelectedItemChange(updated);
  }

  function handleSaveButtonClick() {
    const { editMode, ...attributes } = settings;
    const updated = { ...attributes, editMode: false };

    onSelectedItemChange(updated);
    onChangeAuthorityObject(updated);
  }

  function handleChangeSettings(newSettings) {
    setSettings(newSettings);
  }

  function handleChangeName(e) {
    const { name, ...attributes } = settings;
    setSettings({ ...attributes, name: e.target.value });
  }

  function handleChangeSettingsResourceType(type) {
    const reseted = {...settings}
    reseted.actions = []
    reseted.attributes = []

    const { resourceType, ...attributes } = reseted
    setSettings({ ...attributes, resourceType: type });
  }

  const button = settings.editMode ? (
    <button
      onClick={handleSaveButtonClick}
      className="m-2 py-1 px-4 bg-gray-200"
    >
      Сохранить
    </button>
  ) : (
    <button
      onClick={handleEditButtonClick}
      className="m-2 py-1 px-4 bg-gray-200"
    >
      Редактировать
    </button>
  );

  return (
    <div className="w-2/3 min-w-max">
      <div className="flex flex-column justify-end">{button}</div>
      <div>
        <div className="flex flex-row m-4">
          <label className="block w-24 p-2">Имя</label>
          <input
            type="text"
            disabled={!settings.editMode}
            value={settings.name.length > 30 ? `${settings.name.substring(0, 30)}...` : settings.name}
            title={settings.name}
            onChange={handleChangeName}
            className="w-80 mx-2 p-2 border border-slate-300"
          />
        </div>
        <ResourceList
          settings={settings}
          resources={resources}
          onChangeSettings={handleChangeSettings}
          onChangeSettingsResourceType={handleChangeSettingsResourceType}
        />
        <ActionList
          settings={settings}
          actions={actions}
          onChangeSettings={handleChangeSettings}
        />
      </div>
      <AttributeList
        settings={settings}
        attributes={attributes}
        operations={operations}
        onChangeSettings={handleChangeSettings}
      />
    </div>
  );
}
