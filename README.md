# 🌐 Portafolio Web Personal – Vue 3 + Firebase + GitHub API

Este es un portafolio personal desarrollado con **Vue 3**, **Pinia**, **Vue Router** y **Vuetify**. El sitio permite mostrar tus proyectos automáticamente desde GitHub y editar el contenido de forma dinámica desde la UI, usando autenticación con **Firebase** y su Realtime Database.

## ✨ Características

- Desarrollado con **Vue 3 (Composition API)**
- Manejo de estado global con **Pinia**
- Estilo y componentes con **Vuetify**
- Ruteo con **Vue Router**
- Integración con la **API pública de GitHub** para mostrar tus repositorios
- **Autenticación con Firebase** (Email/Password)
- Edición en tiempo real del contenido del portafolio desde la interfaz (si estás autenticado)
- Datos almacenados en **Firebase Realtime Database**

---

## 🚀 Demo en vivo

👉 [https://myportfolio.mezadev.com](https://myportfolio.mezadev.com)

---

## 🛠️ Tecnologías utilizadas

- Vue 3 + Vite
- Pinia
- Vue Router
- Vuetify
- Firebase Auth
- Firebase Realtime Database
- GitHub REST API

---

## 📦 Instalación

1. **Clona este repositorio:**

```bash
git clone https://github.com/FranciscoMezaVe/My-Portfolio-Web.git
cd tu-repo
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura tus variables de entorno:**

Crea un archivo `.env` en la raíz del proyecto y agrega tus propias credenciales de Firebase, así como tu nombre de usuario de GitHub.  
Puedes basarte en el archivo `.env.example` incluido.

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_DATABASE_URL=tu_database_url
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_GITHUB_USERNAME=tu_usuario_de_github
VITE_LINKEDIN_URL = url_linkedin
VITE_EMAIL = tu_email
```

> ⚠️ Este archivo **no debe subirse** al repositorio por seguridad. Se encuentra en `.gitignore` por defecto.

4. **Levanta el entorno de desarrollo:**

```bash
npm run dev
```

---

## 🧪 ¿Cómo personalizarlo?

1. Crea tu usuario via email desde la consola de firebase, la pagina no cuenta con registro debido a que solo tu usuario deberia entrar
2. Autentícate desde la interfaz usando el formulario de login.
3. Si tu usuario está autorizado, verás una sección de edición.
4. Puedes modificar tu nombre, descripción, skills, enlaces, etc. desde la UI. Los cambios se guardan automáticamente en Firebase.
5. Tus proyectos se mostrarán automáticamente desde tu cuenta de GitHub por medio de su API Rest.
6. Tu LinkedIn tendra acessos directos con el url de configuraste previamente

> El login, tendras que acceder manualmente el la barra de navegacion con /login debido a que no se implementa en el menu de navegacion porque el uso debera ser exclusivo del administrador.

---

## 🔐 Seguridad

- Las credenciales están gestionadas a través de variables de entorno.
- La base de datos está protegida con reglas de Firebase.
- La edición del contenido solo está disponible para usuarios autenticados.

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE). Puedes usarlo, modificarlo y adaptarlo a tus necesidades.

---

## 🙌 Créditos

Desarrollado con 💙 por [FranciscoMezaVe](https://github.com/FranciscoMezaVe)

¿Te gustó el proyecto? ¡Dale una estrella ⭐ en GitHub o compártelo!

---
