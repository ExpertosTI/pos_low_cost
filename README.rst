POS Low Cost Alert
==================

Alert system for Odoo Point of Sale when selling products below cost price.

Features
--------

* Automatic detection of products sold below cost
* Warning dialog with product details  
* Password authorization for supervisor override
* Clean and professional UI

Installation
------------

1. Copy this module to your Odoo addons directory
2. Update the app list
3. Install the module from Apps menu

Configuration
-------------

Change the authorization password in:
``static/src/js/password_dialog.js`` line 43

Usage
-----

When attempting to validate an order with products below cost price:

1. A warning dialog will appear showing affected products
2. Click "Atrás" to cancel and adjust prices
3. Click "Autorizar con Contraseña" to override with password

License
-------

AGPL-3
