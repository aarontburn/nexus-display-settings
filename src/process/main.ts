import { Process, Setting } from "@nexus-app/nexus-module-builder"
import { BooleanSetting } from "@nexus-app/nexus-module-builder/settings/types"
import { BaseWindow } from "electron";

// These is replaced to the ID specified in export-config.js during export. DO NOT MODIFY.
const MODULE_ID: string = "{EXPORTED_MODULE_ID}";
const MODULE_NAME: string = "{EXPORTED_MODULE_NAME}";
// ---------------------------------------------------

export default class SampleProcess extends Process {

    public constructor() {
        super({
            moduleID: MODULE_ID,
            moduleName: MODULE_NAME
        });
    }

    public async initialize(): Promise<void> {
        await super.initialize();
    }

    // Add settings/section headers.
    public registerSettings(): (Setting<unknown> | string)[] {
        return [
            new BooleanSetting(this)
                .setDefault(false)
                .setName("Kiosk Mode")
                .setDescription("Enable/disable kiosk mode.")
                .setAccessID('in-kiosk-mode'),

            new BooleanSetting(this)
                .setDefault(false)
                .setName("Full Screen")
                .setDescription("Enable/disable fullscreen mode.")
                .setAccessID('fullscreen'),
        ];
    }

    // Fired whenever a setting is modified.
    public async onSettingModified(modifiedSetting?: Setting<unknown>): Promise<void> {
        if (modifiedSetting?.getAccessID() === "in-kiosk-mode") {
            const inKioskMode: boolean = modifiedSetting.getValue() as boolean;
            const window: BaseWindow = (await this.requestExternal("nexus.Main", "get-primary-window")).body;
            window.setKiosk(inKioskMode)
            console.info(`[${MODULE_NAME}] ${inKioskMode ? "Enabling" : "Disabling"} kiosk mode`);

            
        } else if (modifiedSetting?.getAccessID() === "fullscreen") {
            const inFullScreen: boolean = modifiedSetting.getValue() as boolean;

            const window: BaseWindow = (await this.requestExternal("nexus.Main", "get-primary-window")).body;
            window.setFullScreen(modifiedSetting.getValue() as boolean)

            console.info(`[${MODULE_NAME}] ${inFullScreen ? "Enabling" : "Disabling"} fullscreen mode`);
        }

    }

}