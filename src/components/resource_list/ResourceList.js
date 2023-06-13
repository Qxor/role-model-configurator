import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function ResourceList({
  settings,
  resources,
  onChangeSettingsResourceType,
}) {
  const [selectedResourceType, setSelectedResourceType] = useState("");

  useEffect(() => {
    setSelectedResourceType(settings.resourceType);
  }, [settings]);

  function handleChangeResource(type) {
    const approve = window.confirm(
      "При изменении Ресурса введённые настройки сбросятся. Продолжить?"
    );

    if (!approve) {
      setSelectedResourceType(selectedResourceType);
      return;
    }

    onChangeSettingsResourceType(type);
  }

  const resourceList = resources.map((resource) => (
    <option key={uuid()} value={resource.type}>
      {resource.description}
    </option>
  ));

  return (
    <div className="flex flex-row m-4">
      <label className="block w-24 p-2">Ресурс</label>
      <select
        key={uuid()}
        disabled={!settings.editMode}
        value={selectedResourceType}
        onChange={(e) => handleChangeResource(e.target.value)}
        className="w-80 mx-2 p-2 border border-slate-300"
      >
        {resourceList}
      </select>
    </div>
  );
}
