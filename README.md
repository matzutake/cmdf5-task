# Task Manager

#### Использованные технологии
- **Vue.js**
- **Vuex в режиме strict**
- **Vue-router для маршрутизации**
- **JSON-server и axios для эмуляци REST API**

#### Запуск проекта 
1. Установить **Node.js**
2. Установить **JSON-server** глобально: `npm install -g json-server` - для запуска сервера
3. Установить **concurrently** - для того чтобы запускать и сервер и клиент одной командой npm - `npm install -g concurrently`
4. Открыть проект и запустить команду `npm install`, которая установит все необходимые зависимости из package.json
5. Запустить проект командой `concurrently "npm run server" "npm run dev" `
5. Открыть сайт из консоли, или же просто вбить в строку http://localhost:8080

Result:
![image_2024-03-11_12-46-02 (2)](https://github.com/matzutake/taskManager/assets/65808708/4924f329-3a94-4d4b-96ad-ceaf2514b17e)
![image_2024-03-11_12-46-02](https://github.com/matzutake/taskManager/assets/65808708/2950b157-ed6a-43e8-ac3c-17813f77ba01)
