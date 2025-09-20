/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PaymentScreen } from "@point_of_sale/app/screens/payment_screen/payment_screen";
import { PasswordDialog } from "./password_dialog";
import { _t } from "@web/core/l10n/translation";

patch(PaymentScreen.prototype, {
    async validateOrder(isForceValidate) {
        const result = this._checkLowPrices();
        
        if (result.hasLowPrices && !isForceValidate) {
            const productDetails = result.lowPriceProducts.map(product => 
                `• ${product.display_name}: $${product.price.toFixed(2)}`
            ).join('\n');
            
            const message = `Los siguientes productos están por debajo del precio de costo:\n\n${productDetails}\n\nPor favor, corrija los precios antes de continuar.`;
            
            this.dialog.add(this.constructor.components.ConfirmationDialog, {
                title: _t("Advertencia: Precios Bajos"),
                body: message,
                confirmLabel: _t("Atrás"),
                confirmClass: "btn-danger",
                cancelLabel: _t("Autorizar con Contraseña"),
                cancelClass: "btn-warning",
                cancel: () => this._showPasswordDialog(),
            });
            return;
        }
        
        return super.validateOrder(isForceValidate);
    },

    _checkLowPrices() {
        const order = this.pos.get_order();
        const lowPriceProducts = [];
        
        for (const line of order.get_orderlines()) {
            const product = line.get_product();
            if (product.standard_price > 0 && line.get_unit_price() < product.standard_price) {
                lowPriceProducts.push(product);
            }
        }
        
        return {
            hasLowPrices: lowPriceProducts.length > 0,
            lowPriceProducts: lowPriceProducts
        };
    },

    _showPasswordDialog() {
        this.dialog.add(PasswordDialog, {
            title: _t("Autorización Requerida"),
            body: _t("Ingrese la contraseña para autorizar la venta con precios por debajo del costo:"),
            confirm: () => {
                console.log("Venta autorizada con contraseña");
                this.validateOrder(true);
            },
            cancel: () => {
                console.log("Autorización cancelada");
            },
            close: () => {},
        });
    },
});