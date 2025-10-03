/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { _t } from "@web/core/l10n/translation";

export class PasswordDialog extends Component {
    static template = "pos_low_cost.PasswordDialog";
    static components = { Dialog };
    static props = {
        title: { type: String, optional: true },
        body: { type: String, optional: true },
        confirm: { type: Function },
        cancel: { type: Function, optional: true },
        close: { type: Function },
    };

    setup() {
        this.state = useState({
            password: "",
            error: false,
            errorMessage: "",
        });
    }

    onPasswordInput(event) {
        this.state.password = event.target.value;
        this.state.error = false;
        this.state.errorMessage = "";
    }

    onConfirm() {
        const password = this.state.password.trim();
        
        if (!password) {
            this.state.error = true;
            this.state.errorMessage = _t("Por favor ingrese la contraseña");
            return;
        }

        // Obtener la contraseña configurada desde el POS config
        const posStore = this.env.services.pos;
        const validPassword = posStore.config.pos_low_price_password || "admin123";
        
        if (password === validPassword) {
            this.props.confirm();
            this.props.close();
        } else {
            this.state.error = true;
            this.state.errorMessage = _t("Contraseña incorrecta");
            this.state.password = "";
        }
    }

    onCancel() {
        if (this.props.cancel) {
            this.props.cancel();
        }
        this.props.close();
    }

    onKeydown(event) {
        if (event.key === "Enter") {
            this.onConfirm();
        } else if (event.key === "Escape") {
            this.onCancel();
        }
    }
}