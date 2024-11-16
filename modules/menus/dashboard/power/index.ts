import powermenu from '../../power/helpers/actions.js';
import { PowerOptions } from 'lib/types/options.js';

import options from 'options';
import { BoxWidget, Child } from 'lib/types/widget.js';
import Label from 'types/widgets/label.js';
const { confirmation, shutdown, logout, sleep, caffeine, reboot } = options.menus.dashboard.powermenu;

const Power = (): BoxWidget => {
    const handleClick = (action: PowerOptions): void => {
        const actions = {
            shutdown: shutdown.value,
            reboot: reboot.value,
            logout: logout.value,
            sleep: sleep.value,
            caffeine: caffeine.value,
        };
        App.closeWindow('dashboardmenu');

        if (!confirmation.value) {
            Utils.execAsync(actions[action]).catch((err) =>
                console.error(`Failed to execute ${action} command. Error: ${err}`),
            );
        } else {
            powermenu.action(action);
        }
    };

    const getIconForButton = (txtIcon: string): Label<Child> => {
        return Widget.Label({
            className: 'txt-icon',
            label: txtIcon,
        });
    };

    return Widget.Box({
        class_name: 'dashboard-card power-menu-container',
        hpack: 'fill',
        vpack: 'fill',
        expand: true,
        children: [
            Widget.Button({
                class_name: 'dashboard-button shutdown',
                on_clicked: () => handleClick('shutdown'),
                tooltip_text: 'Shut Down',
                hexpand: true,
                child: getIconForButton('󰐥'),
            }),
            Widget.Button({
                class_name: 'dashboard-button restart',
                on_clicked: () => handleClick('reboot'),
                tooltip_text: 'Restart',
                hexpand: true,
                child: getIconForButton('󰜉'),
            }),
            Widget.Button({
                class_name: 'dashboard-button lock',
                on_clicked: () => handleClick('logout'),
                tooltip_text: 'Log Out',
                hexpand: true,
                child: getIconForButton('󰿅'),
            }),
            Widget.Button({
                class_name: 'dashboard-button sleep',
                on_clicked: () => handleClick('sleep'),
                tooltip_text: 'Sleep',
                hexpand: true,
                child: getIconForButton('󰤄'),
            }),
            Widget.Button({
                class_name: 'dashboard-button caffeine',
                on_clicked: () => {
                    return Utils.execAsync(`${App.configDir}/services/caffeine.sh toggle`).catch((err) =>
                        console.error(err),
                    );
                },
                tooltip_text: 'Caffeine',
                hexpand: true,
                child: getIconForButton(''),
            }),
        ],
    });
};

export { Power };
