import { useState } from "react";
import { v4 as uuid } from "uuid";

const DEFAULT_OPERATION = "in";

export default function Attribute({
  name,
  description,
  value,
  predicates,
  selectedPredicate,
  active,
  settings,
  onChangeActive,
  onChangePredicate,
  onChangeValue,
}) {
  const [input, setInput] = useState(value);

  return (
    <div className="flex flex-row p-2">
      <input
        name={name}
        disabled={!settings.editMode}
        type="checkbox"
        checked={active}
        onChange={(e) => onChangeActive(e, name, DEFAULT_OPERATION)}
        className="block mx-2 scale-125"
      />
      <label
        name={name}
        disabled={!settings.editMode}
        className="block mx-2 p-2 w-60 bg-slate-50"
      >
        {description}
      </label>
      <select
        disabled={active ? !settings.editMode : true}
        value={selectedPredicate}
        onChange={(e) => onChangePredicate(e, name)}
        className="block mx-2 p-2 border border-slate-300"
      >
        {predicates.map((predicate) => (
          <option key={uuid()} value={predicate.name}>
            {predicate.description}
          </option>
        ))}
      </select>
      <input
        disabled={active ? !settings.editMode : true}
        type="text"
        value={input}
        title={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={(e) => onChangeValue(e, name)}
        className="block w-96 mx-2 p-2 border border-slate-300"
      />
    </div>
  );
}
