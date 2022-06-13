
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Util = imports.misc.util;

let text, button, turnedOn = false;

function _hideHello() {
    Main.uiGroup.remove_actor(text);
    text = null;
}

function _showHello() {

    if (turnedOn) {
	    //Util.spawn(['xset', 'led', 'off']);
	    //gsettings set org.gnome.desktop.a11y.applications screen-keyboard-enabled false
	    Util.spawn(['gsettings', 'set', 'org.gnome.desktop.a11y.applications screen-keyboard-enabled', 'false']);
	    text = new St.Label({ style_class: 'helloworld-label', text: "Teclado en pantalla Desactivado " });
	    Main.uiGroup.add_actor(text);
	    turnedOn = false;
    } else {
	    //Util.spawn(['xset', 'led', 'on']);
	    //gsettings set org.gnome.desktop.a11y.applications screen-keyboard-enabled true
	    Util.spawn(['gsettings', 'set', 'org.gnome.desktop.a11y.applications screen-keyboard-enabled', 'true']);
	    text = new St.Label({ style_class: 'helloworld-label', text: "Teclado en pantalla Activado" });
	    Main.uiGroup.add_actor(text);
	    turnedOn = true;
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x + Math.floor(monitor.width / 2 - text.width / 2),
                      monitor.y + Math.floor(monitor.height * 0.8 - text.height / 2));

    Tweener.addTween(text,
                     { opacity: 0,
                       time: 2,
                       transition: 'easeOutQuad',
                       onComplete: _hideHello });
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'preferences-desktop-keyboard-shortcuts-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _showHello);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
