(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[311,179],{2424:function(t,e,_){"use strict";_.d(e,{L:function(){return l}});var n=_(5379),r=_(7556),s=_(2779),a=_.n(s),i=_(2784),o=i.createElement,l=function(t){var e=t.button,_=t.children,s=(0,i.useState)(null),l=s[0],u=s[1],c=(0,i.useRef)(!1);return(0,i.useEffect)((function(){var t=function(){c.current||u(null),c.current=!1};return window.addEventListener("click",t),function(){return window.removeEventListener("click",t)}}),[]),o("div",null,o("div",{onClick:function(t){c.current=!0,u(l?null:t.currentTarget)}},e),o("div",{className:a()("fixed top-0 left-0 right-0 bottom-0 z-10","bg-gray-900 bg-opacity-40","transition-opacity duration-300",{"opacity-0 pointer-events-none":!Boolean(l),"opacity-100":Boolean(l)})}),o(n.Z,{open:Boolean(l),anchorEl:l,className:"z-20",placement:"bottom-end"},o(r.Z,null,_)))}},6554:function(t,e,_){"use strict";_.d(e,{$:function(){return n}});var n={"Simple Form":'{\n\ttype: "object",\n\tproperties: [\n\t\t{ type: "string", key: "name", label: "Name" },\n\t\t{ type: "number", key: "age", label: "Age" },\n\t\t{ type: "boolean", key: "isEmployed", label: "Are you employed?" },\n\t\t{\n\t\t\ttype: "enum",\n\t\t\titems: [\n\t\t\t\t{ value: "male", label: "Male" },\n\t\t\t\t{ value: "female", label: "Female" },\n\t\t\t],\n\t\t\tkey: "gender",\n\t\t\tlabel: "Gender",\n\t\t\tui: {\n\t\t\t\ttype: "radio",\n\t\t\t},\n\t\t},\n\t],\n}',"Form with validations":'{\n\ttype: "object",\n\tproperties: [\n\t\t{ type: "string", key: "name", label: "Name" },\n\t\t{\n\t\t\ttype: "number",\n\t\t\tkey: "age",\n\t\t\tlabel: "Age",\n\t\t\tvalidations: [\n\t\t\t\t{\n\t\t\t\t\tlogic: ["<=", 1, ["$ref"], 100],\n\t\t\t\t\terr: "Age should be between 1 and 100",\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t\t{\n\t\t\ttype: "enum",\n\t\t\tkey: "gender",\n\t\t\tlabel: "Gender",\n\t\t\tui: {\n\t\t\t\ttype: "radio",\n\t\t\t},\n\t\t\titems: [\n\t\t\t\t{ value: "male", label: "Male" },\n\t\t\t\t{ value: "female", label: "Female" },\n\t\t\t\t{ value: "others", label: "Others" },\n\t\t\t],\n\t\t},\n\t\t{\n\t\t\ttype: "string",\n\t\t\tkey: "email",\n\t\t\tlabel: "Email",\n\t\t\tvalidations: [\n\t\t\t\t{\n\t\t\t\t\tlogic: ["str:fmt:email", ["$ref"]],\n\t\t\t\t\terr: "Should be a valid email id.",\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t\t{\n\t\t\ttype: "string",\n\t\t\tui: {\n\t\t\t\ttype: "password",\n\t\t\t},\n\t\t\tkey: "password",\n\t\t\tlabel: "Password",\n\t\t\tvalidations: [\n\t\t\t\t{\n\t\t\t\t\tlogic: ["<=", 5, ["str:len", ["$ref"]]],\n\t\t\t\t\terr: "Password should be minimum of 5 character length",\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t\t{\n\t\t\ttype: "string",\n\t\t\tui: {\n\t\t\t\ttype: "password",\n\t\t\t},\n\t\t\tkey: "confirmPassword",\n\t\t\tlabel: "Confirm Password",\n\t\t\tvalidations: [\n\t\t\t\t{\n\t\t\t\t\tlogic: ["===", ["$ref"], ["$data", "password"]],\n\t\t\t\t\terr: "Confirm Password should match the password.",\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t\t{ type: "boolean", key: "isEmployed", label: "Are you Employed?" },\n\t\t{\n\t\t\ttype: "if",\n\t\t\tcond: ["$data", "isEmployed"],\n\t\t\ttrue: [\n\t\t\t\t{\n\t\t\t\t\ttype: "number",\n\t\t\t\t\tkey: "yearsOfExp",\n\t\t\t\t\tlabel: "Years Of Experience",\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t],\n}',"If Condition Example":'{\n\ttype: "object",\n\tproperties: [\n\t\t{ type: "boolean", key: "ifCondition", label: "If Condition." },\n\t\t{\n\t\t\ttype: "if",\n\t\t\tcond: ["$data", "ifCondition"],\n\t\t\ttrue: [\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "if1",\n\t\t\t\t\tlabel: "If Statement 1",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "if2",\n\t\t\t\t\tlabel: "If Statement 2",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "if3",\n\t\t\t\t\tlabel: "If Statement 3",\n\t\t\t\t},\n\t\t\t],\n\t\t\tfalse: [\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "else1",\n\t\t\t\t\tlabel: "Else Statement 1",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "else2",\n\t\t\t\t\tlabel: "Else Statement 2",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "else3",\n\t\t\t\t\tlabel: "Else Statement 3",\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t],\n}',"Nested If Condition":'{\n\ttype: "object",\n\tproperties: [\n\t\t{ type: "boolean", key: "ifCondition", label: "If Condition." },\n\t\t{\n\t\t\ttype: "if",\n\t\t\tcond: ["$data", "ifCondition"],\n\t\t\ttrue: [\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "if1",\n\t\t\t\t\tlabel: "If Statement 1",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "if2",\n\t\t\t\t\tlabel: "If Statement 2",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "boolean",\n\t\t\t\t\tkey: "nestedCondition",\n\t\t\t\t\tlabel: "If Nested Condition",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "if",\n\t\t\t\t\tcond: ["$data", "nestedCondition"],\n\t\t\t\t\ttrue: [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\t\tkey: "ns1",\n\t\t\t\t\t\t\tlabel: "Nested If Statement 1",\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\t\tkey: "ns2",\n\t\t\t\t\t\t\tlabel: "Nested If Statement 2",\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\t\tkey: "ns3",\n\t\t\t\t\t\t\tlabel: "Nested If Statement 3",\n\t\t\t\t\t\t},\n\t\t\t\t\t],\n\t\t\t\t\tfalse: [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\t\tkey: "nie1",\n\t\t\t\t\t\t\tlabel: "Nested If Else Statement 1",\n\t\t\t\t\t\t},\n\t\t\t\t\t],\n\t\t\t\t},\n\t\t\t],\n\t\t\tfalse: [\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "else1",\n\t\t\t\t\tlabel: "Else Statement 1",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "string",\n\t\t\t\t\tkey: "else2",\n\t\t\t\t\tlabel: "Else Statement 2",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "boolean",\n\t\t\t\t\tkey: "elseNestedCondition",\n\t\t\t\t\tlabel: "Else Nested Condition",\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttype: "if",\n\t\t\t\t\tcond: ["$data", "elseNestedCondition"],\n\t\t\t\t\ttrue: [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\t\tkey: "ens1",\n\t\t\t\t\t\t\tlabel: "Else Nested If Statement 1",\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\t\tkey: "ens2",\n\t\t\t\t\t\t\tlabel: "Else Nested If Statement 2",\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\t\tkey: "ens3",\n\t\t\t\t\t\t\tlabel: "Else Nested If Statement 3",\n\t\t\t\t\t\t},\n\t\t\t\t\t],\n\t\t\t\t},\n\t\t\t],\n\t\t},\n\t],\n}',"Swich Case Example":'{\n\ttype: "object",\n\tproperties: [\n\t\t{\n\t\t\ttype: "enum",\n\t\t\titems: [\n\t\t\t\t{ label: "Case 1", value: "case1" },\n\t\t\t\t{ label: "Case 2", value: "case2" },\n\t\t\t\t{ label: "Case 3", value: "case3" },\n\t\t\t],\n\t\t\tui: {\n\t\t\t\ttype: "select"\n\t\t\t},\n\t\t\tkey: "switchKey",\n\t\t\tlabel: "Switch Case",\n\t\t},\n\t\t{\n\t\t\ttype: "switch",\n\t\t\tswitch: ["$data", "switchKey"],\n\t\t\tcases: {\n\t\t\t\tcase1: [\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case1-1",\n\t\t\t\t\t\tlabel: "Case 1 Statement 1",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case1-2",\n\t\t\t\t\t\tlabel: "Case 1 Statement 2",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case1-3",\n\t\t\t\t\t\tlabel: "Case 1 Statement 3",\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t\tcase2: [\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case2-1",\n\t\t\t\t\t\tlabel: "Case2 Statement 1",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case2-2",\n\t\t\t\t\t\tlabel: "Case2 Statement 2",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case2-3",\n\t\t\t\t\t\tlabel: "Case2 Statement 3",\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t\tcase3: [\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case3-1",\n\t\t\t\t\t\tlabel: "Case3 Statement 1",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case3-2",\n\t\t\t\t\t\tlabel: "Case3 Statement 2",\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\t\ttype: "string",\n\t\t\t\t\t\tkey: "case3-3",\n\t\t\t\t\t\tlabel: "Case3 Statement 3",\n\t\t\t\t\t},\n\t\t\t\t],\n\t\t\t},\n\t\t},\n\t],\n}'}},4:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:function(){return PlayGround},ErrorBoundary:function(){return ErrorBoundary}});var _Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_20__=__webpack_require__(4659),_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_23__=__webpack_require__(4730),_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_22__=__webpack_require__(3989),_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_19__=__webpack_require__(6474),_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(591),_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(5630),_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_21__=__webpack_require__(1119),_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_17__=__webpack_require__(5354),styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(6422),flowjv_react__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(7230),flowjv_react__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(flowjv_react__WEBPACK_IMPORTED_MODULE_4__),flowjv_react_material__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(3583),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(2784),_utils_editor__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(8174),classnames__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(2779),classnames__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__),next_link__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(9097),_material_ui_core__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__(7277),_material_ui_core__WEBPACK_IMPORTED_MODULE_16__=__webpack_require__(758),_material_ui_core__WEBPACK_IMPORTED_MODULE_18__=__webpack_require__(2231),_material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__(3147),_material_ui_icons_List__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__(3882),next_head__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(7729),_components_dropdown__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(2424),_components_playground_examples__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(6554),flowjv__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(8255),_process$env$NEXT_PUB,__jsx=react__WEBPACK_IMPORTED_MODULE_1__.createElement;function _createSuper(t){var e=_isNativeReflectConstruct();return function(){var _,n=(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__.Z)(t);if(e){var r=(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__.Z)(this).constructor;_=Reflect.construct(n,arguments,r)}else _=n.apply(this,arguments);return(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__.Z)(this,_)}}function _isNativeReflectConstruct(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}var assetPrefix=null!==(_process$env$NEXT_PUB="")&&void 0!==_process$env$NEXT_PUB?_process$env$NEXT_PUB:"";function PlayGround(){var ref=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null),_useState=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(_utils_editor__WEBPACK_IMPORTED_MODULE_6__.vF),value=_useState[0],setValue=_useState[1],_useState2=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),error=_useState2[0],setError=_useState2[1],editorRef=(0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(),setEditorValue=(0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((function(t){return function(){var e;null===(e=editorRef.current)||void 0===e||e.setValue(t)}}),[]),_useState3=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(!1),submission=_useState3[0],setSubmission=_useState3[1];return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((function(){if(ref.current)return(0,_utils_editor__WEBPACK_IMPORTED_MODULE_6__.em)(ref.current,{assetPrefix:assetPrefix,onChange:function onChange(v){setError(!1);try{var json;eval("json = ".concat(v)),setValue(json)}catch(e){console.log("VALUE : ",v,e),setError(!0)}}}).then((function(t){return editorRef.current=t})),function(){try{monaco.editor.getModels().forEach((function(t){return t.dispose()}))}catch(t){}}}),[]),__jsx("div",{className:"jsx-2688429646 p-5 overflow-y-auto"},__jsx(next_head__WEBPACK_IMPORTED_MODULE_9__.default,null,__jsx("meta",{name:"theme-color",content:"#109488",className:"jsx-2688429646"}),__jsx("title",{className:"jsx-2688429646"},"FlowJV: Playground")),__jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__.default,{id:"2688429646"},["body{background:#eeeeee;}"]),__jsx("div",{style:{minHeight:"calc(100vh - 150px)"},className:"jsx-2688429646 w-1/2 relative"},__jsx("div",{className:"jsx-2688429646 "+(classnames__WEBPACK_IMPORTED_MODULE_7___default()("mx-auto max-w-sm shadow-lg p-5 self-center overflow-y-auto","bg-white my-10 rounded-sm")||"")},__jsx("div",{className:"jsx-2688429646 -ml-3"},__jsx(next_link__WEBPACK_IMPORTED_MODULE_8__.default,{href:"".concat(assetPrefix,"/")},__jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_13__.Z,null,__jsx(_material_ui_icons_ArrowBack__WEBPACK_IMPORTED_MODULE_14__.Z,{className:"mr-2"}),"Go Back To Home"))),__jsx("div",{className:"jsx-2688429646 flex items-center py-3"},__jsx("h2",{className:"jsx-2688429646 flex-grow my-0"},"PlayGround"),error&&__jsx("div",{className:"jsx-2688429646 uppercase text-red-600"},"schema error")),__jsx(ErrorBoundary,{value:value,onsubmit:setSubmission}),submission&&__jsx("div",{onClick:function(){return setSubmission(void 0)},className:"jsx-2688429646 fixed z-50 top-0 bottom-0 left-0 w-1/2 bg-gray-500 bg-opacity-75 flex items-center justify-center"},__jsx("pre",{onClick:function(t){return t.stopPropagation()},className:"jsx-2688429646 p-5 bg-white shadow-lg"},JSON.stringify(submission,null,"  "))))),__jsx("div",{className:"jsx-2688429646 "+(classnames__WEBPACK_IMPORTED_MODULE_7___default()("flex flex-col w-1/2 fixed bottom-3 right-0 top-3 py-4","border border-solid box-border","border-gray-400 bg-white")||"")},__jsx("div",{ref:ref,className:"jsx-2688429646 "+(classnames__WEBPACK_IMPORTED_MODULE_7___default()("flex-grow ")||"")}),__jsx("div",{className:"jsx-2688429646 absolute top-3 right-3"},__jsx(_components_dropdown__WEBPACK_IMPORTED_MODULE_10__.L,{button:__jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_13__.Z,{variant:"contained",color:"primary"},__jsx(_material_ui_icons_List__WEBPACK_IMPORTED_MODULE_15__.Z,{className:"mr-3"}),"Examples")},__jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_16__.Z,{className:"text-sm w-56"},Object.entries(_components_playground_examples__WEBPACK_IMPORTED_MODULE_11__.$).map((function(t,e){var _=(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_17__.Z)(t,2),n=_[0],r=_[1];return __jsx(_material_ui_core__WEBPACK_IMPORTED_MODULE_18__.Z,{key:n,onClick:setEditorValue(r)},e+1,". ",n)})))))))}var ErrorBoundary=function(t){(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_19__.Z)(_,t);var e=_createSuper(_);function _(){var t;(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_20__.Z)(this,_);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return t=e.call.apply(e,[this].concat(r)),(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_21__.Z)((0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_22__.Z)(t),"state",{hasError:!1}),(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_21__.Z)((0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_22__.Z)(t),"i",0),(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_21__.Z)((0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_22__.Z)(t),"data",{}),(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_21__.Z)((0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_22__.Z)(t),"timeout",!1),t}return(0,_Users_kishore_MINE_fjv_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_23__.Z)(_,[{key:"componentDidUpdate",value:function(){var t=this;this.state.hasError&&!this.timeout&&(this.timeout=setTimeout((function(){t.timeout=!1,t.setState({hasError:!1})}),1e3))}},{key:"render",value:function(){var t=this;return this.state.hasError?__jsx("div",{className:"text-center my-4"},__jsx("h1",{className:"text-red-600"},"Something went wrong.")):__jsx("div",null,__jsx(flowjv_react_material__WEBPACK_IMPORTED_MODULE_5__.m1,{schema:this.props.value,initialData:this.data,onSubmit:function(e){t.props.onsubmit((0,flowjv__WEBPACK_IMPORTED_MODULE_12__.validateJSONFlow)(t.props.value,e,{normalize:!0}))},onChange:function(e){var _=e.data;return t.data=_},key:this.i++},__jsx(flowjv_react__WEBPACK_IMPORTED_MODULE_4__.AutoFlow,null),__jsx(flowjv_react_material__WEBPACK_IMPORTED_MODULE_5__.Mm,null)))}}],[{key:"getDerivedStateFromError",value:function(){return{hasError:!0}}}]),_}(react__WEBPACK_IMPORTED_MODULE_1__.Component)},8174:function(t,e,_){"use strict";_.d(e,{vF:function(){return u},em:function(){return c}});var n=_(7162),r=_.n(n),s=_(6470),a=_(1170),i=_.n(a),o=!1,l=function(t){return new Promise((function(e){if(o)return e();o=!0,i()(["".concat(t,"/monaco-editor/min/vs/loader.js")],(function(){window.require.config({paths:{vs:"monaco-editor/min/vs"}}),window.require(["vs/editor/editor.main.nls","vs/editor/editor.main"],(function(){e(),monaco.editor.defineTheme("myTheme",{base:"vs",inherit:!0,rules:[],colors:{"editor.lineHighlightBackground":"#00000000","editor.lineHighlightBorder":"#00000000"}})}))}))}))},u=["const data: IUIFlowSchema = ","",'{\n\ttype: "object",\n\tproperties: [\n\t]\n}'].join("\n"),c=function(){var t=(0,s.Z)(r().mark((function t(e,_){var n,s,a,i,o,c,E;return r().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=_.assetPrefix,s=void 0===n?"":n,a=_.onChange,(i=function(t){console.log("VALUE : ",t),t&&(null===a||void 0===a||a(t.substr(t.indexOf("{"),t.length)))})(u),t.next=5,l(s);case 5:if(e){t.next=7;break}return t.abrupt("return");case 7:return t.next=9,fetch("".concat(s,"/playground.d.ts")).then((function(t){return t.text()}));case 9:return o=t.sent,monaco.languages.typescript.typescriptDefaults.addExtraLib(o,"index.d.ts"),c=[u].join("\n"),(E=monaco.editor.create(e,{quickSuggestions:!0,model:monaco.editor.createModel(c,"typescript",monaco.Uri.parse("inmemory://model/main.ts")),theme:"myTheme",lineNumbers:"on",minimap:{enabled:!1},scrollBeyondLastLine:!1,fontSize:16,automaticLayout:!0,tabSize:3,insertSpaces:!0,formatOnType:!0})).onDidChangeCursorPosition((function(t){t.position.lineNumber<=2&&E.setPosition({lineNumber:3,column:1})})),E.onDidChangeModelContent((function(){var t;i(null===(t=E.getModel())||void 0===t?void 0:t.getValue())})),t.abrupt("return",{setValue:function(t){var e,_=["const data: IUIFlowSchema = ","",t].join("\n");null===(e=E.getModel())||void 0===e||e.setValue(_)}});case 16:case"end":return t.stop()}}),t)})));return function(e,_){return t.apply(this,arguments)}}()},8407:function(t,e,_){(window.__NEXT_P=window.__NEXT_P||[]).push(["/playground",function(){return _(4)}])},6045:function(){}},function(t){t.O(0,[774,812,392,592,142,20,161,583],(function(){return e=8407,t(t.s=e);var e}));var e=t.O();_N_E=e}]);