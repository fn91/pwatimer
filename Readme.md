# ⏱ TimerPWA – Progressive Web App de Temporizador

**TimerPWA** es una aplicación web progresiva (PWA) tipo Pomodoro que funciona incluso sin conexión, gracias a su implementación con **Service Workers** y almacenamiento en caché.  
Está desarrollada con **JavaScript ES Modules**, **Lit**, **Sass** y empaquetada con **Webpack**.

---

## 🚀 Características

- **Temporizador configurable** estilo Pomodoro.
- **Soporte offline** gracias a Service Workers.
- **Instalable** en dispositivos móviles y escritorio.
- **Responsive** y optimizada para pantallas pequeñas.
- **Carga rápida** mediante caché estática y dinámica.
- **Diseño moderno** usando SCSS y Web Components.

---

## 📦 Requisitos previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

---

## ⚙️ Instalación y ejecución

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/usuario/timerpwa.git
   cd timerpwa
Instala las dependencias:

bash
Copiar
Editar
npm install
Compila y levanta un servidor local:

Modo desarrollo:

bash
Copiar
Editar
npm run build:dev
npm start

"scripts": {
    "build": "webpack --mode production",
    "build:dev": "webpack --mode development",
    "start": "http-server -c-1 dist"
  },