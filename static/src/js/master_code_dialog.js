/** @odoo-module **/

import { AbstractAwaitablePopup } from "@point_of_sale/app/popup/abstract_awaitable_popup";
import { _t } from "@web/core/l10n/translation";
import { useState } from "@odoo/owl";

export class MasterCodeDialog extends AbstractAwaitablePopup {
    static template = "pos_low_cost.MasterCodeDialog";
    static defaultProps = {
        confirmText: _t("Confirmar"),
        cancelText: _t("Cancelar"),
        title: _t("Código Maestro Requerido"),
        body: _t("Ingrese el código maestro para cambiar la contraseña:"),
    };

    setup() {
        super.setup();
        this.state = useState({
            masterCode: "",
            newPassword: "",
            confirmPassword: "",
            error: "",
        });
    }

    onInputMasterCode(event) {
        this.state.masterCode = event.target.value;
        this.state.error = "";
    }

    onInputNewPassword(event) {
        this.state.newPassword = event.target.value;
        this.state.error = "";
    }

    onInputConfirmPassword(event) {
        this.state.confirmPassword = event.target.value;
        this.state.error = "";
    }

    async onConfirm() {
        const masterCode = this.state.masterCode.trim();
        const newPassword = this.state.newPassword.trim();
        const confirmPassword = this.state.confirmPassword.trim();

        // Validaciones básicas
        if (!masterCode) {
            this.state.error = _t("El código maestro es requerido");
            return;
        }

        if (!newPassword) {
            this.state.error = _t("La nueva contraseña es requerida");
            return;
        }

        if (newPassword.length < 6) {
            this.state.error = _t("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        if (newPassword !== confirmPassword) {
            this.state.error = _t("Las contraseñas no coinciden");
            return;
        }

        // Validar código maestro
        const configMasterCode = this.env.services.pos.config.pos_master_code || 'admin456';
        if (masterCode !== configMasterCode) {
            this.state.error = _t("Código maestro incorrecto");
            return;
        }

        // Si todo está correcto, confirmar con la nueva contraseña
        this.confirm({ newPassword });
    }

    onCancel() {
        this.cancel();
    }
}