import { v4 as uuid } from "uuid";
import { saveAs } from "file-saver";

import Icon from "../icon/Icon";
import { useState } from "react";

export default function FileController({
  onUploadAuthorutyObjectsModel,
  onUploadAuthorityObjects,
  activeMode,
  model,
  authorityObjects,
}) {
  const [authorityObjectsModelUploaded, setauthorityObjectsModelUploaded] =
    useState(model.length > 0);

  async function handleUploadAuthorityObjectModelFile() {
    const options = {
      types: [
        {
          accept: {
            "application/json": [".json"],
          },
        },
      ],
      multiple: false,
    };

    try {
      const [fileHandle] = await window.showOpenFilePicker(options);
      const file = await fileHandle.getFile();

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          try {
            const config = JSON.parse(reader.result);
            onUploadAuthorutyObjectsModel([...config]);
            setauthorityObjectsModelUploaded(true);
          } catch (e) {
            alert(
              `Ошибка в структуре файла. Объекты должны содержаться в массиве.`
            );
          }
        },
        false
      );

      if (file) {
        reader.readAsText(file);
      }
    } catch (e) {
      if (e instanceof DOMException) {
      }
    }
  }

  async function handleUploadAuthObjectsArrayFile() {
    if (authorityObjects.length > 0) {
      const approve = window.confirm('Объекты уже загружены. Загрузка новых может привести к потере данных. Продолжить?')
      if (!approve) {
        return
      }
    }

    const options = {
      types: [
        {
          accept: {
            "application/json": [".json"],
          },
        },
      ],
      multiple: false,
    };

    try {
      const [fileHandle] = await window.showOpenFilePicker(options);
      const file = await fileHandle.getFile();

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          const config = JSON.parse(reader.result);

          if (config.type === "PermissionObjects") {
            let i = 0;
            const items = config.items.map((item) => {
              i += 1;
              return { ...item, id: i, editMode: false };
            });

            onUploadAuthorityObjects(items);
          } else {
            alert("Тип конфигурации должен быть PermissionObjects");
          }
        },
        false
      );

      if (file) {
        reader.readAsText(file);
      }
    } catch (e) {
      if (e instanceof DOMException) {
      }
    }
  }

  function handleDownloadAuthObjectsArrayFile() {
    let data;
    if (authorityObjects.length === 0) {
      data = []
    } else {
      data = authorityObjects.map((authorityObject) => {
        const { id, editMode, ...other } = authorityObject;
        return other;
      });
    }

    const json = JSON.stringify({
      version: 1,
      type: "PermissionObjects",
      items: data,
    });

    const file = new Blob([json], { type: "application/json;charset=utf-8" });

    saveAs(file, "authorityObjects.json");
  }

  const authorityObjectsMenuItems = (
    <>
      <li
        key={uuid()}
        onClick={handleUploadAuthorityObjectModelFile}
        className="p-2 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
      >
        Загрузить модель
      </li>
      <li
        key={uuid()}
        onClick={handleUploadAuthObjectsArrayFile}
        className="p-2 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
      >
        Загрузить объекты
      </li>
      <li
        key={uuid()}
        onClick={handleDownloadAuthObjectsArrayFile}
        className="p-2 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer"
      >
        Скачать объекты
      </li>
    </>
  );

  const authorityObjectsTooltip = [
    !authorityObjectsModelUploaded && "Загрузите модель",
  ]
    .filter((el) => el)
    .join("\n");

  const authorityObjectsIconCheck = authorityObjectsModelUploaded;

  const iconCheckers = {
    authorityObjects: authorityObjectsIconCheck,
    roles: true,
    mapping: true,
  };

  const tooltips = {
    authorityObjects: authorityObjectsTooltip,
  };

  const menuItems = {
    authorityObjects: authorityObjectsMenuItems,
  };

  return (
    <div className="flex flex-row items-center">
      {iconCheckers[activeMode] ? (
        <></>
      ) : (
        <Icon type="alert" tooltip={tooltips[activeMode]} size="s" />
      )}
      <div className="dropdown relative">
        <div className="px-5 py-3 text-2xl hover:bg-gray-300 hover:cursor-pointer">
          ≡
        </div>
        <ul className="dropdown-content hidden absolute w-60 right-0">
          {menuItems[activeMode]}
        </ul>
      </div>
    </div>
  );
}
