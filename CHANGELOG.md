# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.6.0](https://github.com/pkishoez/flowjv/compare/v0.5.3...v0.6.0) (2021-02-10)


### Bug Fixes

* refpath types. Move to yarn workspace. ([ecb804c](https://github.com/pkishoez/flowjv/commit/ecb804c50c7fc5351ce2404bc1c93745bf619bb5))


### Features

* add ability to extract dependencies from a JSON Expression ([fd386fa](https://github.com/pkishoez/flowjv/commit/fd386fa83e032041a6bd962de65f18da70dee022))
* add ability to extract dependencies from JSON expression! ([eb14141](https://github.com/pkishoez/flowjv/commit/eb141412b2913160b113ff31c15bbdddcd2f970b))
* add ability to nest if blocks. Complete changeover to the internal logic ([aa532b8](https://github.com/pkishoez/flowjv/commit/aa532b852cefd993d439f9ffe8af5c5043c3d877))
* add UI types to flowjv ([887368c](https://github.com/pkishoez/flowjv/commit/887368ca88438789c592234808b4344363beb64a))
* add utilitiies to navigate the schema ([d96a980](https://github.com/pkishoez/flowjv/commit/d96a980ff0e2e814e84ebc0e7fc5b599389625a9))
* change complete architecture of flowjv ([52092a5](https://github.com/pkishoez/flowjv/commit/52092a56fed60ce65f96eb96a3b4208beee7d9ed))
* get rid of lodash ([b35b7cd](https://github.com/pkishoez/flowjv/commit/b35b7cdd22e30e30dd62af4660c4ed37810a0e10))


### BREAKING CHANGES

* FlowJV is complete rewritten. The underlying principles remain same, but the schema
is significantly modified. Now FlowJV has better types support, seamless nested conditional blocks,
automatically infer data dependencies from JSON expression. Now flowjv-react-custom package uses
material ui and not custom css as was the case before.
* Now string in refPath cannot have bracket syntax. (i.e "arr[0]" is no more
supported. Rather should be accessed through "arr.0"). Also, object properties in flowjv cannot have
numerical index. Cannot even be casted to string. This maybe mitigated in future, but not now as per
the design.





## [0.5.3](https://github.com/pkishoez/flowjv/compare/v0.5.2...v0.5.3) (2020-08-08)

**Note:** Version bump only for package flowjv-workspace





## [0.5.2](https://github.com/pkishoez/flowjv/compare/v0.5.1...v0.5.2) (2020-08-05)


### Bug Fixes

* fix framer animation on if condition ([851f550](https://github.com/pkishoez/flowjv/commit/851f550ce4c1eff6599d6466440cb1b093bb5ed4))





## [0.5.1](https://github.com/pkishoez/flowjv/compare/v0.5.0...v0.5.1) (2020-08-05)

**Note:** Version bump only for package flowjv-workspace





# [0.5.0](https://github.com/pkishoez/flowjv/compare/v0.4.4...v0.5.0) (2020-08-05)


### Bug Fixes

* fix key dupliaction logic when in if condition ([0bccc1b](https://github.com/pkishoez/flowjv/commit/0bccc1b5a4a93a710c922a0591108bae93412e76))
* ignore cssnano for now. As it's causing postcss to break ([74ef7b4](https://github.com/pkishoez/flowjv/commit/74ef7b4348507517844baa230d553e62b248a974))


### Features

* move custom flowjv renderers to separate packages ([f416e4b](https://github.com/pkishoez/flowjv/commit/f416e4b193e0d65afd814129e591ad8554f51c4b))
* remove ignoreKey configuration from object type ([b08e53b](https://github.com/pkishoez/flowjv/commit/b08e53b9f423a9f0bb169f33bca2b48539ecec1f))
* separate ref functionality to make it more versatile going forward ([3e04838](https://github.com/pkishoez/flowjv/commit/3e048381bfe0ca2496f81a6555450c0f47a54e89))


### BREAKING CHANGES

* Move flowjv configurations to separate packages.





## [0.4.4](https://github.com/pkishoez/flowjv/compare/v0.4.3...v0.4.4) (2020-07-10)


### Bug Fixes

* export flowjv functions and types from flowjv-react ([537a388](https://github.com/pkishoez/flowjv/commit/537a388b456a0ca565f5a25de453e4c54a0edf4b))
* Fix setTouch bug that prevents custom type to be touched on Submit ([bd45ecc](https://github.com/pkishoez/flowjv/commit/bd45ecc8dcad8139642edaeb273564d758464d8d))





## [0.4.3](https://github.com/pkishoez/flowjv/compare/v0.4.2...v0.4.3) (2020-07-05)


### Bug Fixes

* move options param as 3rd argument ([3170239](https://github.com/pkishoez/flowjv/commit/3170239b37cafc93f835eafaf062433369f88ed4))





## [0.4.2](https://github.com/pkishoez/flowjv/compare/v0.4.0...v0.4.2) (2020-06-30)


### Bug Fixes

* add normalize styles within flowjv form ([1993914](https://github.com/pkishoez/flowjv/commit/199391418f3c763ee6ec3d12a818e849d576cf98))
* normalize the behaviour of atom rendering ([69d733e](https://github.com/pkishoez/flowjv/commit/69d733ee660c115893ee84119dddee0491f12d6a))





## [0.4.1](https://github.com/pkishoez/flowjv/compare/v0.4.0...v0.4.1) (2020-06-29)


### Bug Fixes

* normalize the behaviour of atom rendering ([69d733e](https://github.com/pkishoez/flowjv/commit/69d733ee660c115893ee84119dddee0491f12d6a))





# [0.4.0](https://github.com/pkishoez/flowjv/compare/v0.3.9...v0.4.0) (2020-06-29)


### Bug Fixes

* fix styles. Some styles do not apply in published package ([8b22d03](https://github.com/pkishoez/flowjv/commit/8b22d03c1441892ec96ec8c2cce5fe0f22f4b786))


### Features

* add custom atom type to address user defined data type ([781139a](https://github.com/pkishoez/flowjv/commit/781139a251ac5cd88dd31254b0b3850b2a1bff1e))
* change isOptional variant to isRequired ([a850747](https://github.com/pkishoez/flowjv/commit/a850747fa01e823927a09b4c9e6b95eee1f728f6))





## [0.3.9](https://github.com/pkishoez/flowjv/compare/v0.3.8...v0.3.9) (2020-06-29)

**Note:** Version bump only for package flowjv-workspace





## [0.3.8](https://github.com/pkishoez/flowjv/compare/v0.3.7...v0.3.8) (2020-06-29)


### Bug Fixes

* lerna need to update dependencies automatically ([29b96aa](https://github.com/pkishoez/flowjv/commit/29b96aa539ad7e28e36cd8e351bb83e4b5cae171))





## [0.3.7](https://github.com/pkishoez/flowjv/compare/v0.3.6...v0.3.7) (2020-06-29)


### Bug Fixes

* **blocks/object.ts:** fix the ref passed to nested object or property ([3b586ef](https://github.com/pkishoez/flowjv/commit/3b586ef2b20ab3cf03e4d23b4cea434b57c72489))





## [0.3.6](https://github.com/pkishoez/flowjv/compare/v0.3.5...v0.3.6) (2020-06-28)


### Bug Fixes

* do not know why lerna changed to independent mode ([c4197df](https://github.com/pkishoez/flowjv/commit/c4197df881c6be49482007420218ac320504b8c9))





## [0.3.5](https://github.com/pkishoez/flowjv/compare/v0.3.4...v0.3.5) (2020-06-28)


### Bug Fixes

* make sure to build packages and test before committing ([feb2bd9](https://github.com/pkishoez/flowjv/commit/feb2bd9de278de20e95bbace415e319300475832))





## [0.3.4](https://github.com/pkishoez/flowjv/compare/v0.3.3...v0.3.4) (2020-06-28)


### Bug Fixes

* fix aggressive option for primitive type ([9e1f69d](https://github.com/pkishoez/flowjv/commit/9e1f69de1b3477c25a0c6f3c816ae1bf271224fd))





## [0.3.3](https://github.com/pkishoez/flowjv/compare/v0.3.2...v0.3.3) (2020-06-28)


### Bug Fixes

* add type check to enum. Change isRequired field to isOptional ([7f196c3](https://github.com/pkishoez/flowjv/commit/7f196c3dd4acb41843ea0f850e0814c27dffaba6))





## [0.3.2](https://github.com/pkishoez/flowjv/compare/v0.3.1...v0.3.2) (2020-06-28)


### Bug Fixes

* move lodash to dependency ([d54f773](https://github.com/pkishoez/flowjv/commit/d54f7735f76c3b027bcf824128d483f62aed198e))





## [0.3.1](https://github.com/pkishoez/flowjv/compare/v0.3.0...v0.3.1) (2020-06-27)

**Note:** Version bump only for package flowjv-workspace





# [0.3.0](https://github.com/pkishoez/flowjv/compare/v0.2.0...v0.3.0) (2020-06-27)


### Features

* add typechecking option to flowjv and required field at atom level ([90f5227](https://github.com/pkishoez/flowjv/commit/90f522704c2e036c49df93dfa8efebd96316f291))
* add utility for ui theme customization to default form config ([52de387](https://github.com/pkishoez/flowjv/commit/52de387389d2143c2a91b472f0a74a57f0f56517))
* update function callback structure for JSONExpression ([a5f7e67](https://github.com/pkishoez/flowjv/commit/a5f7e67a9fe0c1f876c268ee6ce9ca0abb2be2b9))





# [0.2.0](https://github.com/pkishoez/flowjv/compare/v0.0.10...v0.2.0) (2020-06-19)


### Features

* add ability customize placement of UI elements in the form ([5fcac1d](https://github.com/pkishoez/flowjv/commit/5fcac1d37510019d7a3c0c84987ca44cc0e16ad9))
* add enforceSchema option to enforceSchema on data given ([dafb62d](https://github.com/pkishoez/flowjv/commit/dafb62d76ab671afa1165c9c078d59fe3cc8cff9))
* add italic style ([c9d4e5f](https://github.com/pkishoez/flowjv/commit/c9d4e5f47c0634ccace69869708ad3d5ba63282c))
* add lookup for flowjv to integrate nicely with flowjv forms ([951a652](https://github.com/pkishoez/flowjv/commit/951a65243134ca1941a8bb249631f699a75a3d86))
* add styling for bold ([4bc7e9f](https://github.com/pkishoez/flowjv/commit/4bc7e9f40d4a7d573c36b487653093cd9a648d64))
* make flowSchema define only an object. primitives go in as properties to it ([04ff586](https://github.com/pkishoez/flowjv/commit/04ff586d8415783666f28e6d9130af6e54e897d0))





# [0.1.0](https://github.com/pkishoez/flowjv/compare/v0.0.11...v0.1.0) (2020-06-12)


### Features

* add italic style ([e8ebe7c](https://github.com/pkishoez/flowjv/commit/e8ebe7cbe9b5ebc725d01ee88d9e4bc76e601468))
* add styling for bold ([f5f1d0a](https://github.com/pkishoez/flowjv/commit/f5f1d0ae80873e9141e6f02a25b9f68c1960d28f))





## [0.0.11](https://github.com/pkishoez/flowjv/compare/v0.0.10...v0.0.11) (2020-06-12)

**Note:** Version bump only for package flowjv-workspace
