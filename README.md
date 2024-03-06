# Task Manager

#### Использованные технологии
- **Vue.js**
- **Vuex в режиме strict**
- **Vue-router для маршрутизации**
- **JSON-server и axios для эмуляци REST API**

#### Запуск проекта 
Для запуска в системе должны быть установлены следующие инструменты:
- **Node.js**
- **JSON-server** (глобально установленный)
- 
Сайт Node.js : https://nodejs.org/en

Для установки json-server используем команду в командной строке:

`npm install -g json-server`

В папке с файлом находится файл **start.bat**, который запускает JSON-сервер и сам проект

Либо же установить все необходимые зависимости в директории с помощью:

`npm install`

И запустить в одном терминале json-server:

`json-server --watch ./src/data.json`

В другом запустить клиент:

`npm run dev`

По результату должно отобразиться приложение:
![image](https://github.com/matzutake/taskManager/assets/65808708/2165eb4c-98f4-41a9-9329-bfef8480379c)
