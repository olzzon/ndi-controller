# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.1](https://github.com/olzzon/ndi-controller/compare/v1.2.0...v1.2.1) (2022-02-02)

## [1.2.0](https://github.com/olzzon/ndi-controller/compare/v1.1.0...v1.2.0) (2022-01-24)


### Features

* NDI copyright notice and link on MTX setup page ([88fd6a3](https://github.com/olzzon/ndi-controller/commit/88fd6a35ac8ba8c05cdc221eb806ba7616156ce6))
* REST API load a preset/salvo ([04269a0](https://github.com/olzzon/ndi-controller/commit/04269a085ad43fee79a47eaa2f283dabd1a9d6bd))
* REST API state includes sourcelist ([adbd1fb](https://github.com/olzzon/ndi-controller/commit/adbd1fb4ff07dcbdd34be4cc64ec4e17b2210818))


### Bug Fixes

* Ember protocol - toggled between source and index 0 when conneting to the same crosspoint twice. ([3c04b90](https://github.com/olzzon/ndi-controller/commit/3c04b9063f68e0212079bb368f3101b2def5571d))
* Update Ember MTX name to "NDI Controller" ([3813ca7](https://github.com/olzzon/ndi-controller/commit/3813ca77b1482c07db05c5bddd4e3d904c0a0bb7))

## [1.1.0](https://github.com/olzzon/ndi-controller/compare/v0.0.2...v1.1.0) (2022-01-07)


### Features

* add pgk for selfcontained nodejs build ([2487f58](https://github.com/olzzon/ndi-controller/commit/2487f58110fa32cd2ab27edf099c9c881b14d497))
* press and hold to save preset ([4f66098](https://github.com/olzzon/ndi-controller/commit/4f660980ce9924676a3a1ce045c207124e0050f4))
* Rename to Salvo from Preset ([84f9ac5](https://github.com/olzzon/ndi-controller/commit/84f9ac5e628997a95838fcd98bb3c847c40f51b4))


### Bug Fixes

* Ignore Ember source disconnect (clearing happens before setting a new source) ([55b9eca](https://github.com/olzzon/ndi-controller/commit/55b9eca84bf0072eef8c95cf3ff62f6155613c0b))

### 0.0.2 (2021-11-20)


### Features

* add discovered NDI sources to a source, save setitngs, update popup source. ([a0d58b7](https://github.com/olzzon/ndi-controller/commit/a0d58b77da1f747c91ae36eb57e8dec895017d11))
* add remove sources in settings ([db23ee9](https://github.com/olzzon/ndi-controller/commit/db23ee9a2a91a1f51459e98968102ac7d977add1))
* Add remove Targets in settings ([abbfdbd](https://github.com/olzzon/ndi-controller/commit/abbfdbd5fc70c78891fcf0c3980858b23a7d15a0))
* Default window size - GUI tweaks ([467bf17](https://github.com/olzzon/ndi-controller/commit/467bf17433fdd2f91590634fddc33f3045e16369))
* discover NDI sources, renaming, and button to discover in source popup settings ([618041e](https://github.com/olzzon/ndi-controller/commit/618041ecceaf1dbc52a87371c7bec0a0cd0c2c8d))
* DOT instead of X in matrix ([dd19034](https://github.com/olzzon/ndi-controller/commit/dd19034d3127bd683467281cab64bb3730e19eb2))
* GUI and added electron-builder ([ac06cf7](https://github.com/olzzon/ndi-controller/commit/ac06cf7a8ca1f2607562f422adbe8e8c64cefb36))
* GUI clean up ([7457637](https://github.com/olzzon/ndi-controller/commit/7457637e4f807573e6b358e341f9d681d8758b0d))
* GUI dimm buttons a bit ([de1b23c](https://github.com/olzzon/ndi-controller/commit/de1b23cd9eee898c0896b931568c16cac4b7bd4f))
* GUI logo added ([24dabad](https://github.com/olzzon/ndi-controller/commit/24dabad70dcab6fee4daf77e8b7b6193bdaed688))
* GUI logo update ([b257b31](https://github.com/olzzon/ndi-controller/commit/b257b318bc1e692ac958c90c874f4d9bb37ebbb4))
* GUI move settings to bottom ([2ee8823](https://github.com/olzzon/ndi-controller/commit/2ee8823c18409464163a0d5d222036a378f8ff6d))
* GUI popup ([ec92b58](https://github.com/olzzon/ndi-controller/commit/ec92b58a72d8a0e54aaee715e260ee6740bbfde5))
* GUI update settings view ([c4fe54b](https://github.com/olzzon/ndi-controller/commit/c4fe54b14fd64316e6146715fcc837ee842dc791))
* GUI updates ([ae66ec3](https://github.com/olzzon/ndi-controller/commit/ae66ec372e281ad589a88b0f9f79924febab240a))
* load and save presets ([8409052](https://github.com/olzzon/ndi-controller/commit/84090525094b9f9cd7cfc4ee4968243e9c687335))
* settings - delete source/target moved to pop screen ([8654f26](https://github.com/olzzon/ndi-controller/commit/8654f262e4fb9ad1ee01a51b1038ac0be7969987))
* settings save target list to file ([f9d5990](https://github.com/olzzon/ndi-controller/commit/f9d599069d531a90fa3463abedfccbfde45c1055))
* storage moved to os home folder ([2370dc5](https://github.com/olzzon/ndi-controller/commit/2370dc58fae0c1000f3e31f876d3e530443f0c89))
* Update NDILIB to 5 ([7506423](https://github.com/olzzon/ndi-controller/commit/7506423b01351cea3a60ba4afc9e3bb1465a57f3))
* update sources.json file from settings ([840ab14](https://github.com/olzzon/ndi-controller/commit/840ab14278be579f35704a0e675c31ae06114fe3))
* win build missing .lib file ([c4ec78e](https://github.com/olzzon/ndi-controller/commit/c4ec78e81c50f60a0ffe59d66eaadb7ac545e50d))


### Bug Fixes

* Electron-builder downgraded because of problem on windows - asar is disabled ([3917071](https://github.com/olzzon/ndi-controller/commit/3917071075e7821b77006a21d372241db06cf9a4))
* electron-builder unpack Release (ndi packages) ([b4a90cb](https://github.com/olzzon/ndi-controller/commit/b4a90cbe3cd650a13d74ab5e0e277572575b34ba))
* logo forgot file ([99fd1fc](https://github.com/olzzon/ndi-controller/commit/99fd1fc19fc4ae1e59f0b7636757346c65352a19))
* move back to NDI 4 (as some rewriting is needed for V5 ([107570d](https://github.com/olzzon/ndi-controller/commit/107570d9f2dca6e088aae14612fc371891f56825))
