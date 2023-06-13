import { v4 as uuid } from "uuid";

export default function Navigation({ modes, onSelectMode, activeMode }) {

  const navigationElements = modes.map((mode) => (
    <li
      key={uuid()}
      onClick={() => onSelectMode(`${mode.name}`)}
      className={`p-4 text-base font-bold uppercase hover:bg-gray-300 hover:cursor-pointer ${mode.name === activeMode && 'bg-gray-400'}`}
    >{`${mode.description}`}</li>
  ));

  return (
    <nav>
      <ul className="flex flex-row">{navigationElements}</ul>
    </nav>
  );
}