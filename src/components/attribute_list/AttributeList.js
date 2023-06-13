import { v4 as uuid } from "uuid";
import _ from "lodash";

import Attribute from "../attribute/Attribute";

export default function AttributeList({
  settings,
  attributes,
  operations,
  onChangeSettings,
}) {
  function handleChangeActive(e, name, operation) {
    const { attributes, ...other } = settings;

    if (e.target.checked) {
      console.log(attributes);
      const newAttributesList = [
        ...attributes,
        {
          name,
          values: [""],
          operation: operation,
        },
      ];
      console.log(newAttributesList);
      onChangeSettings({ ...other, attributes: newAttributesList });
    } else {
      onChangeSettings({
        ...other,
        attributes: attributes.filter(
          (attribute) => attribute.name !== e.target.name
        ),
      });
    }
  }

  function handleChangePredicate(e, name) {
    const { attributes, ...other } = settings;

    const attribute = _.find(attributes, (a) => a.name === name);
    attribute.operation = e.target.value;
    const newAttributeList = attributes.filter((a) => a.name !== name);

    onChangeSettings({
      ...other,
      attributes: [...newAttributeList, attribute],
    });
  }

  function handleChangeValue(e, name) {
    const { attributes, ...other } = settings;
    const attribute = _.find(attributes, (a) => a.name === name);
    const newValues = e.target.value.split(",").map((v) => v.trim());
    attribute.values = newValues;

    const newAttributeList = attributes.filter((a) => a.name !== name);

    onChangeSettings({
      ...other,
      attributes: [...newAttributeList, attribute],
    });
  }

  function valuesToText(attributeName) {
    const values = _.find(
      settings.attributes,
      (attribute) => attribute.name === attributeName
    ).values;
    return values.join(", ");
  }

  function findSelectedOperation(attributeName) {
    return _.find(
      settings.attributes,
      (attribute) => attribute.name === attributeName
    ).operation;
  }

  const checkedAttributesNames = settings.attributes.map(
    (attribute) => attribute.name
  );

  return (
    <div className="flex flex-col my-12 mx-4">
      {attributes.map((attribute) => {
        const includes = checkedAttributesNames.includes(attribute.name);

        return (
          <Attribute
            key={uuid()}
            name={attribute.name}
            description={attribute.description}
            value={includes ? valuesToText(attribute.name) : ""}
            predicates={operations}
            selectedPredicate={
              includes && findSelectedOperation(attribute.name)
            }
            active={includes}
            settings={settings}
            onChangeActive={handleChangeActive}
            onChangePredicate={handleChangePredicate}
            onChangeValue={handleChangeValue}
          />
        );
      })}
    </div>
  );
}
