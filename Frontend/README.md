# POLARIS CAFETERÍA - FRONTEND (ANGULAR)

Sistema Frontend desarrollado para la gestión integral de pedidos, atención en cocina, carta digital interactiva y administración de la cafetería POLARIS.

---

## 1. Arquitectura de Componentes y Módulos

El proyecto está construido sobre **Angular** con arquitectura basada en **Standalone Components**, enrutamiento protegido mediante **Guards** y comunicación HTTP mediante servicios especializados con **Interceptors**.

```
Frontend/src/app/
├── component/
│   ├── login/                     # Autenticación de personal administrativo y de servicio
│   ├── modal-login-dni/           # Validación de clientes con DNI (RENIEC) y OTP Email
│   ├── modal-recuperar-password/  # Recuperación de contraseña vía correo con código OTP
│   ├── categoria/                 # Explorador de categorías principales del menú
│   ├── producto/                  # Catálogo dinámico con selector de acompañamientos
│   ├── carritos/                  # Vista de comandas rápidas para empleados de caja
│   ├── carrito-flotante/          # Carrito modal desplegable para comensales (Drawer UI)
│   ├── pedido/                    # Formulario de confirmación, mesa y método de pago
│   ├── estado-pedido/             # Monitoreo en tiempo real del estado del pedido
│   ├── panel-empleado/            # Monitor Kanban de cocina/barra (ESPERA, PREPARACION, LISTO)
│   ├── panel-superadmin/          # Panel gerencial (ABM empleados, productos, reportes)
│   ├── estadistica/               # Dashboards analíticos de ventas y productos estrella
│   └── modal-pedido-listo/        # Notificación emergente al comensal cuando el pedido está listo
├── guards/
│   └── role.guard.ts              # Control de acceso RBAC (SUPERADMIN, EMPLEADO, CLIENTE)
├── service/
│   ├── auth.interceptor.ts        # Inyección automática del header Authorization: Bearer <JWT>
│   ├── carrito-service.ts         # Estado global del carrito implementado con Angular Signals
│   ├── categoria-service.ts       # Consumo del endpoint REST de categorías
│   ├── producto-service.ts        # Consumo de productos y carga multipart de imágenes
│   ├── producto-acompanamiento-service.ts # Asignación y consulta de acompañamientos
│   ├── pedido-service.ts          # Envío de pedidos y actualización de estados
│   ├── pedido-monitor.service.ts  # Sondeo en tiempo real de estados de comandas
│   ├── cliente.service.ts         # Integración con validación RENIEC y OTP
│   ├── empleado-service.ts        # Mantenimiento de cuentas de empleados
│   ├── estadistica-service.ts     # Métricas de ventas diarias y semanales
│   └── reporte-service.ts         # Descarga de reportes gerenciales en formato Excel
```

---

## 2. Componentes Clave

### A. Autenticación y Seguridad (`Login`, `roleGuard`, `authInterceptor`)
- **Login Component:** Permite el ingreso de empleados y administradores. Al autenticar exitosamente, almacena el token JWT y los datos de sesión en `localStorage`.
- **Role Guard:** Protege las rutas administrativas (`/empleado`, `/carrito`, `/estadistica`, `/panel-superadmin`). Valida que el rol del usuario coincida con los permisos requeridos.
- **Auth Interceptor:** Intercepta todas las peticiones salientes hacia la API del backend (`http://localhost:8080`) agregando el encabezado `Authorization: Bearer <token>`.

### B. Carta Digital y Selección de Productos
- **Categorías y Catálogo:** Carga reactiva de productos agrupados por categorías (Cafés, Frappés, Waffles, Jugos, Ensaladas, Sándwiches).
- **Selector de Acompañamientos:** Permite al comensal personalizar su orden añadiendo salsas, toppings o bebidas antes de agregar al carrito.

### C. Carrito Reactivo con Angular Signals (`CarritoService` & `CarritoFlotante`)
- **Gestión Reactiva con Signals:** Implementación de `signal()` y `computed()` para calcular de forma inmediata la cantidad de productos, subtotales, recargos por acompañamientos y total a pagar.
- **Drawer Flotante:** Carrito modal accesible desde cualquier pantalla del menú sin recargar la página.

### D. Monitor de Cocina y Comandas (`PanelEmpleado`)
- Tablero visual en tiempo real clasificado por columnas de estado:
  - ⏳ **ESPERA:** Pedidos recién ingresados por los comensales o caja.
  - 🍳 **PREPARACIÓN:** Pedidos tomados por el personal de cocina.
  - ✅ **LISTO:** Pedidos preparados listos para despacho. Se dispara alerta visual en `ModalPedidoListoComponent`.
  - 🏁 **FINALIZADO:** Pedidos entregados y cobrados.
- **Gestión de Cancelaciones:** Visualización de solicitudes de anulación emitidas por el cliente, permitiendo al empleado aprobar o rechazar la solicitud con motivo documentado.

### E. Panel Superadministrador (`PanelSuperadminComponent`)
- **ABM de Empleados:** Alta, edición, activación/desactivación y baja con protección estricta contra borrado de la cuenta SuperAdmin (`admin`).
- **Gestión de Menú:** Modificación de precios base, descripción, estado de disponibilidad y carga de fotografías vía `MultipartFile`.
- **Exportación Excel:** Descarga de reportes estructurados `.xlsx` de empleados, productos y ventas procesados mediante Apache POI en el backend.

---

## 3. Checklist de QA de Interfaz (Sprint 3)

| Módulo / Caso de Prueba | Criterio de Aceptación | Estado QA |
|---|---|:---:|
| **CP-UI-01:** Login Empleado/Admin | Validación de campos requeridos, mensaje de error en credenciales inválidas y redirección por rol. | ✅ Aprobado |
| **CP-UI-02:** Modal Validación DNI | Consulta correcta al servicio RENIEC, autocompletado de nombres y apellidos oficiales. | ✅ Aprobado |
| **CP-UI-03:** Verificación OTP Email | Envío de código de 6 dígitos, temporizador de reintento y validación contra API SMTP. | ✅ Aprobado |
| **CP-UI-04:** Carta Digital Dinámica | Filtrado por categoría sin recarga, renderizado de imágenes y precios base. | ✅ Aprobado |
| **CP-UI-05:** Carrito con Signals | Adición, incremento, decremento y eliminación de ítems con actualización instantánea de totales. | ✅ Aprobado |
| **CP-UI-06:** Monitor de Comandas | Cambio de estados de pedido (`ESPERA` ➔ `PREPARACION` ➔ `LISTO`) sin inconsistencias visuales. | ✅ Aprobado |
| **CP-UI-07:** Alerta de Pedido Listo | Activación del modal de notificación cuando la cocina marca el pedido en estado `LISTO`. | ✅ Aprobado |
| **CP-UI-08:** Gestión de Cancelaciones | Visualización del motivo de cancelación en la comanda y actualización reactiva al responder. | ✅ Aprobado |
| **CP-UI-09:** Panel Superadmin | Bloqueo de eliminación para `admin`, carga multipart de imágenes y descarga de reportes Excel. | ✅ Aprobado |
| **CP-UI-10:** Rutas Protegidas | Redirección inmediata a `/login` si un usuario no autenticado intenta acceder a `/panel-superadmin`. | ✅ Aprobado |

---

## 4. Instrucciones de Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar servidor de desarrollo en puerto 4200:
   ```bash
   npm start
   ```
3. Construir para producción:
   ```bash
   npm run build
   ```
