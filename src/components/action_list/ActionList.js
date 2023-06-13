import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function ActionList({ settings, actions, onChangeSettings }) {
  const [selectedActions, setSelectedActions] = useState([]);

  useEffect(() => {
    if (!settings.actions) {
      return () => {};
    }

    setSelectedActions([...settings.actions]);
  }, [settings]);

  function handleChangeAction(e) {
    const { actions, ...attributes } = settings;

    if (e.target.checked) {
      actions.push(e.target.id);
      onChangeSettings({ ...attributes, actions });
    } else {
      onChangeSettings({
        ...attributes,
        actions: actions.filter((action) => action !== e.target.id),
      });
    }
  }

  const actionList = actions.map((action) => (
    <div key={uuid()} className="flex flex-row">
      <input
        id={action.name}
        disabled={!settings.editMode}
        type="checkbox"
        defaultChecked={selectedActions.includes(action.name)}
        onChange={handleChangeAction}
        className="block mx-2 scale-125"
      />
      <label disabled={!settings.editMode} className="block mx-1 p-2 w-60">
        {action.description}
      </label>
    </div>
  ));

  return (
    <div className="flex flex-row mx-4">
      <label className="block w-24 p-2">Операции</label>
      <div className="pt-0.5">{actionList}</div>
    </div>
  );
}
