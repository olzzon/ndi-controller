# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.6](https://github.com/olzzon/ndi-ember-mtx/compare/v0.0.5...v0.0.6) (2021-09-30)


### Bug Fixes

* type watched server instead of emberServer ([a3d2d2a](https://github.com/olzzon/ndi-ember-mtx/commit/a3d2d2a30a25e4b5ec878332a6105efd85dcfaa5))
* Web client is using matrix-change but VSM uses the Ember matrix-connect both are now supported ([14a3a78](https://github.com/olzzon/ndi-ember-mtx/commit/14a3a7876b31641f298fbd7860e33afa2f82cd74))

### [0.0.5](https://github.com/olzzon/ndi-ember-mtx/compare/v0.0.4...v0.0.5) (2021-09-15)


### Bug Fixes

* css issue because of double .matrixsource class in 2 different css files ([b4f6595](https://github.com/olzzon/ndi-ember-mtx/commit/b4f6595f1e8a77d6a50d4f359e4813ffb7400b1f))

### [0.0.4](https://github.com/olzzon/ndi-ember-mtx/compare/v0.0.3...v0.0.4) (2021-09-14)


### Features

* update Ember MTX naming ([b8ce370](https://github.com/olzzon/ndi-ember-mtx/commit/b8ce3701b56ea1bef10f85d131edd1e05342776b))


### Bug Fixes

* Client MTX did an +1 offset in the Ember MTX ([95f0623](https://github.com/olzzon/ndi-ember-mtx/commit/95f06234d5c864a3126ce68f0f5cd4975eee7170))
* Offset in Ember MTX between localClient and VSM ([5c2c543](https://github.com/olzzon/ndi-ember-mtx/commit/5c2c543c5b24e08dc5faa21e3c992f71968dd9a6))

### [0.0.3](https://github.com/olzzon/ndi-ember-mtx/compare/v0.0.2...v0.0.3) (2021-09-08)


### Features

* add NDI trademark info ([0efe888](https://github.com/olzzon/ndi-ember-mtx/commit/0efe8888196b2bcf240cf992b5633f04ac2b037e))

### 0.0.2 (2021-09-06)


### Features

* better NDI lib error handling ([7a287a0](https://github.com/olzzon/ndi-ember-mtx/commit/7a287a0ee21101af3986331b78adb8b7fd87a922))
* client - NDI mtx - Ember mtx relation established ([c740c78](https://github.com/olzzon/ndi-ember-mtx/commit/c740c7880c87421e9e270616a77bff65b769d369))
* client panel for controlling 1 target (http://localhost:5901/?target=xx) ([7d041f2](https://github.com/olzzon/ndi-ember-mtx/commit/7d041f237adeb1daeae43b7a2f0f991b152a3936))
* client source target list with source selector ([9ac33a3](https://github.com/olzzon/ndi-ember-mtx/commit/9ac33a397775ad9d6e454405b1d20575c7371028))
* code cleanup, better logging, update README.md ([000216b](https://github.com/olzzon/ndi-ember-mtx/commit/000216bf370c34b4954721e670b0ae6ed9537101))
* Dockerfile expose ports for NDI destinations ([faf903e](https://github.com/olzzon/ndi-ember-mtx/commit/faf903e9f7f1b5e3be73835281ead3e1f00e67a4))
* full functioning MTX view ([83315e8](https://github.com/olzzon/ndi-ember-mtx/commit/83315e8513016cccebb1ec643a2f01ef88b9c3de))
* GET /state returns JSON with current state ([933bdfb](https://github.com/olzzon/ndi-ember-mtx/commit/933bdfbdebe37c5348c412cedf486adc28035506))
* GUI css and cleanup ([9875284](https://github.com/olzzon/ndi-ember-mtx/commit/98752845512cecb836d8ef05dde5d3db75f7fa57))
* initial ember implementation ([3db89c8](https://github.com/olzzon/ndi-ember-mtx/commit/3db89c86603b0cdaeaf1015e3f24d56b1fc2c119))
* initial mtx view ([37ca803](https://github.com/olzzon/ndi-ember-mtx/commit/37ca80364fbaf57ef9d2d33c7b9cbc4611ed1119))
* NDI routing working with multiple targets ([8e155e4](https://github.com/olzzon/ndi-ember-mtx/commit/8e155e4057d483d7a4c00d05789c566811700e61))
* prebuild .exe file for windows ([3c3643e](https://github.com/olzzon/ndi-ember-mtx/commit/3c3643e6a94b33c9790b5705baf3cd5affcf0c64))
* prepare move to dnsSource enstead of ip ([951a449](https://github.com/olzzon/ndi-ember-mtx/commit/951a449f4d40878baee3a3a2e118c5fc3bf7f20d))
* prepare wb-client, build process and refactoring ([400503e](https://github.com/olzzon/ndi-ember-mtx/commit/400503e1112ba4287cc68651a2303e71a241481b))
* preparing windows support ([1f03003](https://github.com/olzzon/ndi-ember-mtx/commit/1f030039850038b46a93ccb0d5a796487a73dbd8))
* Rename online / offline button ([8ee5af0](https://github.com/olzzon/ndi-ember-mtx/commit/8ee5af0f50d4c1c09a976575df6ffb0b4a3eb2e9))
* REST API POST /setmatrix working ([91ec1f4](https://github.com/olzzon/ndi-ember-mtx/commit/91ec1f4801c0dcd3e096f655e2533858037a3242))
* Socket IO to client working ([2071628](https://github.com/olzzon/ndi-ember-mtx/commit/207162832e9efda65d4244a4e41258a973110dac))
* update gui for better scaling on windows chrome ([cd0f2b6](https://github.com/olzzon/ndi-ember-mtx/commit/cd0f2b64c093da822cc0c4d212b98b9b7d297cb5))
* update targets.json when changing mtx ([a6a63bd](https://github.com/olzzon/ndi-ember-mtx/commit/a6a63bd8bfe286273e235738f24f34aa58071b5c))
* update targts example ([3ef48d1](https://github.com/olzzon/ndi-ember-mtx/commit/3ef48d1d08dbc27096fead9749e97d21983d6f92))
* windows support (posting both dnsName AND url) ([c03a44c](https://github.com/olzzon/ndi-ember-mtx/commit/c03a44cffb33177151776138f2ee002de19d91de))
* working change NDI routing source in client ([81ac0c0](https://github.com/olzzon/ndi-ember-mtx/commit/81ac0c00eb727971a8b06726751b4c0a56f221c0))


### Bug Fixes

* alphine uses apk ([ce259e7](https://github.com/olzzon/ndi-ember-mtx/commit/ce259e7e6af0553a29df9774a5c707b7e443e840))
* c memory cleanup ([0abc367](https://github.com/olzzon/ndi-ember-mtx/commit/0abc367784bdcdffc77cb8f9841113ebc912cd81))
* CI - cp binding ([757b027](https://github.com/olzzon/ndi-ember-mtx/commit/757b027352dd346b9f7a1f74177c45bd014bae57))
* CI - typo ([88e13b5](https://github.com/olzzon/ndi-ember-mtx/commit/88e13b5889f1d2ad2a767fe0628ff0b2ae02c729))
* CI - update apt ([8c4cbf5](https://github.com/olzzon/ndi-ember-mtx/commit/8c4cbf5ad631bea95c60ecba85e74fa71eb0aa7c))
* CI add libavahi-common-dev + create dir ([80fa217](https://github.com/olzzon/ndi-ember-mtx/commit/80fa217649f380d42b43feefe7adb6919bd2eb3f))
* CircleCI build - .so files places correctly and avahi client added ([075aa26](https://github.com/olzzon/ndi-ember-mtx/commit/075aa261d2e5ab2a61d3c357c0fb3d675c759e4d))
* circleci sudo apt install ([0363472](https://github.com/olzzon/ndi-ember-mtx/commit/0363472785208a299b34817de978f96567ecce3e))
* circleci sudo for yarn add global node-gyp ([f7160dc](https://github.com/olzzon/ndi-ember-mtx/commit/f7160dc72a1a90d769f0e354fb332aaaed092169))
* circleCI use same node ver as on machine ([5c43c1d](https://github.com/olzzon/ndi-ember-mtx/commit/5c43c1d4aabd7d186750ef06ce430347546d59bd))
* copy libndi files in yml instead of in binding.gyp because of dependencies ([694eb07](https://github.com/olzzon/ndi-ember-mtx/commit/694eb074414c28e16f20823cc078eb60d871a974))
* cp libndi files in docker containrer ([1c6f0da](https://github.com/olzzon/ndi-ember-mtx/commit/1c6f0da2c994bdb7d3a10a63736ec33242c7623b))
* Docker copy lib files ([a66a242](https://github.com/olzzon/ndi-ember-mtx/commit/a66a242d6ab9a0dd24a221a88a003be9e4bf31fd))
* Dockerfile add avahi support ([86a7a98](https://github.com/olzzon/ndi-ember-mtx/commit/86a7a9869967eb119714a67f01efd6e1fc6f0d62))
* Dockerfile add g++ ([07bf6a0](https://github.com/olzzon/ndi-ember-mtx/commit/07bf6a0cdab45dc12435284fc1f90d356974cefd))
* dockerfile add gcompat ([e08807a](https://github.com/olzzon/ndi-ember-mtx/commit/e08807ac8a6c7042877605d0506147a99a03dd37))
* Dockerfile copy ([f58beda](https://github.com/olzzon/ndi-ember-mtx/commit/f58beda7c43c6cd00c18ea2f7ada46af80d4a1cb))
* dockerfile copy context from before deleting it by adding workdir ([ef02589](https://github.com/olzzon/ndi-ember-mtx/commit/ef025890f9dbd6139f99f9ec2f1ef8afaa79712d))
* don´t create dir - update docker file ([5c0a206](https://github.com/olzzon/ndi-ember-mtx/commit/5c0a2067d79fe9876bd5c6eca7dc06c67f76e059))
* forgot -y in apt-get ([f887877](https://github.com/olzzon/ndi-ember-mtx/commit/f8878772880c358ca844a477c0fdf1eaaedf9967))
* forgot saving dockerfile in last commit ([9f92d57](https://github.com/olzzon/ndi-ember-mtx/commit/9f92d57828e7faa035f397e91328d340f29cf47d))
* free was referencing to var instead of pointer ([4e2633d](https://github.com/olzzon/ndi-ember-mtx/commit/4e2633dda53538139e1bf65a44a7e2c8bea9453c))
* napivalue str was unused ([85da95a](https://github.com/olzzon/ndi-ember-mtx/commit/85da95a534affb416494dc8702a47676430b0784))
* place libndi in /usr/lib ([3aa95b8](https://github.com/olzzon/ndi-ember-mtx/commit/3aa95b839356dc5d84562760b32290af61bd664c))
* remove sudo in dockerfile ([7aea04a](https://github.com/olzzon/ndi-ember-mtx/commit/7aea04a534011ed32f1b9c1f6ea46d708006bfa4))
* sudo cp ([c85cdb0](https://github.com/olzzon/ndi-ember-mtx/commit/c85cdb0f6f9ebf85ec8baac6f66de06e33abc64d))
* type ([3d5bd30](https://github.com/olzzon/ndi-ember-mtx/commit/3d5bd303742a64dc61bcb9de8a2eeade099f9254))
* type - yarn add instead of yarn install ([0fd4242](https://github.com/olzzon/ndi-ember-mtx/commit/0fd42420a3516c145ab25031e708d953f86f6ce6))
* type called yarn instead of apt ([9b700f3](https://github.com/olzzon/ndi-ember-mtx/commit/9b700f30851e57783c81dd5397f549b4cfe73d64))
* update dockerfile with worksdir prior to copy ([cffa752](https://github.com/olzzon/ndi-ember-mtx/commit/cffa752ff9f715bde7633e3a5352d95799232943))
