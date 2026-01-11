<p align="center"> 
  
# Hi there 👋

![Meyland's GitHub stats](https://github-readme-stats.vercel.app/api?username=MeylandMan&locale=en&hide_title=false&show_icons=true&theme=onedark)
![languages graph](https://github-readme-stats.vercel.app/api/top-langs/?username=MeylandMan&locale=en&hide_border=false&hide_title=false&show_icons=true&theme=onedark\&layout=compact&langs_count=6)

# Skills
</br>

## PROFICIENT
  ---
![Visual studio](https://github.com/MeylandMan/photos/blob/main/Visual_Studio.png)
![Github](https://github.com/MeylandMan/photos/blob/main/GitHUB.png)
![Premake](https://github.com/MeylandMan/photos/blob/main/premake5.png)
![Cmake](https://github.com/MeylandMan/photos/blob/main/Cmake.png)
![Gamemaker](https://github.com/MeylandMan/photos/blob/main/gamemaker.png)
</br>

## EXPERIENCED
  ---
![Windows OS](https://github.com/MeylandMan/photos/blob/main/windows.png)
![Java](https://github.com/MeylandMan/photos/blob/main/Java.png)
![OpenGL](https://github.com/MeylandMan/photos/blob/main/opengl.png)
![Visual Studio Code](https://github.com/MeylandMan/photos/blob/main/VSCode.png)
![IntelliJ Idea IDE](https://github.com/MeylandMan/photos/blob/main/IntelliJ.png)
</br>
  
## ENTRY-LEVEL
---
![C#](https://github.com/MeylandMan/photos/blob/main/cs.png)
![Godot](https://github.com/MeylandMan/photos/blob/main/godot.png)
![C++](https://github.com/MeylandMan/photos/blob/main/Cpp.png)
![Vite](https://github.com/MeylandMan/photos/blob/main/vite.svg)
![Vitest](https://github.com/MeylandMan/photos/blob/main/vitest.svg)
![TailwindCSS](https://github.com/MeylandMan/photos/blob/main/tailwindCSS.png)
![React](https://github.com/MeylandMan/photos/blob/main/react.svg)
![MongoDB](https://github.com/MeylandMan/photos/blob/main/mangodb.svg)
</p>

</br>
## Development

- Start the backend API server (uses Node + Express):

```bash
# copy .env.example to .env and fill in credentials
cp .env.example .env
# then:
npm run start:server
```

- In a separate terminal start the Vite dev server:

```bash
npm run dev
```

The Vite dev server proxies requests starting with `/api` to `http://localhost:3000` by default, so client code can `fetch('/api/leftNavLinks')` and the request will be forwarded to the backend. The dedicated `GET /api/leftNavLinks` endpoint will return the documents in your `leftNavLinks` collection from the `main-portofolio` database.