# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.13.2](https://github.com/pkishorez/flowjv/compare/v0.13.1...v0.13.2) (2021-03-21)

**Note:** Version bump only for package flowjv-react





## [0.13.1](https://github.com/pkishorez/flowjv/compare/v0.13.0...v0.13.1) (2021-03-20)

**Note:** Version bump only for package flowjv-react





# [0.13.0](https://github.com/pkishorez/flowjv/compare/v0.12.3...v0.13.0) (2021-03-20)


### Bug Fixes

* 🐛 change changelog entries and fix github repo ([343f1c5](https://github.com/pkishorez/flowjv/commit/343f1c5f53cb9651f2dd2a110a2c43d426231872))


### Features

* 🎸 Add onchange handler to flowJV form ([f357fb7](https://github.com/pkishorez/flowjv/commit/f357fb7f532182ae4328b0854b203dae456936dd))





## [0.12.3](https://github.com/pkishorez/flowjv/compare/v0.12.2...v0.12.3) (2021-03-19)

**Note:** Version bump only for package flowjv-react

## [0.12.2](https://github.com/pkishorez/flowjv/compare/v0.12.1...v0.12.2) (2021-03-19)

**Note:** Version bump only for package flowjv-react

## [0.12.1](https://github.com/pkishorez/flowjv/compare/v0.12.0...v0.12.1) (2021-03-19)

**Note:** Version bump only for package flowjv-react

# [0.12.0](https://github.com/pkishorez/flowjv/compare/v0.11.0...v0.12.0) (2021-03-19)

### Features

-   🎸 Add typescript support to playground for flowjv ([1bba0b9](https://github.com/pkishorez/flowjv/commit/1bba0b9c8eacb73bb345b5f6e9e5c0439012ca4a))

# [0.11.0](https://github.com/pkishorez/flowjv/compare/v0.9.0...v0.11.0) (2021-03-17)

### Bug Fixes

-   fix versions ([2a870e3](https://github.com/pkishorez/flowjv/commit/2a870e37d9076f69b24bf783b2770cdc4848bcab))

# [0.10.0](https://github.com/pkishorez/flowjv/compare/v0.9.0...v0.10.0) (2021-03-17)

**Note:** Version bump only for package flowjv-react

# [0.9.0](https://github.com/pkishorez/flowjv/compare/v0.8.0...v0.9.0) (2021-03-02)

### Bug Fixes

-   fix block compiling (bug at nesting). And few enhancements ([7f09cb7](https://github.com/pkishorez/flowjv/commit/7f09cb7c6ae3255ea916d15edb6a719667bfbb5d))
-   invalidate array index, whenever deleted or inserted ([c70228a](https://github.com/pkishorez/flowjv/commit/c70228a707bed4169fd6232b7f1c04bc4a5302f7))
-   subscribe all ([13ef96e](https://github.com/pkishorez/flowjv/commit/13ef96e45cc0fb81cdcd17a45a833c19f996b228))
-   when keyPath is empty return top level schema ([bd0c10c](https://github.com/pkishorez/flowjv/commit/bd0c10c39d5a015a4b00759a42a0e733a890d762))

### Features

-   add ability to touch all the fields onSubmit ([9551ff7](https://github.com/pkishorez/flowjv/commit/9551ff780ebc32dd4b4fbac54188ca76ac054f2e))
-   add custom ui configuration capability to array type! ([4e2bc6e](https://github.com/pkishorez/flowjv/commit/4e2bc6ec8af4c0ebb40b80c0aca8d5af45738403))
-   add first error field focus on submit ([f2c3d45](https://github.com/pkishorez/flowjv/commit/f2c3d454bebbd5bf6f6ce5ce9d17c6670bac9461))
-   add formSpy component inspired from final-form ([781e7f6](https://github.com/pkishorez/flowjv/commit/781e7f6350e397b10302becbddfd208d6d763281))
-   add UI support for arrays ([6a5f1f6](https://github.com/pkishorez/flowjv/commit/6a5f1f602b1110ed1d56e385868051dce8043ab5))
-   make context readonly. Do not include in dependencies ([7d278be](https://github.com/pkishorez/flowjv/commit/7d278bee497fa7854f8d15dd888f51ebc84dc440))
-   provide a way to override the default ui from schema ([3229f5c](https://github.com/pkishorez/flowjv/commit/3229f5ca1b2c00b6898a9d11959e71f202be6857))

# [0.8.0](https://github.com/pkishorez/flowjv/compare/v0.7.3...v0.8.0) (2021-02-11)

### Features

-   add ability to use dependencies for rendering only relevant fields ([fe16e91](https://github.com/pkishorez/flowjv/commit/fe16e915618cc4e573784ce65bf363704724122b))

## [0.7.3](https://github.com/pkishorez/flowjv/compare/v0.7.2...v0.7.3) (2021-02-10)

**Note:** Version bump only for package flowjv-react

## [0.7.2](https://github.com/pkishorez/flowjv/compare/v0.7.1...v0.7.2) (2021-02-10)

**Note:** Version bump only for package flowjv-react

## [0.7.1](https://github.com/pkishorez/flowjv/compare/v0.7.0...v0.7.1) (2021-02-10)

**Note:** Version bump only for package flowjv-react

# [0.7.0](https://github.com/pkishorez/flowjv/compare/v0.5.3...v0.7.0) (2021-02-10)

### Features

-   add ability to nest if blocks. Complete changeover to the internal logic ([aa532b8](https://github.com/pkishorez/flowjv/commit/aa532b852cefd993d439f9ffe8af5c5043c3d877))
-   change complete architecture of flowjv ([52092a5](https://github.com/pkishorez/flowjv/commit/52092a56fed60ce65f96eb96a3b4208beee7d9ed))

### BREAKING CHANGES

-   FlowJV is complete rewritten. The underlying principles remain same, but the schema
    is significantly modified. Now FlowJV has better types support, seamless nested conditional blocks,
    automatically infer data dependencies from JSON expression. Now flowjv-react-custom package uses
    material ui and not custom css as was the case before.

# [0.6.0](https://github.com/pkishorez/flowjv/compare/v0.5.3...v0.6.0) (2021-02-10)

### Features

-   add ability to nest if blocks. Complete changeover to the internal logic ([aa532b8](https://github.com/pkishorez/flowjv/commit/aa532b852cefd993d439f9ffe8af5c5043c3d877))
-   change complete architecture of flowjv ([52092a5](https://github.com/pkishorez/flowjv/commit/52092a56fed60ce65f96eb96a3b4208beee7d9ed))

### BREAKING CHANGES

-   FlowJV is complete rewritten. The underlying principles remain same, but the schema
    is significantly modified. Now FlowJV has better types support, seamless nested conditional blocks,
    automatically infer data dependencies from JSON expression. Now flowjv-react-custom package uses
    material ui and not custom css as was the case before.

## [0.5.3](https://mygithub/kishoreiiitn/cjv/compare/v0.5.2...v0.5.3) (2020-08-08)

**Note:** Version bump only for package flowjv-react

## [0.5.2](https://mygithub/kishoreiiitn/cjv/compare/v0.5.1...v0.5.2) (2020-08-05)

### Bug Fixes

-   fix framer animation on if condition ([851f550](https://mygithub/kishoreiiitn/cjv/commit/851f550ce4c1eff6599d6466440cb1b093bb5ed4))

## [0.5.1](https://mygithub/kishoreiiitn/cjv/compare/v0.5.0...v0.5.1) (2020-08-05)

**Note:** Version bump only for package flowjv-react

# [0.5.0](https://mygithub/kishoreiiitn/cjv/compare/v0.4.4...v0.5.0) (2020-08-05)

### Bug Fixes

-   fix key dupliaction logic when in if condition ([0bccc1b](https://mygithub/kishoreiiitn/cjv/commit/0bccc1b5a4a93a710c922a0591108bae93412e76))
-   ignore cssnano for now. As it's causing postcss to break ([74ef7b4](https://mygithub/kishoreiiitn/cjv/commit/74ef7b4348507517844baa230d553e62b248a974))

### Features

-   move custom flowjv renderers to separate packages ([f416e4b](https://mygithub/kishoreiiitn/cjv/commit/f416e4b193e0d65afd814129e591ad8554f51c4b))

### BREAKING CHANGES

-   Move flowjv configurations to separate packages.

## [0.4.4](https://mygithub/kishoreiiitn/cjv/compare/v0.4.3...v0.4.4) (2020-07-10)

### Bug Fixes

-   export flowjv functions and types from flowjv-react ([537a388](https://mygithub/kishoreiiitn/cjv/commit/537a388b456a0ca565f5a25de453e4c54a0edf4b))
-   Fix setTouch bug that prevents custom type to be touched on Submit ([bd45ecc](https://mygithub/kishoreiiitn/cjv/commit/bd45ecc8dcad8139642edaeb273564d758464d8d))

## [0.4.3](https://mygithub/kishoreiiitn/cjv/compare/v0.4.2...v0.4.3) (2020-07-05)

### Bug Fixes

-   move options param as 3rd argument ([3170239](https://mygithub/kishoreiiitn/cjv/commit/3170239b37cafc93f835eafaf062433369f88ed4))

## [0.4.2](https://mygithub/kishoreiiitn/cjv/compare/v0.4.0...v0.4.2) (2020-06-30)

### Bug Fixes

-   add normalize styles within flowjv form ([1993914](https://mygithub/kishoreiiitn/cjv/commit/199391418f3c763ee6ec3d12a818e849d576cf98))
-   normalize the behaviour of atom rendering ([69d733e](https://mygithub/kishoreiiitn/cjv/commit/69d733ee660c115893ee84119dddee0491f12d6a))

## [0.4.1](https://mygithub/kishoreiiitn/cjv/compare/v0.4.0...v0.4.1) (2020-06-29)

### Bug Fixes

-   normalize the behaviour of atom rendering ([69d733e](https://mygithub/kishoreiiitn/cjv/commit/69d733ee660c115893ee84119dddee0491f12d6a))

# [0.4.0](https://mygithub/kishoreiiitn/cjv/compare/v0.3.9...v0.4.0) (2020-06-29)

### Bug Fixes

-   fix styles. Some styles do not apply in published package ([8b22d03](https://mygithub/kishoreiiitn/cjv/commit/8b22d03c1441892ec96ec8c2cce5fe0f22f4b786))

### Features

-   add custom atom type to address user defined data type ([781139a](https://mygithub/kishoreiiitn/cjv/commit/781139a251ac5cd88dd31254b0b3850b2a1bff1e))

## [0.3.9](https://mygithub/kishoreiiitn/cjv/compare/v0.3.8...v0.3.9) (2020-06-29)

**Note:** Version bump only for package flowjv-react

## [0.3.8](https://mygithub/kishoreiiitn/cjv/compare/v0.3.7...v0.3.8) (2020-06-29)

### Bug Fixes

-   lerna need to update dependencies automatically ([29b96aa](https://mygithub/kishoreiiitn/cjv/commit/29b96aa539ad7e28e36cd8e351bb83e4b5cae171))

## [0.3.6](https://mygithub/kishoreiiitn/cjv/compare/v0.3.5...v0.3.6) (2020-06-28)

### Bug Fixes

-   do not know why lerna changed to independent mode ([c4197df](https://mygithub/kishoreiiitn/cjv/commit/c4197df881c6be49482007420218ac320504b8c9))

## [0.3.1](https://mygithub/kishoreiiitn/cjv/compare/v0.3.0...v0.3.1) (2020-06-27)

**Note:** Version bump only for package flowjv-react

# [0.3.0](https://mygithub/kishoreiiitn/cjv/compare/v0.2.0...v0.3.0) (2020-06-27)

### Features

-   add typechecking option to flowjv and required field at atom level ([90f5227](https://mygithub/kishoreiiitn/cjv/commit/90f522704c2e036c49df93dfa8efebd96316f291))
-   add utility for ui theme customization to default form config ([52de387](https://mygithub/kishoreiiitn/cjv/commit/52de387389d2143c2a91b472f0a74a57f0f56517))

# [0.2.0](https://mygithub/kishoreiiitn/cjv/compare/v0.0.10...v0.2.0) (2020-06-19)

### Features

-   add ability customize placement of UI elements in the form ([5fcac1d](https://mygithub/kishoreiiitn/cjv/commit/5fcac1d37510019d7a3c0c84987ca44cc0e16ad9))
-   add enforceSchema option to enforceSchema on data given ([dafb62d](https://mygithub/kishoreiiitn/cjv/commit/dafb62d76ab671afa1165c9c078d59fe3cc8cff9))
-   add italic style ([c9d4e5f](https://mygithub/kishoreiiitn/cjv/commit/c9d4e5f47c0634ccace69869708ad3d5ba63282c))
-   add lookup for flowjv to integrate nicely with flowjv forms ([951a652](https://mygithub/kishoreiiitn/cjv/commit/951a65243134ca1941a8bb249631f699a75a3d86))
-   add styling for bold ([4bc7e9f](https://mygithub/kishoreiiitn/cjv/commit/4bc7e9f40d4a7d573c36b487653093cd9a648d64))

# [0.1.0](https://mygithub/kishoreiiitn/cjv/compare/v0.0.11...v0.1.0) (2020-06-12)

### Features

-   add italic style ([e8ebe7c](https://mygithub/kishoreiiitn/cjv/commit/e8ebe7cbe9b5ebc725d01ee88d9e4bc76e601468))
-   add styling for bold ([f5f1d0a](https://mygithub/kishoreiiitn/cjv/commit/f5f1d0ae80873e9141e6f02a25b9f68c1960d28f))

## [0.0.11](https://mygithub/kishoreiiitn/cjv/compare/v0.0.10...v0.0.11) (2020-06-12)

**Note:** Version bump only for package flowjv-react
