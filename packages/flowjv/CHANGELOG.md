# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.10.0](https://github.com/kishoreiiitn/flowjv/compare/v0.9.0...v0.10.0) (2021-03-17)

**Note:** Version bump only for package flowjv





# [0.9.0](https://github.com/kishoreiiitn/flowjv/compare/v0.8.0...v0.9.0) (2021-03-02)


### Bug Fixes

* compile itemSchema in array entry ([da1f77a](https://github.com/kishoreiiitn/flowjv/commit/da1f77a393e196b7fec91abced71b11926eafa32))
* delete array element if index falls within array length ([9e44feb](https://github.com/kishoreiiitn/flowjv/commit/9e44feb118fd118b484e651edab93c33a4e84709))
* fix block compiling (bug at nesting). And few enhancements ([7f09cb7](https://github.com/kishoreiiitn/flowjv/commit/7f09cb7c6ae3255ea916d15edb6a719667bfbb5d))
* ignore even if value is not present ([0cca450](https://github.com/kishoreiiitn/flowjv/commit/0cca450e509d72de6bb2aeef296cc4f380480830))


### Features

* add custom ui configuration capability to array type! ([4e2bc6e](https://github.com/kishoreiiitn/flowjv/commit/4e2bc6ec8af4c0ebb40b80c0aca8d5af45738403))
* add support for array in flowjv ([2b8f343](https://github.com/kishoreiiitn/flowjv/commit/2b8f3437f5ba577abfb32d84bc45c2b807b8e468))
* make context readonly. Do not include in dependencies ([7d278be](https://github.com/kishoreiiitn/flowjv/commit/7d278bee497fa7854f8d15dd888f51ebc84dc440))





# [0.8.0](https://github.com/kishoreiiitn/flowjv/compare/v0.7.3...v0.8.0) (2021-02-11)


### Features

* add ability to use dependencies for rendering only relevant fields ([fe16e91](https://github.com/kishoreiiitn/flowjv/commit/fe16e915618cc4e573784ce65bf363704724122b))
* change JSON expression format for consistency ([d0f6886](https://github.com/kishoreiiitn/flowjv/commit/d0f68862c7b5f991622d7bdffd6beb3679074ad4))


### BREAKING CHANGES

* JSON Expression no more has format specific to type of command. Now its consistent,
more readable and very easy in terms of logic.





## [0.7.3](https://github.com/kishoreiiitn/flowjv/compare/v0.7.2...v0.7.3) (2021-02-10)

**Note:** Version bump only for package flowjv





## [0.7.2](https://github.com/kishoreiiitn/flowjv/compare/v0.7.1...v0.7.2) (2021-02-10)

**Note:** Version bump only for package flowjv





## [0.7.1](https://github.com/kishoreiiitn/flowjv/compare/v0.7.0...v0.7.1) (2021-02-10)

**Note:** Version bump only for package flowjv





# [0.7.0](https://github.com/kishoreiiitn/flowjv/compare/v0.5.3...v0.7.0) (2021-02-10)


### Bug Fixes

* refpath types. Move to yarn workspace. ([ecb804c](https://github.com/kishoreiiitn/flowjv/commit/ecb804c50c7fc5351ce2404bc1c93745bf619bb5))


### Features

* add ability to extract dependencies from a JSON Expression ([fd386fa](https://github.com/kishoreiiitn/flowjv/commit/fd386fa83e032041a6bd962de65f18da70dee022))
* add ability to extract dependencies from JSON expression! ([eb14141](https://github.com/kishoreiiitn/flowjv/commit/eb141412b2913160b113ff31c15bbdddcd2f970b))
* add ability to nest if blocks. Complete changeover to the internal logic ([aa532b8](https://github.com/kishoreiiitn/flowjv/commit/aa532b852cefd993d439f9ffe8af5c5043c3d877))
* add UI types to flowjv ([887368c](https://github.com/kishoreiiitn/flowjv/commit/887368ca88438789c592234808b4344363beb64a))
* add utilitiies to navigate the schema ([d96a980](https://github.com/kishoreiiitn/flowjv/commit/d96a980ff0e2e814e84ebc0e7fc5b599389625a9))
* change complete architecture of flowjv ([52092a5](https://github.com/kishoreiiitn/flowjv/commit/52092a56fed60ce65f96eb96a3b4208beee7d9ed))
* get rid of lodash ([b35b7cd](https://github.com/kishoreiiitn/flowjv/commit/b35b7cdd22e30e30dd62af4660c4ed37810a0e10))


### BREAKING CHANGES

* FlowJV is complete rewritten. The underlying principles remain same, but the schema
is significantly modified. Now FlowJV has better types support, seamless nested conditional blocks,
automatically infer data dependencies from JSON expression. Now flowjv-react-custom package uses
material ui and not custom css as was the case before.
* Now string in refPath cannot have bracket syntax. (i.e "arr[0]" is no more
supported. Rather should be accessed through "arr.0"). Also, object properties in flowjv cannot have
numerical index. Cannot even be casted to string. This maybe mitigated in future, but not now as per
the design.





# [0.6.0](https://github.com/kishoreiiitn/flowjv/compare/v0.5.3...v0.6.0) (2021-02-10)


### Bug Fixes

* refpath types. Move to yarn workspace. ([ecb804c](https://github.com/kishoreiiitn/flowjv/commit/ecb804c50c7fc5351ce2404bc1c93745bf619bb5))


### Features

* add ability to extract dependencies from a JSON Expression ([fd386fa](https://github.com/kishoreiiitn/flowjv/commit/fd386fa83e032041a6bd962de65f18da70dee022))
* add ability to extract dependencies from JSON expression! ([eb14141](https://github.com/kishoreiiitn/flowjv/commit/eb141412b2913160b113ff31c15bbdddcd2f970b))
* add ability to nest if blocks. Complete changeover to the internal logic ([aa532b8](https://github.com/kishoreiiitn/flowjv/commit/aa532b852cefd993d439f9ffe8af5c5043c3d877))
* add UI types to flowjv ([887368c](https://github.com/kishoreiiitn/flowjv/commit/887368ca88438789c592234808b4344363beb64a))
* add utilitiies to navigate the schema ([d96a980](https://github.com/kishoreiiitn/flowjv/commit/d96a980ff0e2e814e84ebc0e7fc5b599389625a9))
* change complete architecture of flowjv ([52092a5](https://github.com/kishoreiiitn/flowjv/commit/52092a56fed60ce65f96eb96a3b4208beee7d9ed))
* get rid of lodash ([b35b7cd](https://github.com/kishoreiiitn/flowjv/commit/b35b7cdd22e30e30dd62af4660c4ed37810a0e10))


### BREAKING CHANGES

* FlowJV is complete rewritten. The underlying principles remain same, but the schema
is significantly modified. Now FlowJV has better types support, seamless nested conditional blocks,
automatically infer data dependencies from JSON expression. Now flowjv-react-custom package uses
material ui and not custom css as was the case before.
* Now string in refPath cannot have bracket syntax. (i.e "arr[0]" is no more
supported. Rather should be accessed through "arr.0"). Also, object properties in flowjv cannot have
numerical index. Cannot even be casted to string. This maybe mitigated in future, but not now as per
the design.





## [0.5.3](https://github.com/kishoreiiitn/flowjv/compare/v0.5.2...v0.5.3) (2020-08-08)

**Note:** Version bump only for package flowjv





## [0.5.2](https://github.com/kishoreiiitn/flowjv/compare/v0.5.1...v0.5.2) (2020-08-05)

**Note:** Version bump only for package flowjv





## [0.5.1](https://github.com/kishoreiiitn/flowjv/compare/v0.5.0...v0.5.1) (2020-08-05)

**Note:** Version bump only for package flowjv





# [0.5.0](https://github.com/kishoreiiitn/flowjv/compare/v0.4.4...v0.5.0) (2020-08-05)


### Bug Fixes

* fix key dupliaction logic when in if condition ([0bccc1b](https://github.com/kishoreiiitn/flowjv/commit/0bccc1b5a4a93a710c922a0591108bae93412e76))


### Features

* remove ignoreKey configuration from object type ([b08e53b](https://github.com/kishoreiiitn/flowjv/commit/b08e53b9f423a9f0bb169f33bca2b48539ecec1f))
* separate ref functionality to make it more versatile going forward ([3e04838](https://github.com/kishoreiiitn/flowjv/commit/3e048381bfe0ca2496f81a6555450c0f47a54e89))





## [0.4.4](https://github.com/kishoreiiitn/flowjv/compare/v0.4.3...v0.4.4) (2020-07-10)


### Bug Fixes

* Fix setTouch bug that prevents custom type to be touched on Submit ([bd45ecc](https://github.com/kishoreiiitn/flowjv/commit/bd45ecc8dcad8139642edaeb273564d758464d8d))





## [0.4.3](https://github.com/kishoreiiitn/flowjv/compare/v0.4.2...v0.4.3) (2020-07-05)


### Bug Fixes

* move options param as 3rd argument ([3170239](https://github.com/kishoreiiitn/flowjv/commit/3170239b37cafc93f835eafaf062433369f88ed4))





## [0.4.2](https://github.com/kishoreiiitn/flowjv/compare/v0.4.0...v0.4.2) (2020-06-30)

**Note:** Version bump only for package flowjv





## [0.4.1](https://github.com/kishoreiiitn/flowjv/compare/v0.4.0...v0.4.1) (2020-06-29)

**Note:** Version bump only for package flowjv





# [0.4.0](https://github.com/kishoreiiitn/flowjv/compare/v0.3.9...v0.4.0) (2020-06-29)


### Features

* add custom atom type to address user defined data type ([781139a](https://github.com/kishoreiiitn/flowjv/commit/781139a251ac5cd88dd31254b0b3850b2a1bff1e))
* change isOptional variant to isRequired ([a850747](https://github.com/kishoreiiitn/flowjv/commit/a850747fa01e823927a09b4c9e6b95eee1f728f6))





## [0.3.9](https://github.com/kishoreiiitn/flowjv/compare/v0.3.8...v0.3.9) (2020-06-29)

**Note:** Version bump only for package flowjv





## [0.3.8](https://github.com/kishoreiiitn/flowjv/compare/v0.3.7...v0.3.8) (2020-06-29)

**Note:** Version bump only for package flowjv





## [0.3.7](https://github.com/kishoreiiitn/flowjv/compare/v0.3.6...v0.3.7) (2020-06-29)


### Bug Fixes

* **blocks/object.ts:** fix the ref passed to nested object or property ([3b586ef](https://github.com/kishoreiiitn/flowjv/commit/3b586ef2b20ab3cf03e4d23b4cea434b57c72489))





## [0.3.6](https://github.com/kishoreiiitn/flowjv/compare/v0.3.5...v0.3.6) (2020-06-28)


### Bug Fixes

* do not know why lerna changed to independent mode ([c4197df](https://github.com/kishoreiiitn/flowjv/commit/c4197df881c6be49482007420218ac320504b8c9))





## [0.3.5](https://github.com/kishoreiiitn/flowjv/compare/v0.3.4...v0.3.5) (2020-06-28)

**Note:** Version bump only for package flowjv





## [0.3.4](https://github.com/kishoreiiitn/flowjv/compare/v0.3.3...v0.3.4) (2020-06-28)


### Bug Fixes

* fix aggressive option for primitive type ([9e1f69d](https://github.com/kishoreiiitn/flowjv/commit/9e1f69de1b3477c25a0c6f3c816ae1bf271224fd))





## [0.3.3](https://github.com/kishoreiiitn/flowjv/compare/v0.3.2...v0.3.3) (2020-06-28)


### Bug Fixes

* add type check to enum. Change isRequired field to isOptional ([7f196c3](https://github.com/kishoreiiitn/flowjv/commit/7f196c3dd4acb41843ea0f850e0814c27dffaba6))





## [0.3.2](https://github.com/kishoreiiitn/flowjv/compare/v0.3.1...v0.3.2) (2020-06-28)


### Bug Fixes

* move lodash to dependency ([d54f773](https://github.com/kishoreiiitn/flowjv/commit/d54f7735f76c3b027bcf824128d483f62aed198e))





## [0.3.1](https://github.com/kishoreiiitn/flowjv/compare/v0.3.0...v0.3.1) (2020-06-27)

**Note:** Version bump only for package flowjv





# [0.3.0](https://github.com/kishoreiiitn/flowjv/compare/v0.2.0...v0.3.0) (2020-06-27)


### Features

* add typechecking option to flowjv and required field at atom level ([90f5227](https://github.com/kishoreiiitn/flowjv/commit/90f522704c2e036c49df93dfa8efebd96316f291))
* update function callback structure for JSONExpression ([a5f7e67](https://github.com/kishoreiiitn/flowjv/commit/a5f7e67a9fe0c1f876c268ee6ce9ca0abb2be2b9))





# [0.2.0](https://github.com/kishoreiiitn/flowjv/compare/v0.0.10...v0.2.0) (2020-06-19)


### Features

* add ability customize placement of UI elements in the form ([5fcac1d](https://github.com/kishoreiiitn/flowjv/commit/5fcac1d37510019d7a3c0c84987ca44cc0e16ad9))
* add enforceSchema option to enforceSchema on data given ([dafb62d](https://github.com/kishoreiiitn/flowjv/commit/dafb62d76ab671afa1165c9c078d59fe3cc8cff9))
* add lookup for flowjv to integrate nicely with flowjv forms ([951a652](https://github.com/kishoreiiitn/flowjv/commit/951a65243134ca1941a8bb249631f699a75a3d86))
* make flowSchema define only an object. primitives go in as properties to it ([04ff586](https://github.com/kishoreiiitn/flowjv/commit/04ff586d8415783666f28e6d9130af6e54e897d0))





# [0.1.0](https://github.com/kishoreiiitn/flowjv/compare/v0.0.11...v0.1.0) (2020-06-12)

**Note:** Version bump only for package flowjv





## [0.0.11](https://github.com/kishoreiiitn/flowjv/compare/v0.0.10...v0.0.11) (2020-06-12)

**Note:** Version bump only for package flowjv
