# **Frontend de la API de SaludConnect**

## **Descripción**

**¡Bienvenido a HealthConnect!**

Imagina una experiencia digital fluida, intuitiva y accesible, donde cada interacción con tu médico esté a solo un clic de distancia. El frontend de SaludConnect ha sido diseñado con el usuario en mente, para que tanto pacientes como profesionales de la salud puedan navegar fácilmente por la plataforma y acceder a las herramientas que necesitan.

Nuestro equipo ha creado una interfaz clara y eficiente que permite a los pacientes describir sus síntomas, subir imágenes o documentos, y recibir respuestas en tiempo real. Todo con la simplicidad que ofrece una experiencia de usuario amigable, desde cualquier dispositivo y lugar.

Para los profesionales de la salud, el frontend ofrece un panel interactivo y optimizado, donde pueden gestionar consultas, revisar información médica y responder de manera ágil y profesional. Todo con un diseño que prioriza la usabilidad, la rapidez y la accesibilidad.

SaludConnect no solo es una plataforma robusta en el backend, sino también una experiencia visual y funcional en el frontend, donde la tecnología se convierte en el aliado ideal para una atención médica de calidad.



# 1. Instalación

**Requisitos previos:** Para que el frontend funcione correctamente, debemos asegurarnos de que el backend esté operativo

    https://github.com/DenisseBabio/PFB-Citas-M-dicas.git


## **1. Clonar el repositorio:**

Para comenzar, debes clonar el repositorio del proyecto en tu máquina local utilizando el siguiente comando:

    git clone https://github.com/DenisseBabio/PFB-Front-CitasMedicas.git

## **2. Navegar al directorio del proyecto:**

    cd PFB-Front-CitasMedicas.git

## **3. Instalar dependencias:**

    npm install

## **4. Iniciar el proyecto en Desarrollo**

    npm run dev

## **5. Construir para producción**

    npm run build 

##
# 2. Uso de la aplicación y características

## **2.1. Autenticación de Usuarios:**

El sistema de autenticación implementado en la aplicación está basado en tokens, lo que permite una gestión segura y eficiente de las sesiones de usuario. Este enfoque asegura que las credenciales del usuario no se transmitan en cada solicitud, y en su lugar se utilice un token único para verificar la identidad de los usuarios en cada interacción con el servidor.

### **· Registro e Inicio de Sesión:**
- **Registro:** Tanto médicos como pacientes pueden registrarse proporcionando su información básica. Los nuevos usuarios reciben un token de autenticación si el registro es exitoso, que se almacena en el almacenamiento local del navegador. Se necesita un código de validación para registrarse como médico.

- **Validación de correo electrónico por email:** Después del registro, el usuario debe validar su dirección de correo electrónico a través de un enlace enviado automáticamente a su correo. El acceso completo a la aplicación no es posible hasta que el correo ha sido validado.

- **Inicio de Sesión:** Los usuarios existentes pueden autenticarse proporcionando su correo electrónico y contraseña. Al validar las credenciales, el servidor genera un token JWT, que es enviado de vuelta al cliente y almacenado localmente. Este token permite que el usuario permanezca autenticado a lo largo de la sesión sin necesidad de volver a ingresar sus credenciales en cada interacción con la aplicación.


### **· Manejo del Estado de Autenticación:**
La aplicación utiliza un contexto global de autenticación para gestionar y mantener el estado de los usuarios en toda la aplicación, facilitando el acceso a información relacionada con la autenticación y el token en cualquier parte de la aplicación.

- **Contexto de autenticación:** Este componente de React envuelve a toda la aplicación y proporciona acceso al contexto de autenticación. Cada componente hijo puede acceder al estado del usuario autenticado (si el usuario está logueado, el token, entre otros datos). Esto elimina la necesidad de pasar información de autenticación entre componentes individuales y asegura una fácil gestión del estado global.

- **Protección de Rutas:** Las rutas dentro de la aplicación que requieren que el usuario esté autenticado están protegidas mediante un middleware que revisa si el token de autenticación está presente y es válido. Si el usuario no está autenticado, será redirigido a la página de inicio de sesión.

### **· Almacenamiento y Gestión de Tokens**
El token JWT generado al momento del registro o inicio de sesión se almacena el token. Almacenar el token en el navegador permite a la aplicación:

- **Persistencia de Sesiones:** El token JWT generado al iniciar sesión se almacena localmente, lo que permite al usuario permanecer autenticado entre sesiones, siempre que el token siga siendo válido.

- **Acceso a Funcionalidades Protegidas:** El token se incluye en el encabezado de las solicitudes HTTP a las rutas protegidas del servidor. Esto asegura que solo los usuarios autenticados puedan realizar acciones como crear, editar o cancelar citas médicas.

- **Manejo de Sesiones Expiradas:** Los tokens tienen una fecha de expiración. Cuando el token expira, el sistema invalidará el acceso del usuario a las rutas protegidas y lo redirigirá al inicio de sesión.

### **· Cierre de Sesión**
- Al cerrar sesión, el token de autenticación es removido y el estado de autenticación en el contexto se restablece. Esto asegura que las rutas protegidas ya no sean accesibles, y el usuario sea redirigido al formulario de inicio de sesión o a otra página pública.

### **· Manejo de Sesiones Expiradas**
- Los tokens de autenticación tienen un tiempo de expiración por seguridad. Cuando el token expira, el sistema invalidará el acceso del usuario a las rutas protegidas y lo redirigirá al inicio de sesión para obtener un nuevo token. Esto garantiza que las sesiones no queden abiertas indefinidamente.

##


# **2.2 Gestión de citas médicas:**

La aplicación permite a los usuarios autenticados gestionar sus citas médicas de manera sencilla e intuitiva, facilitando la creación, edición y cancelación de citas a través de una interfaz clara y accesible. Esta funcionalidad está diseñada para asegurar que los usuarios tengan control total sobre su agenda de citas, ofreciendo un sistema eficiente para la planificación de sus consultas médicas.



## **Funciones Principales**

**- Creación de Citas Médicas:** 
- Los usuarios pacientes pueden programar citas proporcionando detalles clave como fecha, hora y motivo de la consulta. Los pacientes también pueden optar por crear citas sin seleccionar un médico específico, y serán los médicos disponibles los que se asignen esas consultas sin asignar.

- Los usuarios médicos tienen la capacidad de revisar y aceptar o rechazar citas programadas por los pacientes.

- Para iniciar la programación, es necesario seleccionar una especialidad, tras lo cual se mostrarán los médicos disponibles para dicha especialidad.


 **- Edición de Citas Médicas:** Si un usuario necesita modificar una cita ya programada, tiene la opción de editar los detalles de la misma. Esto incluye la capacidad de, cambiar el motivo de la cita o realizar otras modificaciones que se adapten a las nuevas circunstancias del usuario.

**- Gestión Completa de Citas:** Los usuarios pueden ver un listado de todas sus citas, filtradas por fecha o estado (pendientes, realizadas, canceladas, etc.). Desde esta vista, los usuarios pueden seleccionar una cita específica para editarla(si está pendiente. Si está cancelada o completada no se puede editar. Tampoco si faltan menos de 48h para la hora de la cita).



## **Formularios Intuitivos**

El proceso de creación y edición de citas se realiza a través de formularios diseñados de forma intuitiva, con campos claramente definidos y accesibles:

**- Selección de Fecha y Hora:** Los usuarios pueden seleccionar la fecha y la hora de su cita mediante componentes visuales de selección de fecha y hora.

Estos formularios están optimizados para minimizar los errores en la selección de horarios y fechas no válidas.

**- Detalles Adicionales:** Además de la fecha y la hora, los usuarios pueden proporcionar información adicional sobre la cita, como el motivo de la consulta, el tipo de cita (virtual o presencial), y otros detalles relevantes.

**- Validación de Datos:** Los formularios incluyen validación en tiempo real para asegurar que la información proporcionada sea válida antes de permitir la creación o edición de la cita. Esto reduce la probabilidad de errores como seleccionar fechas en el pasado o ingresar datos incompletos.

Se valida que la fecha y la hora seleccionadas sean correctas, y que no se programen citas en el pasado.

## **Protección de Rutas**
Las funcionalidades relacionadas con la gestión de citas médicas están protegidas por un sistema de autenticación. Solo los usuarios autenticados pueden acceder a estas rutas y realizar operaciones de gestión de citas.


**- Rutas Protegidas:** Los endpoints que permiten la creación, edición, eliminación y visualización de citas están resguardados por la autenticación basada en tokens. Si el usuario no ha iniciado sesión, no puede acceder a estas funcionalidades y es redirigido a la página de inicio de sesión.

**- Verificación del Estado del Usuario:** Antes de permitir el acceso a estas rutas, la aplicación verifica si el usuario tiene un token de autenticación válido almacenado en el navegador. En caso contrario, el acceso es bloqueado y se le solicita al usuario autenticarse nuevamente.


##

### **2.3. Recuperación y restablecimiento de contraseña:**
La aplicación ofrece un mecanismo seguro y eficiente para la recuperación y restablecimiento de contraseñas, brindando a los usuarios una manera sencilla de recuperar el acceso a su cuenta en caso de olvidar sus credenciales. Este proceso asegura la protección de los datos del usuario mediante validaciones estrictas y el uso de correos electrónicos para verificar la identidad.

**· Funcionalidades Principales:**
- **Solicitud de Recuperación de Contraseña:** Si un usuario ha olvidado su contraseña, puede iniciar el proceso de recuperación desde la pantalla de inicio de sesión. Ingresando su dirección de correo electrónico registrada, el sistema genera y envía un enlace único para restablecer la contraseña. Este enlace tiene un tiempo de expiración limitado para garantizar la seguridad del proceso.

- **Envío de Correo Electrónico de Recuperación:** La aplicación utiliza un sistema de envío automático de correos electrónicos, el cual está integrado con el servicio de autenticación. Al solicitar la recuperación, el usuario recibe un correo con un enlace seguro y único, que lo dirige a la página de restablecimiento de contraseña. Este enlace contiene un token de validación que asegura que solo el titular de la cuenta pueda cambiar la contraseña.

- **Página de Restablecimiento de Contraseña:** Una vez que el usuario hace clic en el enlace del correo de recuperación, es redirigido a una página segura donde podrá introducir una nueva contraseña. El formulario de restablecimiento valida que la contraseña cumpla con los requisitos mínimos de seguridad (por ejemplo, longitud mínima, combinación de caracteres especiales, números, etc.).

- **Confirmación de cambio de contraseña** Una vez completado el proceso, el usuario recibe una confirmación por correo de que su contraseña ha sido actualizada exitosamente.


**· Validación de Seguridad en el Proceso**
- **Enlace de Recuperación Segura:** El enlace enviado por correo incluye un token temporal que expira después de un período determinado. Esto evita el uso indebido de enlaces antiguos y protege la cuenta del usuario. Si el enlace ha expirado o ha sido utilizado previamente, el usuario deberá solicitar un nuevo correo de recuperación.

- **Validación de Identidad:** Antes de permitir el restablecimiento de la contraseña, la aplicación verifica la validez del token y del enlace recibido en el correo electrónico. Solo si el token es válido y no ha expirado, se permite el acceso a la página de restablecimiento de contraseña.

- **Confirmación de Cambio de Contraseña:** Después de completar el proceso de restablecimiento, el usuario recibe una confirmación por correo electrónico indicando que su contraseña ha sido actualizada con éxito. Esto también funciona como una alerta en caso de que el usuario no haya solicitado el cambio, permitiéndole tomar medidas inmediatas si sospecha de un acceso no autorizado.

**· Validación de Correo Electrónico**
- Además del proceso de recuperación de contraseñas, la aplicación implementa una capa adicional de seguridad al validar los correos electrónicos registrados durante el proceso de registro y recuperación:

- **Verificación de Correo Electrónico:** Antes de que un usuario pueda iniciar sesión por primera vez o utilizar ciertas funciones de la aplicación, es necesario que valide su correo electrónico. La aplicación envía un correo con un enlace de verificación que, al ser clicado, confirma la validez de la dirección de correo registrada.

- **Protección contra Accesos No Autorizados:** Si un correo electrónico no ha sido validado, la cuenta del usuario permanece inactiva hasta que se complete el proceso de verificación. Esto protege tanto el acceso a la cuenta como la gestión de las citas y otros datos sensibles.


##


### **2.4. Validación de correo electrónico:**

En nuestra aplicación, después de que un usuario se registre, ya sea como médico o paciente, se implementa un sistema de validación de correo electrónico para garantizar la autenticidad de la cuenta. Este proceso sigue estos pasos:

**· Registro de Usuario:**

- Al completar el formulario de registro, el usuario proporciona su dirección de correo electrónico, junto con otros datos relevantes como nombre de usuario, contraseña, y, en el caso de los médicos, un código de médico.
La información se envía al servidor para su procesamiento.
Generación de Enlace de Verificación:

- Una vez registrado, el servidor genera un enlace de verificación único y lo envía al correo electrónico del usuario.
Este enlace contiene un token único que vincula al usuario con la solicitud de verificación.
Envío de Correo Electrónico:

- El servidor envía un correo electrónico al usuario con el enlace de verificación. Este correo puede incluir instrucciones sobre cómo completar la verificación de la cuenta.
Proceso de Verificación:

- Cuando el usuario hace clic en el enlace de verificación, se le redirige a una página específica de la aplicación.
La aplicación procesa el token del enlace para verificar la autenticidad del correo electrónico y activar la cuenta del usuario en el sistema.


**· Acceso Completo a la Aplicación:**

- Solo después de que el correo electrónico ha sido validado, el usuario podrá acceder completamente a las funcionalidades de la aplicación.
- Para los médicos, esto incluye la capacidad de gestionar consultas, mientras que los pacientes pueden acceder a sus citas y otros servicios pertinentes.
Navegación SPA (Single Page Application):

- La aplicación está diseñada como una SPA, lo que significa que la navegación entre las diferentes páginas de la aplicación se maneja sin recargar la página completa.

- Al hacer clic en enlaces internos o navegar entre secciones (como registro, inicio de sesión, recuperación de contraseña, etc.), la aplicación carga y muestra el contenido dinámicamente sin interrumpir la experiencia del usuario.
Gestión de Estados y Rutas:

- La navegación se gestiona utilizando React Router DOM para definir rutas específicas para cada funcionalidad (inicio de sesión, registro, validación de correo electrónico, etc.).
El estado de autenticación del usuario se gestiona a través del contexto de autenticación, proporcionando una experiencia fluida y consistente en toda la aplicación.
Interacción con el Usuario:

- Los usuarios son guiados a través del proceso de validación y navegación con mensajes claros y visualmente atractivos, mejorando la experiencia general y la usabilidad de la aplicación.
Este enfoque asegura que solo los usuarios con correos electrónicos válidos puedan acceder a las funciones de la aplicación, protegiendo así la integridad del sistema y ofreciendo una experiencia de usuario fluida e intuitiva.


### **2.5. Navegación SPA (Single Page Application):**

La aplicación está diseñada como una SPA (Single Page Application) para ofrecer una navegación fluida y sin recargas de página. Utiliza React Router DOM para gestionar las rutas y los componentes asociados a cada ruta.

**Navegación y Rutas:**

- React Router DOM maneja la navegación entre diferentes secciones de la aplicación (inicio de sesión, registro, perfil, etc.) sin necesidad de recargar la página.
Se definen rutas específicas para cada tipo de usuario, ya sea médico o paciente, permitiendo un acceso fácil y rápido a las páginas relevantes según el rol del usuario.

**Navegación Programática:**

- El hook useNavigate permite redirigir a los usuarios a diferentes secciones de la aplicación de manera programática, como después de iniciar sesión o completar un registro.

**Protección de Rutas:**
- Se implementa un sistema de protección de rutas para asegurar que solo los usuarios autenticados puedan acceder a ciertas secciones. Esto incluye redirigir a los usuarios no autenticados a la página de inicio de sesión si intentan acceder a áreas restringidas.

**Manejo de Errores:**
- La aplicación incluye una página de error personalizada para manejar rutas no encontradas y garantizar que los usuarios reciban una retroalimentación adecuada si intentan acceder a páginas inexistentes.

**Usuarios:**
- Tanto médicos como pacientes tienen rutas y componentes específicos adaptados a sus necesidades y permisos, asegurando una experiencia de usuario coherente y eficiente para ambos tipos de usuarios.


### **2.6. Manejo de errores:**
La aplicación gestiona los errores de navegación de manera eficiente:

Redirección a Error 404: Los usuarios son redirigidos automáticamente a una página de Error 404 si intentan acceder a rutas no válidas o inexistentes. Esta redirección se aplica a todos los tipos de usuario, ya sean médicos o pacientes, asegurando que todos reciban una retroalimentación adecuada cuando intentan acceder a una página que no existe.


## **3. Tecnologías Utilizadas**
- **React:**
    - Biblioteca principal para la creación de la interfaz de usuario y la gestión del estado de la aplicación.

- **Vite:**
    - Herramienta de construcción rápida para el desarrollo de aplicaciones React, proporcionando un entorno de desarrollo eficiente con recarga en caliente.

- **Tailwind CSS:**
    - Framework de CSS para la creación rápida de estilos personalizados y responsivos mediante clases utilitarias.

- **ESLint y Prettier:**
    - Herramientas para el análisis estático y formateo del código. ESLint ayuda a identificar y corregir problemas en el código, mientras que Prettier asegura un formato consistente en todo el proyecto.

- **Context API:**
    - Utilizada para el manejo global del estado de autenticación de usuarios, permitiendo compartir el estado de autenticación (como información del usuario) a través de los diferentes componentes de la aplicación sin necesidad de prop drilling.

- **React Router DOM:**
    - Biblioteca para la gestión de rutas en una aplicación SPA (Single Page Application), permitiendo una navegación fluida entre las diferentes páginas sin recargar la página.

- **PostCSS y Tailwind CSS Plugin:**
    - Herramientas para procesar y optimizar los estilos CSS. PostCSS permite la integración de Tailwind CSS y Autoprefixer, asegurando compatibilidad con diferentes navegadores mediante el uso de prefijos.

- **Babel:**
    - Compilador de JavaScript que permite el uso de características modernas de ECMAScript en entornos que pueden no soportarlas nativamente.

- **Git:**
    - Sistema de control de versiones utilizado para gestionar y seguir los cambios en el código fuente del proyecto.
