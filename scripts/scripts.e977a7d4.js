"use strict";angular.module("frontendStableApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngMaterial"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/teachers/:teacherId?",{templateUrl:"views/teachers.html",controller:"TeachersCtrl"}).otherwise({redirectTo:"/"})}]).config(["ConfigProvider",function(a){a.serverVersion="v1",a.serverHost="https://auth-silex-test-alessandro-bugatti.c9users.io",a.authTokenName="x-authorization-token"}]),angular.module("frontendStableApp").provider("Config",function(){this.serverVersion=null,this.serverHost=null,this.authTokenName=null,this.clientVersion="0.1.1";var a="Uninitialized config server values";this.$get=function(){var b=this;return{getServerPath:function(){if(!b.serverHost||!b.serverVersion)throw a;return b.serverHost+"/"+b.serverVersion+"/"},getAuthTokenName:function(){if(!b.authTokenName)throw a;return b.authTokenName},getVersion:function(){return b.clientVersion}}}}),angular.module("frontendStableApp").directive("fileModel",["$parse",function(a){return{restrict:"A",link:function(b,c,d){var e=a(d.fileModel),f=e.assign;c.bind("change",function(){b.$apply(function(){f(b,c[0].files[0])})})}}}]),angular.module("frontendStableApp").controller("MainCtrl",["AuthService","$location",function(a,b){a.isLogged()||b.path("/login")}]),angular.module("frontendStableApp").controller("SidenavCtrl",["$scope","$mdMedia","$mdDialog","$mdSidenav","$location","Config","$rootScope","AuthService",function(a,b,c,d,e,f,g,h){function i(d){var e=(b("sm")||b("xs"))&&a.customFullscreen;c.show({controller:"DialogCtrl",templateUrl:"views/about.html",parent:angular.element(document.body),targetEvent:d,clickOutsideToClose:!0,fullscreen:e,locals:{items:{clientVersion:f.getVersion()}}}),a.$watch(function(){return b("xs")||b("sm")},function(b){a.customFullscreen=b===!0})}a.customFullscreen=b("xs")||b("sm"),a.authService=h,a.closed=!1,g.$on("sidenav-close",function(){a.closed=!0}),g.$on("sidenav-toggle",function(){a.closed=!a.closed}),g.$on("sidenav-open",function(){a.closed=!1}),a.menuEntries=[{title:"Docenti",description:"Gestisci i docenti",icon:"graduation-cap",allowed:"admin",link:"/teachers"},{title:"Disconnetti",description:"Esegui il logout",icon:"sign-out",allowed:"*",callback:function(a,b){h.logout().then(function(){e.path("/login")})}},{title:"Informazioni",description:"Informazioni sul correttore",icon:"info-circle",allowed:"*",callback:function(a,b){i(b)}}],a.handleClick=function(b,c){b.link?a.goTo(b.link):"function"==typeof b.callback&&b.callback(b,c),d("left").close()},a.display=function(a){if(a.allowed){if("object"!=typeof a.allowed){if("*"==a.allowed)return!0;a.allowed=[a.allowed]}}else a.allowed=[];if(a.forbidden){if("object"!=typeof a.forbidden){if("*"==a.forbidden)return!1;a.forbidden=[a.forbidden]}}else a.forbidden=[];return h.allowedForbidden(a.allowed,a.forbidden)},a.goTo=function(a){e.path(a)}}]),angular.module("frontendStableApp").controller("ToolbarCtrl",["$scope","$mdSidenav","$rootScope",function(a,b,c){a.openSidenav=function(){b("left").open()},a.hide=!1,a.loading=!1,c.$on("toolbar-hide",function(){a.hide=!0}),c.$on("toolbar-toggle",function(){a.hide=!a.hide}),c.$on("toolbar-show",function(){a.hide=!1}),c.$on("loading-start",function(){a.loading=!0}),c.$on("loading-stop",function(){a.loading=!1}),c.$on("loading-toggle",function(){a.loading=!a.loading})}]),angular.module("frontendStableApp").controller("DialogCtrl",["$scope","$mdDialog","items",function(a,b,c){a.close=function(){b.cancel()};for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}]),angular.module("frontendStableApp").controller("LoginCtrl",["AuthService","$scope","$location","$rootScope","$mdSidenav",function(a,b,c,d,e){function f(){d.$emit("sidenav-open"),d.$emit("toolbar-show"),c.search().redirect?(c.path(c.search().redirect),c.search({})):c.path("/")}return a.isLogged()?void f():(e("left").close(),d.$emit("sidenav-close"),d.$emit("toolbar-hide"),b.user={username:"",password:""},b.loading=!1,b.loginForm=!0,b.loadingMessage="Accesso in corso...",b.errorMessage=null,a.hasAuthToken()&&(b.loadingMessage="Ripresa della sessione...",b.loginForm=!1,b.loading=!0,a.getSessionInfo().then(function(){f()},function(){b.errorMessage="La sessione è scaduta. Accedi per continuare",b.loadingMessage="Accesso in corso...",b.loading=!1,b.loginForm=!0})),void(b.login=function(){b.errorMessage=null,b.loading=!0,a.login(b.user.username,b.user.password).then(function(){f()},function(){b.loading=!1,b.errorMessage="Credenziali non valide"})}))}]),angular.module("frontendStableApp").controller("TeachersCtrl",["AuthService","TeachersService","$scope","$location","$routeParams","$log","$rootScope",function(a,b,c,d,e,f,g){return a.isLogged()?a.atLeast("admin")?(c.$location=d,c.deleteTeacher=function(a,d,e){g.$emit("loading-start"),c.teachers.splice(d,1),b.deleteTeacher(a).then(function(){g.$emit("loading-stop")})},c.loading=!0,g.$emit("loading-start"),c.teacherId=null,e.teacherId?(c.teacherId=e.teacherId,c.user={name:"",surname:"",username:"",password:"",password2:""},"new"!=c.teacherId?b.getOneTeacher(c.teacherId).then(function(a){c.loading=!1,g.$emit("loading-stop"),c.user=a}):(c.loading=!1,g.$emit("loading-stop")),c.save=function(){g.$emit("loading-start"),"new"==c.teacherId?b.addTeacher(c.user.name,c.user.surname,c.user.username,c.user.password).then(function(a){g.$emit("loading-stop"),d.path("/teachers")}):b.updateTeacher(c.teacherId,c.user.name,c.user.surname,c.user.username,c.user.password).then(function(a){g.$emit("loading-stop"),d.path("/teachers")})}):(c.teachers=[],b.getList().then(function(a){c.loading=!1,g.$emit("loading-stop"),c.teachers=a})),void(c.openTeacher=function(a){d.path("/teachers/"+a)})):(d.path("/"),void d.search({})):(d.search({redirect:d.path()}),void d.path("/login"))}]),angular.module("frontendStableApp").service("ResourcesGeneratorService",["Config","$resource","$q",function(a,b,c){this.getResource=function(c,d){var e={};e[a.getAuthTokenName()]=c;var f={"Content-Type":void 0};return f[a.getAuthTokenName()]=c,c?b(a.getServerPath()+d,{},{get:{method:"GET",headers:e},save:{method:"POST",headers:e},post:{method:"POST",headers:e},put:{method:"PUT",headers:e,params:{studentId:"@studentId",groupId:"@groupId"}},query:{method:"GET",isArray:!0,headers:e},remove:{method:"DELETE",headers:e},"delete":{method:"DELETE",headers:e},create:{method:"POST",transformRequest:angular.identity,headers:f}}):b(a.getServerPath()+"public/"+d)},this.successHandler=function(a){return a},this.failureHandler=function(a){return void 0!=a.data.error?c.reject(a.data.error):c.reject(a.data)}}]),angular.module("frontendStableApp").service("AuthService",["ResourcesGeneratorService","$q","$window",function(a,b,c){function d(a){switch(g=0,a){case"admin":g+=i.roleValues.admin;case"teacher":g+=i.roleValues.teacher;case"student":g+=i.roleValues.student}}var e=c.localStorage.getItem("authToken"),f=!1,g=0,h={},i=this;this.roleValues={admin:4,teacher:2,student:1},this.getLoginResponse=function(){return h},this.getRolesArray=function(){var a=[];for(var b in this.roleValues)this.roleValues.hasOwnProperty(b)&&g&this.roleValues[b]&&a.push(b);return a},this.allowedForbidden=function(a,b){"object"!=typeof a&&(a=[a]),"object"!=typeof b&&(b=[b]);for(var c=0,d=0;d<a.length;d++)i.roleValues.hasOwnProperty(a[d])&&(c+=i.roleValues[a[d]]);var e=0;for(d=0;d<b.length;d++)i.roleValues.hasOwnProperty(b[d])&&(e+=i.roleValues[b[d]]);return 0==(g&e)&&(g&c)>0},this.checkRole=function(a){if(!i.roleValues[a])throw"Invalid role name";return(i.roleValues[a]&g)>0},this.atLeast=function(a){if(!i.roleValues[a])throw"Invalid role name";return g>=i.roleValues[a]},this.getRoleValue=function(){return g},this.isLogged=function(){return f},this.getAuthToken=function(){return e},this.hasAuthToken=function(){return void 0!=e&&null!=e},this.login=function(g,i){return a.getResource(null,"login").save({username:g,password:i}).$promise.then(function(a){return c.localStorage.setItem("authToken",a.token),e=a.token,f=!0,h=a,d(a.role),a},function(a){return c.localStorage.removeItem("authToken"),e=null,f=!1,b.reject(a.data)})},this.logout=function(){return e&&f?a.getResource(e,"logout").get().$promise.then(function(a){return c.localStorage.removeItem("authToken"),e=null,f=!1,g=0,h=null,a},function(a){return b.reject(a.data)}):b.reject("null authToken")},this.getSessionInfo=function(){return e?a.getResource(e,"info").get().$promise.then(function(a){return f=!0,h=a,d(a.role),a},function(a){return f=!1,b.reject(a.data)}):b.reject("null authToken")}}]),angular.module("frontendStableApp").service("TeachersService",["ResourcesGeneratorService","AuthService","$q",function(a,b,c){this.getList=function(){return b.isLogged&&b.atLeast("admin")?a.getResource(b.getAuthToken(),"teachers").query().$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.getOneTeacher=function(d){return b.isLogged&&b.atLeast("admin")?a.getResource(b.getAuthToken(),"teachers/:id").get({id:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.addTeacher=function(d,e,f,g){return b.isLogged&&b.atLeast("admin")?a.getResource(b.getAuthToken(),"teachers/").post({name:d,surname:e,username:f,password:g,role:"teacher"}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.updateTeacher=function(d,e,f,g,h){return b.isLogged&&b.atLeast("admin")?a.getResource(b.getAuthToken(),"teachers/:id").put({id:d},{name:e,surname:f,username:g,password:h,role:"teacher"}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.deleteTeacher=function(d){return b.isLogged&&b.atLeast("admin")?a.getResource(b.getAuthToken(),"teachers/:id")["delete"]({id:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")}}]),angular.module("frontendStableApp").service("TasksService",["ResourcesGeneratorService","AuthService","$q",function(a,b,c){this.getList=function(){return b.isLogged&&b.atLeast("teacher")?a.getResource(b.getAuthToken(),"tasks").query().$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.getOneTask=function(d){return b.isLogged&&b.atLeast("student")?a.getResource(b.getAuthToken(),"tasks/:id").get({id:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.addTask=function(d){return b.isLogged&&b.allowedForbidden("teacher","admin")?a.getResource(b.getAuthToken(),"tasks").create(d).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.deleteTask=function(d){return b.isLogged&&b.allowedForbidden("teacher","admin")?a.getResource(b.getAuthToken(),"tasks/:id")["delete"]({id:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")}}]),angular.module("frontendStableApp").service("GroupsService",["ResourcesGeneratorService","AuthService","$q",function(a,b,c){this.getList=function(){return b.isLogged&&b.atLeast("teacher")?a.getResource(b.getAuthToken(),"groups").query().$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.addGroup=function(d){return b.isLogged&&b.allowedForbidden("teacher","admin")?a.getResource(b.getAuthToken(),"groups").post({description:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.updateGroup=function(d,e){return b.isLogged&&b.allowedForbidden("teacher","admin")?a.getResource(b.getAuthToken(),"groups/:id").put({id:d},{description:e}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.deleteGroup=function(d){return b.isLogged&&b.allowedForbidden("teacher","admin")?a.getResource(b.getAuthToken(),"groups/:id")["delete"]({id:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.assignStudentToGroup=function(d,e){return b.isLogged&&b.allowedForbidden("teacher","admin")?a.getResource(b.getAuthToken(),"groups/:groupId/student/:studentId").put({groupId:e,studentId:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")},this.removeStudentFromGroup=function(d,e){return b.isLogged&&b.allowedForbidden("teacher","admin")?a.getResource(b.getAuthToken(),"groups/:groupId/student/:studentId")["delete"]({groupId:e,studentId:d}).$promise.then(a.successHandler,a.failureHandler):c.reject("User not logged in")}}]),angular.module("frontendStableApp").filter("roleFormatter",function(){return function(a){if("string"==typeof a)switch(a){case"admin":return"Amministratore";case"teacher":return"Docente";case"student":return"Studente"}return""}}),angular.module("frontendStableApp").run(["$templateCache",function(a){a.put("views/about.html",'<md-dialog aria-label="About Us"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>About Us</h2> <span flex></span> <md-button class="md-icon-button" ng-click="close()"> <md-icon md-font-icon="fa-close" style="font-size: 20px" class="fa" aria-label="Close dialog"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <h2 style="margin-top: 0">very swag. so text. very word, rate me, many lorem.</h2> <p> such word. rate me! much layout. i can haz doge, wow! need lorem. need dolor, very word, much ipsum, wow! such swag. go full. need dolor, wow! such word. txt me. very word, such swag. many word, much lorem. </p> <h5>Versione: {{clientVersion}}</h5> </div> </md-dialog-content> </form> </md-dialog>'),a.put("views/login.html",'<md-content class="md-padding" layout-xs="column" layout="row" layout-align="center center"> <div flex-xs flex-gt-xs="50" flex-gt-md="30" layout="column"> <md-card style="margin-top: 25%"> <img ng-src="images/login-card.2b0f315a.png" class="md-card-image" alt="Login"> <md-content layout-padding class="login-container" style="position: relative"> <div ng-show="loading" layout="column" layout-align="center center" style="margin-top: 10px"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> <h2>{{loadingMessage}}</h2> </div> <div ng-show="loginForm && !loading"> <h4 style="margin: 0" ng-if="errorMessage">{{errorMessage}}</h4> <form name="LoginForm"> <div layout="column"> <md-input-container> <label>Username</label> <input ng-model="user.username" ng-disabled="loading" required> </md-input-container> <md-input-container> <label>Password</label> <input ng-model="user.password" ng-disabled="loading" type="password" required> </md-input-container> </div> </form> </div> </md-content> <md-card-actions layout="row" layout-align="end center" ng-show="loginForm && !loading"> <md-button class="md-primary md-raised" ng-disabled="LoginForm.$invalid" ng-click="login()">Login </md-button> </md-card-actions> </md-card> </div> </md-content>'),a.put("views/main.html","<h1>It works</h1>"),a.put("views/teachers.html",'<md-card layout-fill class="no-padding" ng-if="!teacherId && !loading"> <md-button class="md-primary md-raised" ng-click="$location.path(\'/teachers/new\')">Aggiungi Docente</md-button> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="teacher in teachers" ng-click="openTeacher(teacher.id)"> <md-icon md-font-icon="fa-graduation-cap" class="fa" style="font-size: 38px"></md-icon> <div class="md-list-item-text"> <h3>{{teacher.name}} {{teacher.surname}}</h3> <p>{{teacher.username}}</p> </div> <md-button class="md-secondary md-icon-button md-raised" ng-click="deleteTeacher(teacher.id, $index, $event)" aria-label="call"> <md-icon md-font-icon="fa-trash" class="fa" style="font-size: 25px"></md-icon> </md-button> </md-list-item> </md-list> </md-card> <md-card layout-padding ng-if="teacherId && !loading"> <h3>{{teacherId == \'new\' ? \'Aggiungi\' : \'Modifica\'}} Docente</h3> <md-content style="background-color: white"> <div> <form name="teacherForm"> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Nome</label> <input ng-model="user.name" required> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <label>Cognome</label> <input ng-model="user.surname" required> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Username</label> <input ng-model="user.username" required> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Password</label> <input ng-model="user.password" type="password"> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <label>Conferma Password</label> <input ng-model="user.password2" type="password"> </md-input-container> </div> </form> </div> </md-content> <md-content layout="row" layout-align="end center" style="background-color: white"> <md-button class="md-primary md-raised" ng-disabled="teacherForm.$invalid || user.password != user.password2" ng-click="save()">Salva </md-button> </md-content> </md-card>')}]);