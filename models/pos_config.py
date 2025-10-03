# -*- coding: utf-8 -*-

from odoo import models, fields, api
from odoo.exceptions import ValidationError
import re


class PosConfig(models.Model):
    _inherit = 'pos.config'

    pos_low_price_password = fields.Char(
        string='Contraseña de Autorización de Precios Bajos',
        help='Contraseña requerida para autorizar ventas por debajo del precio de costo',
        default='admin123'
    )
    
    pos_master_code = fields.Char(
        string='Código Maestro',
        help='Código maestro requerido para cambiar la contraseña de autorización',
        default='admin456'
    )

    @api.constrains('pos_low_price_password')
    def _check_password_strength(self):
        """Validar que la contraseña cumpla con criterios mínimos de seguridad"""
        for record in self:
            if record.pos_low_price_password:
                password = record.pos_low_price_password
                
                # Validar longitud mínima
                if len(password) < 6:
                    raise ValidationError(
                        "La contraseña debe tener al menos 6 caracteres."
                    )
                
                # Validar que no sea solo espacios
                if password.strip() != password or not password.strip():
                    raise ValidationError(
                        "La contraseña no puede contener solo espacios en blanco."
                    )

    @api.constrains('pos_master_code')
    def _check_master_code_strength(self):
        """Validar que el código maestro cumpla con criterios mínimos de seguridad"""
        for record in self:
            if record.pos_master_code:
                master_code = record.pos_master_code
                
                # Validar longitud mínima
                if len(master_code) < 6:
                    raise ValidationError(
                        "El código maestro debe tener al menos 6 caracteres."
                    )
                
                # Validar que no sea solo espacios
                if master_code.strip() != master_code or not master_code.strip():
                    raise ValidationError(
                        "El código maestro no puede contener solo espacios en blanco."
                    )

    def validate_master_code(self, entered_code):
        """Validar el código maestro ingresado"""
        self.ensure_one()
        master_code = self.pos_master_code or 'admin456'
        return entered_code == master_code

    def change_password_with_master_code(self, master_code, new_password):
        """Cambiar la contraseña solo si el código maestro es correcto"""
        self.ensure_one()
        if not self.validate_master_code(master_code):
            raise ValidationError("Código maestro incorrecto.")
        
        self.pos_low_price_password = new_password
        return True

    def get_pos_low_price_password(self):
        """Método para obtener la contraseña desde el frontend"""
        self.ensure_one()
        return self.pos_low_price_password or 'admin123'