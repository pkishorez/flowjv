webpackHotUpdate("static/development/pages/demo.js",{

/***/ "../flowjv-react/dist/index.js":
/*!*************************************!*\
  !*** ../flowjv-react/dist/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __spreadArrays = (this && this.__spreadArrays) || function () {\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\n            r[k] = a[j];\n    return r;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.setupFlowJV = void 0;\nvar react_1 = __importStar(__webpack_require__(/*! react */ \"../../node_modules/react/index.js\"));\nvar flowjv_1 = __webpack_require__(/*! flowjv */ \"../flowjv/dist/index.js\");\nvar get_1 = __importDefault(__webpack_require__(/*! lodash/get */ \"../../node_modules/lodash/get.js\"));\nvar set_1 = __importDefault(__webpack_require__(/*! lodash/set */ \"../../node_modules/lodash/set.js\"));\nvar cloneDeep_1 = __importDefault(__webpack_require__(/*! lodash/cloneDeep */ \"../../node_modules/lodash/cloneDeep.js\"));\nvar config_1 = __webpack_require__(/*! ./config */ \"../flowjv-react/dist/config.js\");\nvar unset_1 = __importDefault(__webpack_require__(/*! lodash/unset */ \"../../node_modules/lodash/unset.js\"));\nfunction setupFlowJV(Config) {\n    if (Config === void 0) { Config = config_1.defaultConfig; }\n    return function (_a) {\n        var schema = _a.schema, defaultValue = _a.defaultValue, context = _a.context, value = _a.value, onChange = _a.onChange;\n        var _b = react_1.useState(defaultValue), formValue = _b[0], _setFormValue = _b[1];\n        var _c = react_1.useState({}), touchMap = _c[0], _setTouchMap = _c[1];\n        var setTouch = function (refPath) {\n            var _a;\n            _setTouchMap(__assign(__assign({}, touchMap), (_a = {}, _a[refPath] = true, _a)));\n        };\n        var setValue = function (key, v) {\n            if (value) {\n                onChange === null || onChange === void 0 ? void 0 : onChange(cloneDeep_1.default(set_1.default(value, key, v)));\n            }\n            else {\n                _setFormValue(set_1.default(formValue, key, v));\n            }\n        };\n        var unsetValue = function (key) {\n            if (value) {\n                unset_1.default(value, key);\n                onChange === null || onChange === void 0 ? void 0 : onChange(value);\n            }\n            else {\n                unset_1.default(formValue, key);\n                _setFormValue(formValue);\n            }\n        };\n        var getValue = function (key, def) {\n            if (key === void 0) { key = \"\"; }\n            if (def === void 0) { def = \"\"; }\n            if (key === \"\") {\n                return value ? value : formValue;\n            }\n            return value ? get_1.default(value, key, def) : get_1.default(formValue, key, def);\n        };\n        function render(schema, ref) {\n            if (ref === void 0) { ref = []; }\n            switch (schema.type) {\n                case \"object\": {\n                    // Loop over all the elements.\n                    return schema.properties.map(function (objconfig) {\n                        switch (objconfig.type) {\n                            case \"if\": {\n                                var cond = !!flowjv_1.execJSONExpression(objconfig.cond, {\n                                    data: getValue(),\n                                    context: context,\n                                    ref: getValue(ref.join(\".\")),\n                                });\n                                var flow = cond\n                                    ? objconfig.true\n                                    : objconfig.false;\n                                if (flow) {\n                                    return render({ type: \"object\", properties: flow }, ref);\n                                }\n                                break;\n                            }\n                            default: {\n                                return render(objconfig, __spreadArrays(ref, [\n                                    objconfig.key,\n                                ]));\n                            }\n                        }\n                    });\n                }\n            }\n            var validate = function (validations, refValue) {\n                return ((validations === null || validations === void 0 ? void 0 : validations.map(function (_a) {\n                    var logic = _a.logic, err = _a.err;\n                    return !!flowjv_1.execJSONExpression(logic, {\n                        data: getValue(),\n                        context: context,\n                        ref: refValue,\n                    })\n                        ? null\n                        : err || null;\n                })) || []).filter(function (v) { return v !== null; });\n            };\n            var refValue = getValue(ref.join(\"\"));\n            var refPath = ref.join(\".\");\n            var touched = touchMap[refPath];\n            var validations = schema.validations || [];\n            switch (schema.type) {\n                case \"enum\":\n                case \"boolean\":\n                case \"number\":\n                case \"string\": {\n                    // Render the components here!\n                    var errors = validate(validations || [], refValue);\n                    return (react_1.default.createElement(Config, { key: refPath, schema: schema, ui: {\n                            label: schema.label,\n                            errors: touched ? errors : [],\n                            success: touched ? !errors.length : false,\n                            value: getValue(refPath),\n                            onChange: function (value) {\n                                setValue(refPath, value);\n                            },\n                            onUnmount: function () {\n                                unsetValue(refPath);\n                            },\n                            setTouch: function () { return setTouch(refPath); },\n                        } }));\n                }\n            }\n        }\n        return (react_1.default.createElement(\"div\", null,\n            react_1.default.createElement(\"pre\", null, JSON.stringify(getValue(), null, \"  \")),\n            render(schema)));\n    };\n}\nexports.setupFlowJV = setupFlowJV;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vZmxvd2p2LXJlYWN0L2Rpc3QvaW5kZXguanM/ZjI4ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBYTtBQUNiO0FBQ0E7QUFDQSxnREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELFFBQVE7QUFDekQsd0NBQXdDLFFBQVE7QUFDaEQsd0RBQXdELFFBQVE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLDJCQUEyQixtQkFBTyxDQUFDLGdEQUFPO0FBQzFDLGVBQWUsbUJBQU8sQ0FBQyx1Q0FBUTtBQUMvQiw0QkFBNEIsbUJBQU8sQ0FBQyxvREFBWTtBQUNoRCw0QkFBNEIsbUJBQU8sQ0FBQyxvREFBWTtBQUNoRCxrQ0FBa0MsbUJBQU8sQ0FBQyxnRUFBa0I7QUFDNUQsZUFBZSxtQkFBTyxDQUFDLGdEQUFVO0FBQ2pDLDhCQUE4QixtQkFBTyxDQUFDLHdEQUFjO0FBQ3BEO0FBQ0EsNEJBQTRCLGlDQUFpQztBQUM3RDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLDZDQUE2QyxxQkFBcUI7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxVQUFVO0FBQzNDLGlDQUFpQyxVQUFVO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxVQUFVO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELG1DQUFtQztBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUIsK0JBQStCLG1CQUFtQixFQUFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixtREFBbUQsMEJBQTBCLEVBQUU7QUFDL0UseUJBQXlCLEVBQUU7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4uL2Zsb3dqdi1yZWFjdC9kaXN0L2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgICAgcltrXSA9IGFbal07XG4gICAgcmV0dXJuIHI7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zZXR1cEZsb3dKViA9IHZvaWQgMDtcbnZhciByZWFjdF8xID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgZmxvd2p2XzEgPSByZXF1aXJlKFwiZmxvd2p2XCIpO1xudmFyIGdldF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJsb2Rhc2gvZ2V0XCIpKTtcbnZhciBzZXRfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwibG9kYXNoL3NldFwiKSk7XG52YXIgY2xvbmVEZWVwXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImxvZGFzaC9jbG9uZURlZXBcIikpO1xudmFyIGNvbmZpZ18xID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xudmFyIHVuc2V0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImxvZGFzaC91bnNldFwiKSk7XG5mdW5jdGlvbiBzZXR1cEZsb3dKVihDb25maWcpIHtcbiAgICBpZiAoQ29uZmlnID09PSB2b2lkIDApIHsgQ29uZmlnID0gY29uZmlnXzEuZGVmYXVsdENvbmZpZzsgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIHNjaGVtYSA9IF9hLnNjaGVtYSwgZGVmYXVsdFZhbHVlID0gX2EuZGVmYXVsdFZhbHVlLCBjb250ZXh0ID0gX2EuY29udGV4dCwgdmFsdWUgPSBfYS52YWx1ZSwgb25DaGFuZ2UgPSBfYS5vbkNoYW5nZTtcbiAgICAgICAgdmFyIF9iID0gcmVhY3RfMS51c2VTdGF0ZShkZWZhdWx0VmFsdWUpLCBmb3JtVmFsdWUgPSBfYlswXSwgX3NldEZvcm1WYWx1ZSA9IF9iWzFdO1xuICAgICAgICB2YXIgX2MgPSByZWFjdF8xLnVzZVN0YXRlKHt9KSwgdG91Y2hNYXAgPSBfY1swXSwgX3NldFRvdWNoTWFwID0gX2NbMV07XG4gICAgICAgIHZhciBzZXRUb3VjaCA9IGZ1bmN0aW9uIChyZWZQYXRoKSB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBfc2V0VG91Y2hNYXAoX19hc3NpZ24oX19hc3NpZ24oe30sIHRvdWNoTWFwKSwgKF9hID0ge30sIF9hW3JlZlBhdGhdID0gdHJ1ZSwgX2EpKSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIHYpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG9uQ2hhbmdlID09PSBudWxsIHx8IG9uQ2hhbmdlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvbkNoYW5nZShjbG9uZURlZXBfMS5kZWZhdWx0KHNldF8xLmRlZmF1bHQodmFsdWUsIGtleSwgdikpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIF9zZXRGb3JtVmFsdWUoc2V0XzEuZGVmYXVsdChmb3JtVmFsdWUsIGtleSwgdikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB2YXIgdW5zZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHVuc2V0XzEuZGVmYXVsdCh2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgICAgICBvbkNoYW5nZSA9PT0gbnVsbCB8fCBvbkNoYW5nZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25DaGFuZ2UodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5zZXRfMS5kZWZhdWx0KGZvcm1WYWx1ZSwga2V5KTtcbiAgICAgICAgICAgICAgICBfc2V0Rm9ybVZhbHVlKGZvcm1WYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBnZXRWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIGRlZikge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gdm9pZCAwKSB7IGtleSA9IFwiXCI7IH1cbiAgICAgICAgICAgIGlmIChkZWYgPT09IHZvaWQgMCkgeyBkZWYgPSBcIlwiOyB9XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID8gdmFsdWUgOiBmb3JtVmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgPyBnZXRfMS5kZWZhdWx0KHZhbHVlLCBrZXksIGRlZikgOiBnZXRfMS5kZWZhdWx0KGZvcm1WYWx1ZSwga2V5LCBkZWYpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiByZW5kZXIoc2NoZW1hLCByZWYpIHtcbiAgICAgICAgICAgIGlmIChyZWYgPT09IHZvaWQgMCkgeyByZWYgPSBbXTsgfVxuICAgICAgICAgICAgc3dpdGNoIChzY2hlbWEudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjoge1xuICAgICAgICAgICAgICAgICAgICAvLyBMb29wIG92ZXIgYWxsIHRoZSBlbGVtZW50cy5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNjaGVtYS5wcm9wZXJ0aWVzLm1hcChmdW5jdGlvbiAob2JqY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKG9iamNvbmZpZy50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbmQgPSAhIWZsb3dqdl8xLmV4ZWNKU09ORXhwcmVzc2lvbihvYmpjb25maWcuY29uZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZ2V0VmFsdWUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY6IGdldFZhbHVlKHJlZi5qb2luKFwiLlwiKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmxvdyA9IGNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb2JqY29uZmlnLnRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb2JqY29uZmlnLmZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbmRlcih7IHR5cGU6IFwib2JqZWN0XCIsIHByb3BlcnRpZXM6IGZsb3cgfSwgcmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVuZGVyKG9iamNvbmZpZywgX19zcHJlYWRBcnJheXMocmVmLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpjb25maWcua2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsaWRhdGUgPSBmdW5jdGlvbiAodmFsaWRhdGlvbnMsIHJlZlZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgodmFsaWRhdGlvbnMgPT09IG51bGwgfHwgdmFsaWRhdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHZhbGlkYXRpb25zLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvZ2ljID0gX2EubG9naWMsIGVyciA9IF9hLmVycjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhZmxvd2p2XzEuZXhlY0pTT05FeHByZXNzaW9uKGxvZ2ljLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBnZXRWYWx1ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogcmVmVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZXJyIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgfSkpIHx8IFtdKS5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHYgIT09IG51bGw7IH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByZWZWYWx1ZSA9IGdldFZhbHVlKHJlZi5qb2luKFwiXCIpKTtcbiAgICAgICAgICAgIHZhciByZWZQYXRoID0gcmVmLmpvaW4oXCIuXCIpO1xuICAgICAgICAgICAgdmFyIHRvdWNoZWQgPSB0b3VjaE1hcFtyZWZQYXRoXTtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0aW9ucyA9IHNjaGVtYS52YWxpZGF0aW9ucyB8fCBbXTtcbiAgICAgICAgICAgIHN3aXRjaCAoc2NoZW1hLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwiZW51bVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpbmdcIjoge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZW5kZXIgdGhlIGNvbXBvbmVudHMgaGVyZSFcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVycm9ycyA9IHZhbGlkYXRlKHZhbGlkYXRpb25zIHx8IFtdLCByZWZWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAocmVhY3RfMS5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ29uZmlnLCB7IGtleTogcmVmUGF0aCwgc2NoZW1hOiBzY2hlbWEsIHVpOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHNjaGVtYS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnM6IHRvdWNoZWQgPyBlcnJvcnMgOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiB0b3VjaGVkID8gIWVycm9ycy5sZW5ndGggOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZ2V0VmFsdWUocmVmUGF0aCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZShyZWZQYXRoLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvblVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zZXRWYWx1ZShyZWZQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRvdWNoOiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZXRUb3VjaChyZWZQYXRoKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHJlYWN0XzEuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG4gICAgICAgICAgICByZWFjdF8xLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcInByZVwiLCBudWxsLCBKU09OLnN0cmluZ2lmeShnZXRWYWx1ZSgpLCBudWxsLCBcIiAgXCIpKSxcbiAgICAgICAgICAgIHJlbmRlcihzY2hlbWEpKSk7XG4gICAgfTtcbn1cbmV4cG9ydHMuc2V0dXBGbG93SlYgPSBzZXR1cEZsb3dKVjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../flowjv-react/dist/index.js\n");

/***/ })

})