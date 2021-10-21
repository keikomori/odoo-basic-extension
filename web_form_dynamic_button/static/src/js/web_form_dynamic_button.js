odoo.define('web_form_dynamic_button', function (require) {
    "use strict";

    var core = require('web.core');
    var FormController = require('web.FormController');

    var _t = core._t;

    FormController.include({
        /**
         * According to the expression processing button ``edit`` and ``create`` show or hide
          * Add the attribute ``edit_expr="expr"`` or ``create_expr="expr"`` in ``<form />``
          * Where ``expr'' is an expression, such as ``state=='draft'`
         * @private
         */
        _updateButtons: function () {
            this._super.apply(this, arguments);
            if (this.mode === 'readonly' && this.$buttons && this.hasButtons) {
                var self = this;
                var attrs = this.renderer.arch.attrs;
                var actions = ['edit', 'create'];
                _.each(actions, function (action) {
                    var expr = attrs[action + '_expr'];
                    var act_res = expr ? self._evalActionExpr(expr) : self.activeActions[action];
                    self.$buttons.find('.o_form_button_' + action).toggleClass('o_hidden', !act_res);
                });
            }
        },
        /**
         * According to the expression processing button ``delete`` and ``duplicate`` show or hide
          * Add the attribute ``delete_expr="expr"`` or ``duplicate_expr="expr"`` in ``<form />``
          * Where ``expr`` is an expression, such as ``state=='draft'``
         * @private
         */
        _updateSidebar: function () {
            if (this.sidebar) {
                this.sidebar.do_toggle(this.mode === 'readonly');
            }
            if (this.mode === 'readonly' && this.sidebar && this.hasSidebar) {
                var self = this;
                var attrs = this.renderer.arch.attrs;
                var actions = ['delete', 'duplicate'];
                var otherItems = [];
                _.each(actions, function (action) {
                    var expr = attrs[action + '_expr'];
                    var act_res = expr ? self._evalActionExpr(expr) : self.activeActions[action];
                    var capAct = _.string.capitalize(action);
                    var t_label = _t(capAct);
                    if (act_res) {
                        otherItems.push({
                            label: t_label,
                            callback: self['_on' + capAct + 'Record'].bind(self),
                        });
                    }
                    // Delete 'delete' and 'duplicate' actions
                    self.sidebar.items.other = self.sidebar.items.other.filter(function (item) {
                        return item.label != t_label;
                    });
                });
                // If the condition is true, add the action to other
                this.sidebar.items.other = otherItems.concat(this.sidebar.items.other);
                this._updateEnv();
            }
        },
        _evalActionExpr: function (expr) {
            var expression = py.parse(py.tokenize(expr));
            return py.PY_isTrue(py.evaluate(expression, this.renderer.state.evalContext));
        }
    });
});
