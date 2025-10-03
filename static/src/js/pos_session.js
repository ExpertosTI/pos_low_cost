/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";

patch(PosStore.prototype, {
    async _processData(loadedData) {
        await super._processData(...arguments);
        
        // Asegurar que la configuración incluya el campo de contraseña
        if (this.config && !this.config.pos_low_price_password) {
            this.config.pos_low_price_password = 'admin123';
        }
        
        // Asegurar que la configuración incluya el código maestro
        if (this.config && !this.config.pos_master_code) {
            this.config.pos_master_code = 'admin456';
        }
    },
});