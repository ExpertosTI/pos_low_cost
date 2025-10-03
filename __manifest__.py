# -*- coding: utf-8 -*-
{
    'name': 'Alerta POS Precio Bajo - RENACE',
    'version': '18.0.1.0.0',
    'category': 'Punto de Venta',
    'summary': 'Sistema de alerta para ventas por debajo del precio de costo con autorización por contraseña',
    'description': '''
    Módulo desarrollado por RENACE.TECH que proporciona un sistema de alerta para el Punto de Venta 
    cuando los productos se venden por debajo de su precio de costo.
    
    Características:
    - Detección automática de productos vendidos por debajo del costo
    - Diálogo de advertencia con detalles del producto
    - Sistema de autorización por contraseña para supervisores
    - Interfaz limpia y profesional
    - Desarrollado específicamente para entornos empresariales
    ''',
    'author': 'RENACE.TECH',
    'website': 'https://www.renace.tech',
    'depends': ['point_of_sale'],
    'data': [
        'views/pos_config_views.xml',
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_low_cost/static/src/js/pos_session.js',
            'pos_low_cost/static/src/js/payment_screen.js',
            'pos_low_cost/static/src/js/password_dialog.js',
            'pos_low_cost/static/src/js/master_code_dialog.js',
            'pos_low_cost/static/src/css/pos_low_price_dialog.css',
            'pos_low_cost/static/src/xml/password_dialog.xml',
            'pos_low_cost/static/src/xml/master_code_dialog.xml',
        ]
    },
    'images': ['static/description/banner.jpg'],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
