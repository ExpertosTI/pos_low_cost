# -*- coding: utf-8 -*-
{
    'name': 'POS Low Cost Alert',
    'version': '18.0.1.0.0',
    'category': 'Point of Sale',
    'summary': 'Alert when selling below cost price with password authorization',
    'description': '''
    This module provides an alert system for Point of Sale when products are being sold below their cost price.
    Features:
    - Automatic detection of products sold below cost
    - Warning dialog with product details
    - Password authorization system for supervisor override
    - Clean and professional UI
    ''',
    'author': 'ExpertosTI',
    'website': 'https://github.com/ExpertosTI/pos_low_cost',
    'depends': ['point_of_sale'],
    'assets': {
        'point_of_sale._assets_pos': [
            'pos_low_sales_price/static/src/js/payment_screen.js',
            'pos_low_sales_price/static/src/js/password_dialog.js',
            'pos_low_sales_price/static/src/css/pos_low_price_dialog.css',
            'pos_low_sales_price/static/src/xml/password_dialog.xml',
        ]
    },
    'images': ['static/description/banner.jpg'],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
