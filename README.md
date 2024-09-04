# **Frontend de la API de SaludConnect**

## **Descripción**

**¡Bienvenido a HealthConnect!**

Health Connect es una aplicación diseñada para facilitar la conexión entre pacientes y profesionales de la salud. El proyecto incluye una interfaz intuitiva para que los usuarios puedan registrarse, iniciar sesión, programar citas y consultar con especialistas de manera eficiente. 



## **Estructura de la Aplicación**
### **1. Pantalla de Bienvenida - Usuario no Registrado**
Esta es la pantalla principal que ven los usuarios que no están registrados. Incluye opciones para:

- **Registrarse:** Permite al usuario crear una nueva cuenta.

- **Consultar Especialidades y Doctores:** Ofrece un acceso directo para explorar los especialistas disponibles.

- **Iniciar Sesión:** Redirige a los usuarios registrados para que accedan a su cuenta.


### **2. Autenticación (Login y Registro)**
La sección de autenticación permite a los usuarios registrarse y acceder a sus cuentas. Incluye:

- **Pantalla de Inicio de Sesión:** Los usuarios pueden ingresar su correo electrónico o número de teléfono junto con su contraseña para acceder a su cuenta.

- **Pantalla de Configuración de Contraseña:** Permite a los usuarios establecer o restablecer su contraseña mediante un enlace enviado a su correo electrónico.

- **Pantalla de Registro:** Los nuevos usuarios pueden crear una cuenta proporcionando su correo electrónico, nombre de usuario, y contraseña. Los doctores deben ingresar un código especial para registrarse.


### **3. Pantalla Principal (Home)**
La pantalla principal varía dependiendo del tipo de usuario (paciente o doctor):

- **Para Pacientes:**
    · Visualización del historial de citas.
    · Opción para agregar nuevas citas, seleccionando la especialidad y el doctor de preferencia.

- **Para Doctores:**
    · Vista de las citas programadas.
    · Opciones para modificar la información del perfil como el correo electrónico, nombre de usuario, y contraseña.


### **4. Sección de Doctores**
Permite a los usuarios explorar a los doctores disponibles dentro de la aplicación. Aquí, los pacientes pueden buscar y seleccionar al doctor de su preferencia para programar citas.


##
## **Tecnologías Utilizadas**
- **Figma:** Utilizado para el diseño y prototipado de la interfaz de usuario.

- **HTML/CSS:** Estructura y estilos básicos de la aplicación.

- **JavaScript:** Funcionalidades interactivas y manejo de eventos.

- **React:** Librería para construir la interfaz de usuario.

- **API de Autenticación:** Para gestionar el login, registro y recuperación de contraseñas.


## **Instalación**

**1. Clonar el repositorio:**

    git clone https://github.com/DenisseBabio/PFB-Front-CitasMedicas.git

**2. Navegar al directorio del proyecto:**

    cd PFB-Front-CitasMedicas.git

**3. Instalar dependencias:**

    npm install

**4. Iniciar el proyecto en Desarrollo**

    npm start

**5. Construir para producción**

    npm run build


## **Próximos Pasos**
- **Implementación de Funcionalidades Avanzadas:** Mejorar la personalización del perfil del usuario y agregar recordatorios automáticos de citas.

- **Pruebas y Optimización:** Realizar pruebas de usabilidad y optimizar el rendimiento de la aplicación.

- **Despliegue:** Preparar la aplicación para su despliegue en un servidor de producción.



## **Licencia**

**© 2024 HACK A BOSS. Todos los derechos reservados.**