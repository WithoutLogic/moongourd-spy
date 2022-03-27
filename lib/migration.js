"use strict";

const DefaultSettings = {
	"simplifiedOutput": false,
	"autoCheckAtInspect": true,
	"keepContinentsSequence": false,
	"continentsToCheck": [
		{
			"continent": 468,
			"boss": 3000,
			"name": "Imperator",
			"mgVer": 1,
			"expectedDpsAvg": 12000000
		},
		{
			"continent": 3109,
			"boss": 2000,
			"name": "Hellen",
			"mgVer": 1,
			"expectedDpsAvg": 6500000
		},
		{
			"continent": 920,
			"boss": 3000,
			"name": "Antaroth",
			"mgVer": 3,
			"expectedDpsAvg": 10000000
		},
		{
			"continent": 3209,
			"boss": 2000,
			"name": "Slayer Hellen",
			"mgVer": 1,
			"expectedDpsAvg": 8500000
		},
		{
			"continent": 3047,
			"boss": 1000,
			"name": "Shandra Manaya",
			"mgVer": 1,
			"expectedDpsAvg": 10000000
		}
	]
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined) {
		// Migrate legacy config file
		return { ...DefaultSettings, ...settings };
	} else if (from_ver === null) {
		// No config file exists, use default settings
		return DefaultSettings;
	} else {
		// Migrate from older version (using the new system) to latest one
		if (from_ver + 1 < to_ver) {
			// Recursively upgrade in one-version steps
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}

		switch (to_ver) {
			case 2:
				settings.keepContinentsSequence = false;
				break;
			case 3: 
				settings.simplifiedOutput = false;
				break;
		}

		return settings;
	}
};