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
│  ├── config/           # Configuraciones globales
│  │  ├── envs.config.ts  # Configuración de variables de entorno
│  │   └── inversify.config.ts #Configuracion de inversify container
│  ├── constants/      # Constantes globales
│  │  └── cors.ts      # Configuración de CORS
│  ├── enums/           # Enumeraciones compartidas
│  │  └── http-status.enum.ts # Códigos de estado HTTP
│  ├── errors/         # Manejo de errores centralizado
│  │  ├── handler.error.ts # Manejador de errores
│  │  └── manager.error.ts # Gestor de errores
│  ├── interfaces/        # Interfaces y tipos comunes
│  │  ├── api-response.interface.ts # Estructura de respuestas de API
│  │  ├── metadata.interface.ts  # Interfaz para metadatos de paginación
│  │  └── status.interface.ts   # Interfaz para el estado de las respuestas
│  └── types/ #Tipos custom
│   └── inversify.type.ts #Tipos de inyeccion para inversify
├── users/                # Módulo de usuarios
│  ├── application/     # Capa de aplicación (casos de uso)
│  │  ├── dtos/       # DTOs de entrada
│  │  │  ├── create-user.dto.ts
│  │  │  └── update-user.dto.ts
│  │  ├── create-user.use-case.ts
│  │  ├── find-all-users.use-case.ts
│  │  └── find-one-user.use-case.ts
│  │  ├── update-user.use-case.ts
│  │  └── remove-user.use-case.ts
│  └── domain/          # Capa de dominio
│   ├── contracts/     # Contratos para transferencia de datos
│   │  ├── create-user.contract.ts
│   │  ├── update-user.contract.ts
│   │  └── pagination.contract.ts
│   ├── datasources/   # Interfaces para fuentes de datos
│   │  └── user.datasource.ts
│   ├── entities/     # Entidades de dominio
│   │  └── user.entity.ts
│   ├── enums/      # Enumeraciones del dominio
│   │  └── user.role.ts
│   └── repositories/   # Interfaces de repositorios
│    └── user.repository.ts
│  └── infrastructure/    # Capa de infraestructura
│   ├── datasources/   # Implementaciones de fuentes de datos
│   │  └── user.datasource.impl.ts
│   ├── repositories/   # Implementaciones de repositorios
│   │  └── user.repository.impl.ts
│   └── presentation/   # Controladores y rutas
│    ├── users.routes.ts
│    └── users.controller.ts
├── main.ts              # Punto de entrada de la aplicación
├── routes.factory.ts    # Configuración de rutas principales
└── server.ts             # Configuración del servidor Express
```

## Principios SOLID

Los principios SOLID son un conjunto de cinco principios de diseño en la programación orientada a objetos (POO) que buscan crear software más comprensible, flexible y fácil de mantener. Cada letra del acrónimo SOLID representa un principio clave

![Solid Principles](https://miro.medium.com/v2/resize:fit:720/format:webp/1*aDsxDnXogDwWCpccSiHbcg.png)

## 🔷 Capas de la Arquitectura Hexagonal

### 1\. 💎 Capa de Dominio (`domain/`)

La capa de dominio es el núcleo de la aplicación y contiene:

  - **🏛️ Entidades (`entities/`)**: Representan los objetos de negocio principales con sus propiedades y comportamientos.
      - `user.entity.ts`: Define la estructura y comportamiento de un usuario en el sistema.

  - **📜 Contratos (`contracts/`)**: Tipos que definen los datos necesarios para las operaciones del dominio.

    - `create-user.contract.ts`: Define los datos necesarios para crear un nuevo usuario.
      
    - `update-user.contract.ts`: Define los datos necesarios para actualizar un usuario existente.
     
    - `pagination.contract.ts`: Define los datos necesarios para la paginación.

  - **🔤 Enumeraciones (`enums/`)**: Valores predefinidos específicos del dominio.
      
    - `user.role.ts`: Define los roles posibles para un usuario.

  - **📚 Interfaces de Repositorios (`repositories/`)**: Definen cómo se accede a los datos.
      
    - `users.repository.ts`: Define las operaciones disponibles para manipular usuarios.

  - **🔌 Interfaces de Fuentes de Datos (`datasources/`)**: Abstraen el origen de los datos.
      
    - `users.datasource.ts`: Define cómo se obtienen y persisten los datos de usuarios.

### 2\. ⚙️ Capa de Aplicación (`application/`)

La capa de aplicación orquesta el flujo de la aplicación y contiene los casos de uso y los DTOs de entrada:

  - **📥 DTOs de Entrada (`dtos/`)**: Objetos para transferir datos desde la capa de presentación.
      
    - `create-user.dto.ts`: Estructura para recibir los datos de creación de un nuevo usuario.
      
    - `update-user.dto.ts`: Estructura para recibir los datos de actualización de un usuario existente.

  - **📋 Casos de Uso**: Implementan la lógica de negocio específica.
      
    - `create-user.use-case.ts`: Lógica para crear un nuevo usuario.
      
    - `find-all-users.use-case.ts`: Lógica para obtener todos los usuarios.
      
    - `find-one-user.use-case.ts`: Lógica para encontrar un usuario específico.
      
    - `update-user.use-case.ts`: Lógica para editar un usuario específico.
      
    - `remove-user.use-case.ts`: Lógica para eliminar un usuario específico.

Los casos de uso utilizan las interfaces definidas en la dominio para realizar operaciones, manteniendo la independencia de la implementación concreta. Los DTOs de entrada se utilizan para recibir y validar los datos de la capa de presentación.

### 3\. 🏗️ Capa de Infraestructura (`infrastructure/`)

La capa de infraestructura proporciona implementaciones concretas de las interfaces definidas en el dominio:

  - **💾 Implementaciones de Fuentes de Datos (`datasources/`)**:
      
    - `user.datasource.impl.ts`: Implementación concreta de cómo obtener y persistir datos de usuarios.

  - **📁 Implementaciones de Repositorios (`repositories/`)**:
      
    - `user.repository.impl.ts`: Implementación concreta de las operaciones del repositorio de usuarios.

  - **🖥️ Capa de Presentación (`presentation/`)**: Maneja la interacción con el exterior.
      
    - `users.controller.ts`: Controladores que reciben las peticiones HTTP y utilizan los DTOs de entrada.
      
    - `users.routes.ts`: Definición de rutas para el módulo de usuarios.

### 4\. 🧩 Componentes Comunes (`common/`)

Contiene código compartido entre diferentes módulos:

  - **⚙️ Configuración (`config/`)**:
      
    - `envs.config.ts`: Gestión de variables de entorno.

  - **📌 Constantes (`constants/`)**:
      
    - `cors.ts`: Configuración de políticas CORS.

  - **🔠 Enumeraciones Comunes (`enums/`)**:
      
    - `http-status.enum.ts`: Códigos de estado HTTP.

  - **🔄 Interfaces Comunes (`interfaces/`)**:
      
    - `api-response.interface.ts`: Define estructuras estandarizadas para respuestas de API:
        
    - `Metadata`: Interfaz para metadatos de paginación (page, lastPage, limit, total).
        
    - `Status`: Interfaz para el estado de respuestas (statusMsg, statusCode, error).
        
    - `ApiOneResponse<T>`: Interfaz genérica para respuestas de un solo elemento.
        
    - `ApiAllResponse<T>`: Interfaz genérica para respuestas de múltiples elementos con metadatos.
      
    - `metadata.interface.ts`: Interfaz para metadatos de paginación.
      
    - `status.interface.ts`: Interfaz para el estado de las respuestas.

  - **⚠️ Manejo de Errores (`errors/`)**:
      
    - `handler.error.ts`: Manejador centralizado de errores.
      
    - `manager.error.ts`: Gestor para crear y clasificar errores.

## 🔄 Flujo de Datos

1.  📥 Las peticiones HTTP llegan a través de las rutas (`routes.ts`).
2.  🎮 Los controladores (`users.controller.ts`) reciben estas peticiones y utilizan los DTOs de entrada para validar los datos. Luego, transforman las peticiones en llamadas a casos de uso.
3.  ⚙️ Los casos de uso (`application/`) implementan la lógica de negocio utilizando los contratos del dominio y las interfaces de los repositorios.
4.  📁 Las implementaciones de repositorios (`infrastructure/repositories/`) proporcionan acceso a los datos.
5.  💾 Las implementaciones de fuentes de datos (`infrastructure/datasources/`) interactúan con la base de datos u otros servicios externos.

## 🚀 Ventajas de esta Arquitectura

  - **🔄 Independencia de Frameworks**: La lógica de negocio no depende de Express ni de ninguna otra biblioteca externa.
  - **🧪 Testabilidad**: Cada capa puede probarse de forma aislada mediante mocks o stubs.
  - **🔧 Mantenibilidad**: La clara separación de responsabilidades facilita la comprensión y modificación del código.
  - **📈 Escalabilidad**: Nuevos módulos pueden añadirse siguiendo la misma estructura.
  - **🔄 Adaptabilidad**: Las implementaciones concretas pueden cambiarse sin afectar a la lógica de negocio.

## 🧠 Principios de la Arquitectura Hexagonal

Esta arquitectura se basa en los siguientes principios:

1.  **🧩 Separación de Preocupaciones**: Cada capa tiene una responsabilidad específica y bien definida.
2.  **⬆️ Inversión de Dependencias**: Las capas internas no dependen de las externas, sino de abstracciones.
3.  **🔌 Puertos y Adaptadores**:
       
    - **🔌 Puertos**: Interfaces que definen cómo se comunica el dominio con el exterior.
       
    - **🔄 Adaptadores**: Implementaciones concretas de esas interfaces.
4.  **💎 Dominio Centralizado**: La lógica de negocio está en el centro y es independiente de detalles técnicos.

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

1.  📂 Crea una nueva carpeta en `src/` con el nombre del módulo
2.  🔄 Replica la estructura de carpetas (domain, application, infrastructure)
3.  💎 Define las entidades, contratos, interfaces y casos de uso
4.  🏗️ Implementa las interfaces en la capa de infraestructura
5.  🔄 Añade las rutas al archivo `routes.ts`

### ➕ Añadir un Nuevo Caso de Uso

Para añadir un nuevo caso de uso a un módulo existente:

1.  🔌 Define la interfaz del caso de uso en la capa de dominio si es necesario
2.  ⚙️ Implementa el caso de uso en la capa de aplicación
3.  🖥️ Actualiza o crea un nuevo controlador en la capa de presentación
4.  🔄 Añade la ruta correspondiente

## 🧩 Patrones de Diseño Utilizados

  - **💉 Inyección de Dependencias**: Para proporcionar implementaciones concretas a las abstracciones.
  - **📚 Repositorio**: Para abstraer el acceso a datos.
  - **🏛️ Fachada**: Los casos de uso actúan como fachadas para la lógica de negocio.
  - **📦 DTO (Data Transfer Object)**: Para transferir datos entre capas (en la capa de aplicación).
  - **📝 Contratos**: Para definir la forma de los datos dentro del dominio.

## ✅ Buenas Prácticas

  - **📝 Nomenclatura Consistente**: Nombres descriptivos y consistentes para archivos y clases.
  - **🎯 Principio de Responsabilidad Única**: Cada clase tiene una única responsabilidad.
  - **🔓 Principio Abierto/Cerrado**: Las entidades están abiertas para extensión pero cerradas para modificación.
  - **⚠️ Manejo Centralizado de Errores**: A través de los componentes en `common/errors/`.
  - **✅ Validación de Datos**: A través de DTOs bien definidos en la capa de aplicación.

## Diagrama de Flujo de Dependencias

![Diagram Dependency injection](https://miro.medium.com/v2/resize:fit:720/format:webp/1*aDsxDnXogDwWCpccSiHbcg.png)

## Estructura de Inyección de Dependencias

| Componente | Dependencias Inyectadas
|-----|-----
| Server | RoutesFactory, Puerto de la aplicación
| RoutesFactory | UsersRoutes
| UsersRoutes | UsersMiddleware, UsersController
| UsersController | Handler, CreateUserUseCase, FindAllUsersUseCase, FindOneUserUseCase, UpdateUserUseCase, RemoveUserUseCase
| Casos de Uso | UserRepository
| UserRepository | UserDatasource


## Flujo de Datos (Inyecciones de Dependencias)

1. El **Server** inicia la aplicación utilizando el **RoutesFactory** para configurar las rutas y el **Puerto** para escuchar conexiones.
2. El **RoutesFactory** configura todas las rutas de la aplicación, incluyendo las **UsersRoutes**.
3. Las **UsersRoutes** utilizan el **UsersMiddleware** para validación/autenticación y el **UsersController** para manejar las peticiones.
4. El **UsersController** utiliza el **Handler** para manejar errores y los **Casos de Uso** para ejecutar la lógica de negocio.
5. Los **Casos de Uso** utilizan el **UserRepository** para acceder a los datos.
6. El **UserRepository** utiliza el **UserDatasource** para interactuar con la fuente de datos (base de datos, API externa, etc.).

## Esquema General

## Beneficios de este Enfoque

- **Desacoplamiento**: Cada componente depende de abstracciones, no de implementaciones concretas.
- **Testabilidad**: Facilita la creación de mocks para pruebas unitarias.
- **Mantenibilidad**: Los cambios en una capa no afectan a las demás.
- **Escalabilidad**: Nuevos módulos pueden seguir el mismo patrón.

## 🧪 Pruebas

La arquitectura hexagonal facilita diferentes tipos de pruebas:

  - **🔬 Pruebas Unitarias**: Para casos de uso y lógica de dominio.
  - **🔄 Pruebas de Integración**: Para verificar la interacción entre capas.
  - **🔄 Pruebas de Extremo a Extremo**: Para verificar el flujo completo.

## 🏁 Conclusión

Esta arquitectura hexagonal proporciona una base sólida para desarrollar aplicaciones escalables y mantenibles, con una clara separación de responsabilidades y un enfoque en la lógica de negocio. La estructura modular facilita la extensión y modificación del sistema, mientras que la independencia de frameworks externos garantiza la longevidad del código.

