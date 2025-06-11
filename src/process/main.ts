import { Process, Setting } from "@nexus-app/nexus-module-builder"
import { BooleanSetting } from "@nexus-app/nexus-module-builder/settings/types"

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

    // This is called after all modules are registered the window is shown.
    public async initialize(): Promise<void> {
        await super.initialize();
        console.log(`[${MODULE_NAME}] has been initialized.`);
    }

    // Add settings/section headers.
    public registerSettings(): (Setting<unknown> | string)[] {
        return [
            "Sample Setting Group",
            new BooleanSetting(this)
                .setDefault(false)
                .setName("Sample Toggle Setting")
                .setDescription("An example of a true/false setting.")
                .setAccessID('sample_bool'),
        ];
    }

    // Fired whenever a setting is modified.
    public async onSettingModified(modifiedSetting?: Setting<unknown>): Promise<void> {
        if (modifiedSetting?.getAccessID() === "sample_bool") {
            console.info(`[${MODULE_NAME}] ${modifiedSetting.getName()} has been set to ${modifiedSetting.getValue()}.`);
        }
    }

}