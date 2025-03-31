/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/activities/[userId]/route";
exports.ids = ["app/api/activities/[userId]/route"];
exports.modules = {

/***/ "(rsc)/./app/api/activities/[userId]/route.ts":
/*!**********************************************!*\
  !*** ./app/api/activities/[userId]/route.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/../node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';\n// 模拟活动数据\nconst mockActivities = [\n    {\n        id: '1',\n        type: 'message',\n        title: '新消息',\n        content: '您收到了一条新的消息',\n        timestamp: new Date().toISOString(),\n        read: false,\n        link: '/messages/1'\n    },\n    {\n        id: '2',\n        type: 'interaction',\n        title: '互动提醒',\n        content: '有人关注了您',\n        timestamp: new Date(Date.now() - 3600000).toISOString(),\n        read: true\n    },\n    {\n        id: '3',\n        type: 'announcement',\n        title: '系统公告',\n        content: '系统将于今晚进行维护',\n        timestamp: new Date(Date.now() - 7200000).toISOString(),\n        read: false\n    }\n];\nasync function GET(request, { params }) {\n    try {\n        const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_1__.cookies)();\n        const token = cookieStore.get('token');\n        if (!token) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: '未授权'\n            }, {\n                status: 401\n            });\n        }\n        const decoded = (0,jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__.verify)(token.value, JWT_SECRET);\n        const userId = params.userId;\n        // 验证用户是否有权限访问该活动\n        if (decoded.id !== userId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: '无权限访问'\n            }, {\n                status: 403\n            });\n        }\n        // 返回用户的活动列表\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(mockActivities);\n    } catch (error) {\n        console.error('获取活动列表失败:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: '获取活动列表失败'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FjdGl2aXRpZXMvW3VzZXJJZF0vcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMkM7QUFDSjtBQUNEO0FBRXRDLE1BQU1HLGFBQWFDLFFBQVFDLEdBQUcsQ0FBQ0YsVUFBVSxJQUFJO0FBRTdDLFNBQVM7QUFDVCxNQUFNRyxpQkFBaUI7SUFDckI7UUFDRUMsSUFBSTtRQUNKQyxNQUFNO1FBQ05DLE9BQU87UUFDUEMsU0FBUztRQUNUQyxXQUFXLElBQUlDLE9BQU9DLFdBQVc7UUFDakNDLE1BQU07UUFDTkMsTUFBTTtJQUNSO0lBQ0E7UUFDRVIsSUFBSTtRQUNKQyxNQUFNO1FBQ05DLE9BQU87UUFDUEMsU0FBUztRQUNUQyxXQUFXLElBQUlDLEtBQUtBLEtBQUtJLEdBQUcsS0FBSyxTQUFTSCxXQUFXO1FBQ3JEQyxNQUFNO0lBQ1I7SUFDQTtRQUNFUCxJQUFJO1FBQ0pDLE1BQU07UUFDTkMsT0FBTztRQUNQQyxTQUFTO1FBQ1RDLFdBQVcsSUFBSUMsS0FBS0EsS0FBS0ksR0FBRyxLQUFLLFNBQVNILFdBQVc7UUFDckRDLE1BQU07SUFDUjtDQUNEO0FBRU0sZUFBZUcsSUFDcEJDLE9BQWdCLEVBQ2hCLEVBQUVDLE1BQU0sRUFBa0M7SUFFMUMsSUFBSTtRQUNGLE1BQU1DLGNBQWMsTUFBTW5CLHFEQUFPQTtRQUNqQyxNQUFNb0IsUUFBUUQsWUFBWUUsR0FBRyxDQUFDO1FBRTlCLElBQUksQ0FBQ0QsT0FBTztZQUNWLE9BQU9yQixxREFBWUEsQ0FBQ3VCLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7WUFBTSxHQUNqQjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTUMsVUFBVXhCLG9EQUFNQSxDQUFDbUIsTUFBTU0sS0FBSyxFQUFFeEI7UUFDcEMsTUFBTXlCLFNBQVNULE9BQU9TLE1BQU07UUFFNUIsaUJBQWlCO1FBQ2pCLElBQUlGLFFBQVFuQixFQUFFLEtBQUtxQixRQUFRO1lBQ3pCLE9BQU81QixxREFBWUEsQ0FBQ3VCLElBQUksQ0FDdEI7Z0JBQUVDLFNBQVM7WUFBUSxHQUNuQjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsWUFBWTtRQUNaLE9BQU96QixxREFBWUEsQ0FBQ3VCLElBQUksQ0FBQ2pCO0lBQzNCLEVBQUUsT0FBT3VCLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGFBQWFBO1FBQzNCLE9BQU83QixxREFBWUEsQ0FBQ3VCLElBQUksQ0FDdEI7WUFBRUMsU0FBUztRQUFXLEdBQ3RCO1lBQUVDLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyJFOlxcQUlBRVxcYWlhZVxcYXBwXFxhcGlcXGFjdGl2aXRpZXNcXFt1c2VySWRdXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tICduZXh0L2hlYWRlcnMnO1xyXG5pbXBvcnQgeyB2ZXJpZnkgfSBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5cclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52LkpXVF9TRUNSRVQgfHwgJ3lvdXItc2VjcmV0LWtleSc7XHJcblxyXG4vLyDmqKHmi5/mtLvliqjmlbDmja5cclxuY29uc3QgbW9ja0FjdGl2aXRpZXMgPSBbXHJcbiAge1xyXG4gICAgaWQ6ICcxJyxcclxuICAgIHR5cGU6ICdtZXNzYWdlJyxcclxuICAgIHRpdGxlOiAn5paw5raI5oGvJyxcclxuICAgIGNvbnRlbnQ6ICfmgqjmlLbliLDkuobkuIDmnaHmlrDnmoTmtojmga8nLFxyXG4gICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICByZWFkOiBmYWxzZSxcclxuICAgIGxpbms6ICcvbWVzc2FnZXMvMSdcclxuICB9LFxyXG4gIHtcclxuICAgIGlkOiAnMicsXHJcbiAgICB0eXBlOiAnaW50ZXJhY3Rpb24nLFxyXG4gICAgdGl0bGU6ICfkupLliqjmj5DphpInLFxyXG4gICAgY29udGVudDogJ+acieS6uuWFs+azqOS6huaCqCcsXHJcbiAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzNjAwMDAwKS50b0lTT1N0cmluZygpLFxyXG4gICAgcmVhZDogdHJ1ZVxyXG4gIH0sXHJcbiAge1xyXG4gICAgaWQ6ICczJyxcclxuICAgIHR5cGU6ICdhbm5vdW5jZW1lbnQnLFxyXG4gICAgdGl0bGU6ICfns7vnu5/lhazlkYonLFxyXG4gICAgY29udGVudDogJ+ezu+e7n+WwhuS6juS7iuaZmui/m+ihjOe7tOaKpCcsXHJcbiAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSA3MjAwMDAwKS50b0lTT1N0cmluZygpLFxyXG4gICAgcmVhZDogZmFsc2VcclxuICB9XHJcbl07XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKFxyXG4gIHJlcXVlc3Q6IFJlcXVlc3QsXHJcbiAgeyBwYXJhbXMgfTogeyBwYXJhbXM6IHsgdXNlcklkOiBzdHJpbmcgfSB9XHJcbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcclxuICAgIGNvbnN0IHRva2VuID0gY29va2llU3RvcmUuZ2V0KCd0b2tlbicpO1xyXG5cclxuICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICAgIHsgbWVzc2FnZTogJ+acquaOiOadgycgfSxcclxuICAgICAgICB7IHN0YXR1czogNDAxIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWNvZGVkID0gdmVyaWZ5KHRva2VuLnZhbHVlLCBKV1RfU0VDUkVUKTtcclxuICAgIGNvbnN0IHVzZXJJZCA9IHBhcmFtcy51c2VySWQ7XHJcblxyXG4gICAgLy8g6aqM6K+B55So5oi35piv5ZCm5pyJ5p2D6ZmQ6K6/6Zeu6K+l5rS75YqoXHJcbiAgICBpZiAoZGVjb2RlZC5pZCAhPT0gdXNlcklkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcclxuICAgICAgICB7IG1lc3NhZ2U6ICfml6DmnYPpmZDorr/pl64nIH0sXHJcbiAgICAgICAgeyBzdGF0dXM6IDQwMyB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6L+U5Zue55So5oi355qE5rS75Yqo5YiX6KGoXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24obW9ja0FjdGl2aXRpZXMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCfojrflj5bmtLvliqjliJfooajlpLHotKU6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxyXG4gICAgICB7IG1lc3NhZ2U6ICfojrflj5bmtLvliqjliJfooajlpLHotKUnIH0sXHJcbiAgICAgIHsgc3RhdHVzOiA1MDAgfVxyXG4gICAgKTtcclxuICB9XHJcbn0gIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNvb2tpZXMiLCJ2ZXJpZnkiLCJKV1RfU0VDUkVUIiwicHJvY2VzcyIsImVudiIsIm1vY2tBY3Rpdml0aWVzIiwiaWQiLCJ0eXBlIiwidGl0bGUiLCJjb250ZW50IiwidGltZXN0YW1wIiwiRGF0ZSIsInRvSVNPU3RyaW5nIiwicmVhZCIsImxpbmsiLCJub3ciLCJHRVQiLCJyZXF1ZXN0IiwicGFyYW1zIiwiY29va2llU3RvcmUiLCJ0b2tlbiIsImdldCIsImpzb24iLCJtZXNzYWdlIiwic3RhdHVzIiwiZGVjb2RlZCIsInZhbHVlIiwidXNlcklkIiwiZXJyb3IiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/activities/[userId]/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&page=%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2F%5BuserId%5D%2Froute.ts&appDir=E%3A%5CAIAE%5Caiae%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAIAE%5Caiae&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&page=%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2F%5BuserId%5D%2Froute.ts&appDir=E%3A%5CAIAE%5Caiae%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAIAE%5Caiae&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_AIAE_aiae_app_api_activities_userId_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/activities/[userId]/route.ts */ \"(rsc)/./app/api/activities/[userId]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/activities/[userId]/route\",\n        pathname: \"/api/activities/[userId]\",\n        filename: \"route\",\n        bundlePath: \"app/api/activities/[userId]/route\"\n    },\n    resolvedPagePath: \"E:\\\\AIAE\\\\aiae\\\\app\\\\api\\\\activities\\\\[userId]\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_AIAE_aiae_app_api_activities_userId_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhY3Rpdml0aWVzJTJGJTVCdXNlcklkJTVEJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhY3Rpdml0aWVzJTJGJTVCdXNlcklkJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWN0aXZpdGllcyUyRiU1QnVzZXJJZCU1RCUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDQUlBRSU1Q2FpYWUlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUUlM0ElNUNBSUFFJTVDYWlhZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDUTtBQUNyRjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRTpcXFxcQUlBRVxcXFxhaWFlXFxcXGFwcFxcXFxhcGlcXFxcYWN0aXZpdGllc1xcXFxbdXNlcklkXVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWN0aXZpdGllcy9bdXNlcklkXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2FjdGl2aXRpZXMvW3VzZXJJZF1cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FjdGl2aXRpZXMvW3VzZXJJZF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJFOlxcXFxBSUFFXFxcXGFpYWVcXFxcYXBwXFxcXGFwaVxcXFxhY3Rpdml0aWVzXFxcXFt1c2VySWRdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&page=%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2F%5BuserId%5D%2Froute.ts&appDir=E%3A%5CAIAE%5Caiae%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAIAE%5Caiae&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/jws","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/safe-buffer","vendor-chunks/ms","vendor-chunks/lodash.once","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isplainobject","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isinteger","vendor-chunks/lodash.isboolean","vendor-chunks/lodash.includes","vendor-chunks/jwa","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&page=%2Fapi%2Factivities%2F%5BuserId%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Factivities%2F%5BuserId%5D%2Froute.ts&appDir=E%3A%5CAIAE%5Caiae%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CAIAE%5Caiae&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();