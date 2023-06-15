# Model.json

```JSON
[
  {
    "type": "EamNotification",
    "description": "Сообщение",
    "actions": [
      { "name": "create", "description": "Создание" },
      { "name": "read", "description": "Чтение" },
      {
        "name": "update",
        "description": "Редактирование"
      }
    ],
    "operations": [
      {
        "name": "in",
        "description": "входит в"
      },
      {
        "name": "equal",
        "description": "равно"
      }
    ],
    "attributes": [
      {
        "name": "Type.Code",
        "description": "Код вида сообщения"
      },
      {
        "name": "Status.Name",
        "description": "Статус"
      },
      {
        "name": "Plant.Code",
        "description": "Код завода"
      },
      {
        "name": "Department.Code",
        "description": "Код цеха"
      },
      {
        "name": "PlantUnit.Code",
        "description": "Код участка/установки"
      },
      {
        "name": "PlannerGroup.Code",
        "description": "Код службы"
      }
    ]
  },
  {
    "type": "EamWorkOrder",
    "description": "Заказ",
    "actions": [
      { "name": "create", "description": "Создание" },
      { "name": "read", "description": "Чтение" },
      {
        "name": "update",
        "description": "Редактирование"
      }
    ],
    "operations": [
      {
        "name": "in",
        "description": "входит в"
      },
      {
        "name": "equal",
        "description": "равно"
      }
    ],
    "attributes": [
      {
        "name": "Type.Name",
        "description": "Вид заказа"
      },
      {
        "name": "Status.Name",
        "description": "Статус"
      },
      {
        "name": "Plant.Code",
        "description": "Код завода"
      },
      {
        "name": "Department.Code",
        "description": "Код цеха"
      },
      {
        "name": "PlantUnit.Code",
        "description": "Код участка/установки"
      },
      {
        "name": "PlannerGroup.Code",
        "description": "Код службы"
      }
    ]
  },
  {
    "type": "EamTechnicalObject",
    "description": "Технический объект",
    "actions": [{ "name": "read", "description": "Чтение" }],
    "operations": [
      {
        "name": "in",
        "description": "входит в"
      },
      {
        "name": "equal",
        "description": "равно"
      }
    ],
    "attributes": [
      {
        "name": "Plant.Code",
        "description": "Код завода"
      },
      {
        "name": "Department.Code",
        "description": "Код цеха"
      },
      {
        "name": "PlantUnit.Code",
        "description": "Код участка/установки"
      },
      {
        "name": "PlannerGroup.Code",
        "description": "Код службы"
      }
    ]
  },
  {
    "type": "EamNotificationStatus",
    "description": "Изменение статуса Сообщения",
    "actions": [
      {
        "name": "update",
        "description": "Изменение статуса"
      }
    ],
    "operations": [
      {
        "name": "in",
        "description": "входит в"
      },
      {
        "name": "equal",
        "description": "равно"
      }
    ],
    "attributes": [
      {
        "name": "Status",
        "description": "Текущий статус"
      },
      {
        "name": "NewStatus",
        "description": "Новый статус"
      },
      {
        "name": "Type.Code",
        "description": "Код вида сообщения"
      },
      {
        "name": "Status.Name",
        "description": "Статус"
      },
      {
        "name": "Plant.Code",
        "description": "Код завода"
      },
      {
        "name": "Department.Code",
        "description": "Код цеха"
      },
      {
        "name": "PlantUnit.Code",
        "description": "Код участка/установки"
      },
      {
        "name": "PlannerGroup.Code",
        "description": "Код службы"
      }
    ]
  },
  {
    "type": "EamWorkOrderStatus",
    "description": "Изменение статуса Заказа",
    "actions": [
      {
        "name": "update",
        "description": "Изменение статуса"
      }
    ],
    "operations": [
      {
        "name": "in",
        "description": "входит в"
      },
      {
        "name": "equal",
        "description": "равно"
      }
    ],
    "attributes": [
      {
        "name": "Status",
        "description": "Текущий статус"
      },
      {
        "name": "NewStatus",
        "description": "Новый статус"
      },
      {
        "name": "Type.Name",
        "description": "Вид заказа"
      },
      {
        "name": "Status.Name",
        "description": "Статус"
      },
      {
        "name": "Plant.Code",
        "description": "Код завода"
      },
      {
        "name": "Department.Code",
        "description": "Код цеха"
      },
      {
        "name": "PlantUnit.Code",
        "description": "Код участка/установки"
      },
      {
        "name": "PlannerGroup.Code",
        "description": "Код службы"
      }
    ]
  }
]

```