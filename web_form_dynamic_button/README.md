[![License](https://img.shields.io/badge/license-LGPL--3.0-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0-standalone.html)

# Hide buttons in form views

This module can dynamically display or hide the control buttons on the form view based on expressions. Currently, the following buttons are supported:：

- Edit button `Edit`
- Create button  `Create`
- Delete button  `Delete`
- Duplicate button  `Duplicate`

## Features

- Add attributes  `edit_expr` to the form `form` in the label, the edit button is displayed only when the expression is established
- Add attributes `create_expr` to the form `form` in the label, the create button is displayed only when the expression is established
- Add attributes `delete_expr` to the form `form` in the label, the delete button is displayed only when the expression is established
- Add attributes `duplicate_expr` to the form `form` in the label, the duplicate button is displayed only when the expression is established

## Usage

- When defining the form view, add attributes `edit_expr="state == 'draft'"` arrive `form` within the label：

```xml
<!-- In this example, when the state is not draft, the edit button will be hidden, otherwise it will be displayed -->
...
<field name="arch" type="xml">
    <form string="View name" edit_expr="state == 'draft'">
        <header>
            <field name="state" widget="statusbar" statusbar_visible="draft,done" nolabel="1" readonly="1"/>
        </header>
        ...
        <field name="name"/>
        ...
    </form>
</field>
...
```

Exist `Features` the attributes listed in can be used at the same time, as shown in the above example, directly add the corresponding attributes to `form` just in the label.

## Bug Tracker

If you encounter any problems, welcome to [GitHub Issues](https://github.com/cognichain/odoo-basic-extension/issues) give feedback

## Credits

### Contributors

- Ruter <i@ruterly.com>

### Maintainer

<img src="./static/description/icon.png" width="20%" alt="深圳市知链科技有限公司" />

This module is developed and maintained by Shenzhen Zhilian Technology Co., Ltd.
