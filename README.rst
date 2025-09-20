Alerta POS Precio Bajo - RENACE
===============================

Sistema de alerta desarrollado por RENACE.TECH para Odoo Punto de Venta cuando se venden productos por debajo del precio de costo.

Características
---------------

* Detección automática de productos vendidos por debajo del costo
* Diálogo de advertencia con detalles del producto  
* Sistema de autorización por contraseña para supervisores
* Interfaz limpia y profesional
* Desarrollado específicamente para entornos empresariales

Instalación
-----------

1. Copie este módulo a su directorio de addons de Odoo
2. Actualice la lista de aplicaciones
3. Instale el módulo desde el menú Aplicaciones

Configuración
-------------

Para cambiar la contraseña de autorización, modifique:
``static/src/js/password_dialog.js`` línea 43

Uso
---

Cuando intente validar una orden con productos por debajo del precio de costo:

1. Aparecerá un diálogo de advertencia mostrando los productos afectados
2. Haga clic en "Atrás" para cancelar y ajustar precios
3. Haga clic en "Autorizar con Contraseña" para anular con contraseña

Desarrollado por
----------------

**RENACE.TECH** - Soluciones tecnológicas empresariales
Sitio web: https://www.renace.tech

Licencia
--------

AGPL-3
