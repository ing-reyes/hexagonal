# Arquitectura Hexagonal con Typescript + NodeJS + Express

## Arquitectura hexagonal

La arquitectura hexagonal promueve la flexibilidad, la mantenibilidad y la capacidad de prueba del software al desacoplar la lógica de negocio de las dependencias externas. Esto permite:

- Cambiar las tecnologías externas sin afectar la lógica de negocio.
- Probar la lógica de negocio de forma aislada.
- Adaptar la aplicación a diferentes contextos y necesidades.

Es una arquitectura muy utilizada en el desarrollo de microservicios y en aplicaciones que requieren un alto grado de flexibilidad y capacidad de adaptación.


![Architecture Hexagonal](https://miro.medium.com/v2/resize:fit:720/format:webp/1*yR4C1B-YfMh5zqpbHzTyag.png)


```plaintext
src/
├── common/                  # Código compartido entre módulos
│   ├── config/              # Configuraciones globales
│   │   └── envs.config.ts   # Configuración de variables de entorno
│   ├── constants/           # Constantes globales
│   │   └── cors.ts          # Configuración de CORS
│   ├── dtos/                # DTOs compartidos
│   │   └── pagination/      # DTOs para paginación
│   │       └── pagination.dto.ts
│   ├── enums/               # Enumeraciones compartidas
│   │   └── http-status.enum.ts # Códigos de estado HTTP
│   └── errors/              # Manejo de errores centralizado
│       ├── handler.error.ts # Manejador de errores
│       └── manager.error.ts # Gestor de errores
├── users/                   # Módulo de usuarios
│   ├── application/         # Capa de aplicación (casos de uso)
│   │   ├── create-user.use-case.ts
│   │   ├── find-all-users.use-case.ts
│   │   └── find-one-user.use-case.ts
│   │   ├── update-user.use-case.ts
│   │   └── remove-user.use-case.ts
│   ├── domain/              # Capa de dominio
│   │   ├── datasources/     # Interfaces para fuentes de datos
│   │   │   └── users.datasource.ts
│   │   ├── dtos/            # DTOs específicos del dominio
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities/        # Entidades de dominio
│   │   │   └── user.entity.ts
│   │   ├── enums/           # Enumeraciones del dominio
│   │   │   └── user.role.ts
│   │   └── repositories/    # Interfaces de repositorios
│   │       └── users.repository.ts
│   └── infrastructure/      # Capa de infraestructura
│       ├── datasources/     # Implementaciones de fuentes de datos
│       │   └── users.datasource.impl.ts
│       ├── repositories/    # Implementaciones de repositorios
│       │   └── users.repository.impl.ts
│       └── presentation/    # Controladores y rutas
│           ├── users.routes.ts
│           └── users.controller.ts
├── main.ts                  # Punto de entrada de la aplicación
├── routes.ts                # Configuración de rutas principales
└── server.ts                # Configuración del servidor Express
```


## Principios solid


Los principios SOLID son un conjunto de cinco principios de diseño en la programación orientada a objetos (POO) que buscan crear software más comprensible, flexible y fácil de mantener. Cada letra del acrónimo SOLID representa un principio clave


![Solid Principles](https://miro.medium.com/v2/resize:fit:720/format:webp/1*aDsxDnXogDwWCpccSiHbcg.png)


## 🔷 Capas de la Arquitectura Hexagonal

### 1. 💎 Capa de Dominio (`domain/`)

La capa de dominio es el núcleo de la aplicación y contiene:

- **🏛️ Entidades (`entities/`)**: Representan los objetos de negocio principales con sus propiedades y comportamientos.
  - `user.entity.ts`: Define la estructura y comportamiento de un usuario en el sistema.

- **📦 DTOs de Dominio (`dtos/`)**: Objetos para transferir datos específicos del dominio.
  - `create-user.dto.ts`: Estructura para crear un nuevo usuario.
  - `update-user.dto.ts`: Estructura para actualizar un usuario existente.

- **🔤 Enumeraciones (`enums/`)**: Valores predefinidos específicos del dominio.
  - `user.role.ts`: Define los roles posibles para un usuario.

- **📚 Interfaces de Repositorios (`repositories/`)**: Definen cómo se accede a los datos.
  - `users.repository.ts`: Define las operaciones disponibles para manipular usuarios.

- **🔌 Interfaces de Fuentes de Datos (`datasources/`)**: Abstraen el origen de los datos.
  - `users.datasource.ts`: Define cómo se obtienen y persisten los datos de usuarios.

### 2. ⚙️ Capa de Aplicación (`application/`)

La capa de aplicación orquesta el flujo de la aplicación y contiene los casos de uso:

- **📋 Casos de Uso**: Implementan la lógica de negocio específica.
  - `create-user.use-case.ts`: Lógica para crear un nuevo usuario.
  - `find-all-users.use-case.ts`: Lógica para obtener todos los usuarios.
  - `find-one-user.use-case.ts`: Lógica para encontrar un usuario específico.
  - `update-user.use-case.ts`: Lógica para editar un usuario específico.
  - `remove-user.use-case.ts`: Lógica para eliminar un usuario específico.

Los casos de uso utilizan las interfaces definidas en el dominio para realizar operaciones, manteniendo la independencia de la implementación concreta.

### 3. 🏗️ Capa de Infraestructura (`infrastructure/`)

La capa de infraestructura proporciona implementaciones concretas de las interfaces definidas en el dominio:

- **💾 Implementaciones de Fuentes de Datos (`datasources/`)**: 
  - `users.datasource.impl.ts`: Implementación concreta de cómo obtener y persistir datos de usuarios.

- **📁 Implementaciones de Repositorios (`repositories/`)**: 
  - `users.repository.impl.ts`: Implementación concreta de las operaciones del repositorio de usuarios.

- **🖥️ Capa de Presentación (`presentation/`)**: Maneja la interacción con el exterior.
  - `users.controller.ts`: Controladores que reciben las peticiones HTTP.
  - `users.routes.ts`: Definición de rutas para el módulo de usuarios.

### 4. 🧩 Componentes Comunes (`common/`)

Contiene código compartido entre diferentes módulos:

- **⚙️ Configuración (`config/`)**: 
  - `envs.config.ts`: Gestión de variables de entorno.

- **📌 Constantes (`constants/`)**: 
  - `cors.ts`: Configuración de políticas CORS.

- **📄 DTOs Comunes (`dtos/`)**: 
  - `pagination.dto.ts`: Estructura para manejar la paginación.

- **🔠 Enumeraciones Comunes (`enums/`)**: 
  - `http-status.enum.ts`: Códigos de estado HTTP.

- **🔄 Interfaces Comunes (`interfaces/`)**: 
  - `api-response.interface.ts`: Define estructuras estandarizadas para respuestas de API:
    - `Metadata`: Interfaz para metadatos de paginación (page, lastPage, limit, total).
    - `Status`: Interfaz para el estado de respuestas (statusMsg, statusCode, error).
    - `ApiOneResponse<T>`: Interfaz genérica para respuestas de un solo elemento.
    - `ApiAllResponse<T>`: Interfaz genérica para respuestas de múltiples elementos con metadatos.

- **⚠️ Manejo de Errores (`errors/`)**: 
  - `handler.error.ts`: Manejador centralizado de errores.
  - `manager.error.ts`: Gestor para crear y clasificar errores.

## 🔄 Flujo de Datos

1. 📥 Las peticiones HTTP llegan a través de las rutas (`routes.ts`).
2. 🎮 Los controladores (`users.controller.ts`) reciben estas peticiones y las transforman en llamadas a casos de uso.
3. ⚙️ Los casos de uso (`application/`) implementan la lógica de negocio utilizando las interfaces del dominio.
4. 📁 Las implementaciones de repositorios (`infrastructure/repositories/`) proporcionan acceso a los datos.
5. 💾 Las implementaciones de fuentes de datos (`infrastructure/datasources/`) interactúan con la base de datos u otros servicios externos.

## 🚀 Ventajas de esta Arquitectura

- **🔄 Independencia de Frameworks**: La lógica de negocio no depende de Express ni de ninguna otra biblioteca externa.
- **🧪 Testabilidad**: Cada capa puede probarse de forma aislada mediante mocks o stubs.
- **🔧 Mantenibilidad**: La clara separación de responsabilidades facilita la comprensión y modificación del código.
- **📈 Escalabilidad**: Nuevos módulos pueden añadirse siguiendo la misma estructura.
- **🔄 Adaptabilidad**: Las implementaciones concretas pueden cambiarse sin afectar a la lógica de negocio.

## 🧠 Principios de la Arquitectura Hexagonal

Esta arquitectura se basa en los siguientes principios:

1. **🧩 Separación de Preocupaciones**: Cada capa tiene una responsabilidad específica y bien definida.
2. **⬆️ Inversión de Dependencias**: Las capas internas no dependen de las externas, sino de abstracciones.
3. **🔌 Puertos y Adaptadores**: 
   - **🔌 Puertos**: Interfaces que definen cómo se comunica el dominio con el exterior.
   - **🔄 Adaptadores**: Implementaciones concretas de esas interfaces.
4. **💎 Dominio Centralizado**: La lógica de negocio está en el centro y es independiente de detalles técnicos.

## ⚙️ Configuración y Ejecución

### 📋 Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- TypeScript

### 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build
```

### 🔐 Variables de Entorno

El proyecto utiliza archivos `.env` para la configuración:

- `.env.development`: Configuración para entorno de desarrollo
- `.env.production`: Configuración para entorno de producción
- `.env.template`: Plantilla con las variables necesarias


### ▶️ Ejecución

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm start
```

## 📈 Extensión del Proyecto

### 🧱 Añadir un Nuevo Módulo

Para añadir un nuevo módulo, sigue estos pasos:

1. 📂 Crea una nueva carpeta en `src/` con el nombre del módulo
2. 🔄 Replica la estructura de carpetas (domain, application, infrastructure)
3. 💎 Define las entidades, DTOs, interfaces y casos de uso
4. 🏗️ Implementa las interfaces en la capa de infraestructura
5. 🔄 Añade las rutas al archivo `routes.ts`


### ➕ Añadir un Nuevo Caso de Uso

Para añadir un nuevo caso de uso a un módulo existente:

1. 🔌 Define la interfaz del caso de uso en la capa de dominio si es necesario
2. ⚙️ Implementa el caso de uso en la capa de aplicación
3. 🖥️ Actualiza o crea un nuevo controlador en la capa de presentación
4. 🔄 Añade la ruta correspondiente


## 🧩 Patrones de Diseño Utilizados

- **💉 Inyección de Dependencias**: Para proporcionar implementaciones concretas a las abstracciones.
- **📚 Repositorio**: Para abstraer el acceso a datos.
- **🏛️ Fachada**: Los casos de uso actúan como fachadas para la lógica de negocio.
- **📦 DTO (Data Transfer Object)**: Para transferir datos entre capas.


## ✅ Buenas Prácticas

- **📝 Nomenclatura Consistente**: Nombres descriptivos y consistentes para archivos y clases.
- **🎯 Principio de Responsabilidad Única**: Cada clase tiene una única responsabilidad.
- **🔓 Principio Abierto/Cerrado**: Las entidades están abiertas para extensión pero cerradas para modificación.
- **⚠️ Manejo Centralizado de Errores**: A través de los componentes en `common/errors/`.
- **✅ Validación de Datos**: A través de DTOs bien definidos.


## 🧪 Pruebas

La arquitectura hexagonal facilita diferentes tipos de pruebas:

- **🔬 Pruebas Unitarias**: Para casos de uso y lógica de dominio.
- **🔄 Pruebas de Integración**: Para verificar la interacción entre capas.
- **🔄 Pruebas de Extremo a Extremo**: Para verificar el flujo completo.


## 🏁 Conclusión

Esta arquitectura hexagonal proporciona una base sólida para desarrollar aplicaciones escalables y mantenibles, con una clara separación de responsabilidades y un enfoque en la lógica de negocio. La estructura modular facilita la extensión y modificación del sistema, mientras que la independencia de frameworks externos garantiza la longevidad del código.
