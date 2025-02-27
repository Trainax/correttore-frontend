var hostName = "https://cors-anywhere.herokuapp.com/http://80.211.111.61/correttoreapi";

"use strict";
angular.module("frontendStableApp", ["ngAnimate", "ngAria", "ngCookies", "ngMessages", "ngResource", "ngRoute", "ngSanitize", "ngMaterial", "ngFileUpload"]).config(["$routeProvider", function(a) {
  a.when("/", {
    templateUrl: "views/main.html",
    controller: "MainCtrl"
  }).when("/login", {
    templateUrl: "views/login.html",
    controller: "LoginCtrl"
  }).when("/teachers/:teacherId?", {
    templateUrl: "views/teachers.html",
    controller: "TeachersCtrl"
  }).when("/groups/:groupId?", {
    templateUrl: "views/groups.html",
    controller: "GroupsCtrl"
  }).when("/tasks/:taskId?", {
    templateUrl: "views/tasks.html",
    controller: "TasksCtrl"
  }).when("/problems/:problemId?/:testId?", {
    templateUrl: "views/problems.html",
    controller: "ProblemsCtrl"
  }).when("/tests/:testId?", {
    templateUrl: "views/tests.html",
    controller: "TestsCtrl",
    controllerAs: "ctrl"
  }).when("/studentstests", {
    templateUrl: "views/studentstests.html",
    controller: "StudentsTestsCtrl"
  }).when("/students/:studentId?", {
    templateUrl: "views/students.html",
    controller: "StudentsCtrl"
  }).otherwise({
    redirectTo: "/"
  })
}]).config(["$mdThemingProvider", function(a) {
  a.theme("guest").primaryPalette("light-green").accentPalette("deep-orange").warnPalette("pink").dark(), a.theme("guestLight").primaryPalette("light-green").accentPalette("deep-orange").warnPalette("pink"), a.theme("loginTheme").primaryPalette("light-blue").accentPalette("deep-orange").warnPalette("pink").dark(),  a.theme("student").primaryPalette("amber").accentPalette("cyan").warnPalette("pink").dark(), a.theme("studentLight").primaryPalette("amber").accentPalette("cyan").warnPalette("pink"), a.theme("teacher").primaryPalette("blue").accentPalette("deep-orange").warnPalette("amber").dark(), a.theme("teacherLight").primaryPalette("blue").accentPalette("deep-orange").warnPalette("amber"), a.theme("admin").primaryPalette("green").accentPalette("indigo").warnPalette("amber").dark(), a.theme("adminLight").primaryPalette("green").accentPalette("indigo").warnPalette("amber"), a.setDefaultTheme("guest"), a.alwaysWatchTheme(!0)
}]).config(["ConfigProvider", function(a) {
  a.serverVersion = "v1", a.serverHost = hostName, a.authTokenName = "x-authorization-token", a.testResultsReloadInterval = 8e3
}]), angular.module("frontendStableApp").provider("Config", function() {
  this.serverVersion = null, this.serverHost = null, this.authTokenName = null, this.testResultsReloadInterval = 5e3, this.clientVersion = "0.1.9";
  var a = "Uninitialized config server values";
  this.$get = function() {
    var b = this;
    return {
      getServerPath: function() {
        if (!b.serverHost || !b.serverVersion) throw a;
        return b.serverHost + "/" + b.serverVersion + "/"
      },
      getAuthTokenName: function() {
        if (!b.authTokenName) throw a;
        return b.authTokenName
      },
      getVersion: function() {
        return b.clientVersion
      },
      getTestResultsReloadInterval: function() {
        return b.testResultsReloadInterval
      }
    }
  }
}), angular.module("frontendStableApp").provider("Tips", function() {
  function a(a) {
    for (var b = a.length; b > 0;) {
      var c = Math.floor(Math.random() * b);
      b--;
      var d = a[b];
      a[b] = a[c], a[c] = d
    }
    return a
  }
  var b = ["1 byte è composto da addirittura 8 bit! Sono tanti 8 bit...", "Se cancelli system32 il computer va più veloce!", "Trainax è stato qui!","Puoi usare il 100% del tuo computer senza mouse, prova!", "sudo rm -rf /* cambia sfondo del desktop su Ubuntu", "Han Solo MUORE", "Se hai Chrome puoi ancora vedere i voti sul registro (◕ᴗ◕✿)", "I gorilla sono animali notoriamente bravi a battere sulla tastiera", "Telegram è meglio di Whatsapp", "Mozilla Firefox è meglio di Google Chrome", "In C99 puoi dichiarare array anonimi con (int[]){...}", "Puoi inizializzare le strutture a 0 con struct something X = {0};", "In GCC il compilatore accetta suggerimenti sul branching del codice, rendendo potenzialmente più efficiente il codice"],
    c = 0;
  this.$get = function() {
    return {
      nextTip: function() {
        return (0 == c || c == b.length) && (c = 0, a(b)), b[c++]
      }
    }
  }
}), angular.module("frontendStableApp").directive("fileModel", ["$parse", function(a) {
  return {
    restrict: "A",
    link: function(b, c, d) {
      var e = a(d.fileModel),
        f = e.assign;
      c.bind("change", function() {
        b.$apply(function() {
          f(b, c[0].files[0])
        })
      })
    }
  }
}]), angular.module("frontendStableApp").controller("MainCtrl", ["AuthService", "$location", function(a, b) {
  a.isLogged() || b.path("/login")
}]), angular.module("frontendStableApp").controller("SidenavCtrl", ["$scope", "$mdMedia", "$mdDialog", "$mdSidenav", "$mdTheming", "$location", "Config", "$rootScope", "AuthService", "Tips", function(a, b, c, d, e, f, g, h, i, j) {
  function k(a) {
    var d = (b("sm") || b("xs")) && h.customFullscreen,
      f = {
        value: j.nextTip()
      };
     c.show({
      controller: "DialogCtrl",
      templateUrl: "views/about.html",
      parent: angular.element(document.body),
      targetEvent: a,
      clickOutsideToClose: !0,
      fullscreen: d,
      locals: {
        items: {
          clientVersion: g.getVersion(),
          rootScope: h,
          tip: f,
          darkTheme: e.THEMES[h.theme].isDark,
          next: function() {
            f.value = j.nextTip()
          },
          cambiaTema: function() {
            if(h.theme == "student"){
              h.theme= "studentLight";
            }
            else if(h.theme == "guest"){
              h.theme= "guestLight";
            }
            else if(h.theme == "teacher"){
              h.theme= "teacherLight";
            }
            else if(h.theme == "admin"){
              h.theme= "adminLight";
            }
            else if(h.theme == "studentLight"){
              h.theme= "student";
            }
            else if(h.theme == "guestLight"){
              h.theme= "guest";
            }
            else if(h.theme == "teacherLight"){
              h.theme= "teacher";
            }
            else if(h.theme == "adminLight"){
              h.theme= "admin";
            }
          }



        }
      }
    }), h.$watch(function() {
      return b("xs") || b("sm")
    }, function(a) {
      h.customFullscreen = a === !0
    })
  }
  a.customFullscreen = b("xs") || b("sm"), a.authService = i, a.closed = !1, h.$on("sidenav-close", function() {
    a.closed = !0
  }), h.$on("sidenav-toggle", function() {
    a.closed = !a.closed
  }), h.$on("sidenav-open", function() {
    a.closed = !1
  }), a.menuEntries = [{
    title: "Home",
    description: "Pagina principale",
    icon: "home",
    allowed: "*",
    link: "/"
  }, {
    title: "Docenti",
    description: "Gestisci i docenti",
    icon: "graduation-cap",
    allowed: "admin",
    link: "/teachers"
  }, {
    title: "Studenti",
    description: "Gestisci gli studenti",
    icon: "graduation-cap",
    allowed: "teacher",
    forbidden: "admin",
    link: "/students"
  }, {
    title: "Gruppi",
    description: "Gestisci i gruppi",
    icon: "users",
    allowed: ["admin", "teacher"],
    link: "/groups"
  }, {
    title: "Verifiche",
    description: "Visualizza le verifiche",
    icon: "graduation-cap",
    allowed: ["teacher"],
    link: "/tests"
  }, {
    title: "Verifiche",
    description: "Visualizza le verifiche",
    icon: "graduation-cap",
    allowed: ["student"],
    forbidden: ["admin", "teacher"],
    link: "/studentstests"
  }, {
    title: "Problemi",
    description: "Gestisci i problemi",
    icon: "tasks",
    allowed: ["admin", "teacher"],
    link: "/tasks"
  }, {
    title: "Esercizi",
    description: "Sottometti una soluzione",
    icon: "code",
    allowed: "*",
    link: "/problems"
  }, {
    title: "Disconnetti",
    description: "Esegui il logout",
    icon: "sign-out",
    allowed: "*",
    callback: function(a, b) {
      i.isLogged() ? i.logout().then(function() {
        f.path("/login")
      }) : f.path("/login")
    }
  }, {
    title: "Informazioni",
    description: "Informazioni sul correttore",
    icon: "info-circle",
    allowed: "*",
    callback: function(a, b) {
      k(b)
    }
  }], a.handleClick = function(b, c) {
    b.link ? a.goTo(b.link) : "function" == typeof b.callback && b.callback(b, c), d("left").close()
  }, a.display = function(a) {
    if (a.allowed) {
      if ("object" != typeof a.allowed) {
        if ("*" == a.allowed) return !0;
        a.allowed = [a.allowed]
      }
    } else a.allowed = [];
    if (a.forbidden) {
      if ("object" != typeof a.forbidden) {
        if ("*" == a.forbidden) return !1;
        a.forbidden = [a.forbidden]
      }
    } else a.forbidden = [];
    return i.allowedForbidden(a.allowed, a.forbidden)
  }, a.goTo = function(a) {
    f.path(a)
  }
}]), angular.module("frontendStableApp").controller("ToolbarCtrl", ["$scope", "$mdSidenav", "$rootScope", "$window", function(a, b, c, d) {
  var e = null;
  a.openSidenav = function() {
    b("left").open()
  }, a.hide = !1, a.loading = !1, c.$on("toolbar-hide", function() {
    a.hide = !0
  }), c.$on("toolbar-toggle", function() {
    a.hide = !a.hide
  }), c.$on("toolbar-show", function() {
    a.hide = !1
  }), c.$on("loading-start", function(b, c) {
    c && (e = c), a.loading = !0
  }), c.$on("loading-stop", function() {
    a.loading = !1
  }), c.$on("loading-toggle", function() {
    a.loading = !a.loading
  }), c.getClickEvent = function() {
    return e
  }, a.showBack = !1, a.goBack = function() {
    a.showBack = !1, d.history.back()
  }, c.$on("has-back", function() {
    a.showBack = !0
  })
}]), angular.module("frontendStableApp").controller("DialogCtrl", ["$scope", "$mdDialog", "items", function(a, b, c) {
  a.close = function() {
    b.cancel()
  };
  for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d])
}]), angular.module("frontendStableApp").controller("LoginCtrl", ["AuthService", "$scope", "$location", "$rootScope", "$mdSidenav", "$mdTheming", function(a, b, c, d, e, f) {
  function g() {
    d.$emit("sidenav-open"), d.$emit("toolbar-show"), f.THEMES.hasOwnProperty(a.getLoginResponse().role) && (d.theme = a.getLoginResponse().role), c.search().redirect ? (c.path(c.search().redirect), c.search({})) : c.path("/")
  }
  return a.isLogged() ? void g() : (e("left").close(), d.$emit("sidenav-close"), d.$emit("toolbar-hide"), b.user = {
    username: "",
    password: ""
  }, b.loading = !1, b.loginForm = !0, b.loadingMessage = "Accesso in corso...", b.errorMessage = null, b.loading || (d.theme = "loginTheme"), a.hasAuthToken() && (b.loadingMessage = "Ripresa della sessione...", b.loginForm = !1, b.loading = !0, a.getSessionInfo().then(function() {
    g()
  }, function() {
    b.errorMessage = "La sessione è scaduta. Accedi per continuare", b.loadingMessage = "Accesso in corso...", b.loading = !1, b.loginForm = !0
  })), b.login = function() {
    b.errorMessage = null, b.loading = !0, a.login(b.user.username, b.user.password).then(function() {
      g()
    }, function() {
      b.loading = !1, b.errorMessage = "Credenziali non valide"
    })
  }, void(b.guestLogin = function() {
    d.$emit("sidenav-open"), d.$emit("toolbar-show"), a.guestLogin(), d.theme = "guest", c.search().redirect ? (c.path(c.search().redirect), c.search({})) : c.path("/problems")
  }))
}]), angular.module("frontendStableApp").controller("TeachersCtrl", ["AuthService", "TeachersService", "$scope", "$location", "$routeParams", "$log", "$rootScope", function(a, b, c, d, e, f, g) {
  return a.isLogged() ? a.atLeast("admin") ? (c.$location = d, c.deleteTeacher = function(a, d, e) {
    g.$emit("loading-start"), c.teachers.splice(d, 1), b.deleteTeacher(a).then(function() {
      g.$emit("loading-stop")
    })
  }, c.loading = !0, g.$emit("loading-start"), c.teacherId = null, e.teacherId ? (c.teacherId = e.teacherId, c.user = {
    name: "",
    surname: "",
    username: "",
    password: "",
    password2: ""
  }, "new" == c.teacherId ? (c.loading = !1, g.$emit("loading-stop")) : b.getOneTeacher(c.teacherId).then(function(a) {
    c.loading = !1, g.$emit("loading-stop"), c.user = a
  }), c.save = function() {
    g.$emit("loading-start"), "new" == c.teacherId ? b.addTeacher(c.user.name, c.user.surname, c.user.username, c.user.password).then(function(a) {
      g.$emit("loading-stop"), d.path("/teachers")
    }) : b.updateTeacher(c.teacherId, c.user.name, c.user.surname, c.user.username, c.user.password).then(function(a) {
      g.$emit("loading-stop"), d.path("/teachers")
    })
  }) : (c.teachers = [], b.getList().then(function(a) {
    c.loading = !1, g.$emit("loading-stop"), c.teachers = a
  })), void(c.openTeacher = function(a) {
    g.$emit("has-back"), d.path("/teachers/" + a)
  })) : (d.path("/"), void d.search({})) : (d.search({
    redirect: d.path()
  }), void d.path("/login"))
}]), angular.module("frontendStableApp").controller("GroupsCtrl", ["AuthService", "GroupsService", "$scope", "$location", "$routeParams", "$log", "$rootScope", function(a, b, c, d, e, f, g) {
  if (!a.isLogged()) return d.search({
    redirect: d.path()
  }), void d.path("/login");
  if (!a.atLeast("teacher")) return d.path("/"), void d.search({});
  if (c.$location = d, c.isTeacherOnly = a.allowedForbidden("teacher", "admin"), c.deleteGroup = function(a, d) {
      return c.isTeacherOnly ? (g.$emit("loading-start"), c.groups.splice(d, 1), void b.deleteGroup(a).then(function() {
        g.$emit("loading-stop")
      })) : !1
    }, c.loading = !0, g.$emit("loading-start"), c.groupId = null, e.groupId) {
    if (!c.isTeacherOnly) return d.path("/groups"), !1;
    c.groupId = e.groupId, c.group = {
      description: ""
    }, "new" == c.groupId ? (c.loading = !1, g.$emit("loading-stop")) : b.getList().then(function(a) {
      for (var b = 0; b < a.length; b++) a[b].id == c.groupId && (c.group = a[b]);
      c.group.description || d.path("/groups"), c.loading = !1, g.$emit("loading-stop")
    }), c.save = function() {
      g.$emit("loading-start"), "new" == c.groupId ? b.addGroup(c.group.description).then(function(a) {
        g.$emit("loading-stop"), d.path("/groups")
      }) : b.updateGroup(c.groupId, c.group.description).then(function(a) {
        g.$emit("loading-stop"), d.path("/groups")
      })
    }
  } else c.groups = [], b.getList().then(function(a) {
    c.loading = !1, g.$emit("loading-stop"), c.groups = a
  });
  c.openGroup = function(a) {
    g.$emit("has-back"), d.path("/groups/" + a)
  }
}]), angular.module("frontendStableApp").controller("TasksCtrl", ["AuthService", "TasksService", "ProblemsService", "CategoriesService", "$scope", "$location", "$routeParams", "$log", "$rootScope", "$mdMedia", "$mdTheming", "$mdDialog", function(a, b, c, d, e, f, g, h, i, j, k, l) {
  if (!a.isLogged()) return f.search({
    redirect: f.path()
  }), void f.path("/login");
  if (i.theme || (i.theme = k.defaultTheme()), e.currentThemeObj = k.THEMES[i.theme], e.mdMedia = j, e.categorie = [], e.loadingCategories = !0, !a.atLeast("teacher")) return f.path("/"), void f.search({});
  if (e.$location = f, e.isTeacherOnly = a.allowedForbidden("teacher", "admin"), e.deleteTask = function(a, c) {
      return e.isTeacherOnly ? (i.$emit("loading-start"), e.tasks.splice(c, 1), void b.deleteTask(a).then(function() {
        i.$emit("loading-stop")
      })) : !1
    }, e.loading = !0, i.$emit("loading-start"), e.taskId = null, g.taskId) {
    if (e.taskId = g.taskId, "new" == e.taskId && !e.isTeacherOnly) return f.path("/tasks"), !1;
    e.task = {
      title: "",
      short_title: "",
      is_public: "0",
      level: 1,
      test_cases: 1,
      category_id: 0,
      description: null,
      solution: null,
      material: null
    };
    var m = function() {
      d.getList().then(function(a) {
        e.loadingCategories = !1, e.categorie = a
      })
    };
    m(), e.newCategory = function(a) {
      var b = l.prompt().title("Nuova categoria").textContent("Dai un nome alla nuova categoria").placeholder("Grafi").ariaLabel("Nuova Categoria").targetEvent(a).theme(i.theme).ok("Conferma").cancel("Annulla");
      l.show(b).then(function(a) {
        return e.loadingCategories = !0, d.addCategory(a)
      }).then(function(a) {
        e.loadingCategories = !1, e.task.category_id = a.id, e.categorie.push(a)
      }, function() {
        e.loadingCategories = !1
      })
    }, e.setFile = function(a, b) {
      e.task[a] = b[0]
    }, "new" == e.taskId ? (e.loading = !1, i.$emit("loading-stop")) : b.getOneTask(e.taskId).then(function(a) {
      e.task = JSON.parse(JSON.stringify(a)), e.loading = !1, i.$emit("loading-stop"), e.task.test_cases = parseInt(e.task.test_cases)
    }, function(a) {
      f.path("/tasks")
    }), e.showingPDF = !1, e.loadingPDF = !1, e.taskPDF_URL = null, e.togglePDF = function() {
      if ("new" != e.taskId) {
        if (e.showingPDF) return void(e.showingPDF = !1);
        e.loadingPDF = !0, c.testGetPDF(e.taskId).then(function(a) {
          e.showingPDF = !0, e.taskPDF_URL = a
        })["finally"](function() {
          e.loadingPDF = !1
        })
      }
    }, e.save = function() {
      i.$emit("loading-start"), "new" == e.taskId ? b.addTask(e.task).then(function(a) {
        i.$emit("loading-stop"), f.path("/tasks")
      }) : (i.$emit("loading-start"), b.updateTask(e.taskId, e.task).then(function(a) {
        i.$emit("loading-stop")
      }))
    }
  } else e.tasks = [], b.getList().then(function(a) {
    e.loading = !1, i.$emit("loading-stop"), e.tasks = a
  });
  e.openTask = function(a) {
    i.$emit("has-back"), f.path("/tasks/" + a)
  }
}]), angular.module("frontendStableApp").controller("ProblemsCtrl", ["AuthService", "ProblemsService", "TestsService", "ProblemsParserService", "$scope", "$timeout", "$location", "$routeParams", "$log", "$rootScope", "$mdMedia", "$mdTheming", "$mdDialog", "$q", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
  if (!a.isLogged() && a.getAuthToken() || !a.getLoginResponse().username) return g.search({
    redirect: g.path()
  }), void g.path("/login");
  if (j.theme || (j.theme = l.defaultTheme()), e.currentThemeObj = l.THEMES[j.theme], e.mdMedia = k, e.$location = g, e.loading = !0, e.pdfLoading = !0, j.$emit("loading-start"), e.problemId = null, e.testObject = null, e.loadingSubmission = !1, h.problemId) {
    e.problemId = h.problemId, e.customFullscreen = k("xs") || k("sm"), e.problem = {
      title: "",
      short_title: "",
      level: 0,
      pdf: null,
      sourceFile: null
    };
    var o = function(a, b, c) {
      var d = (k("sm") || k("xs")) && j.customFullscreen;
      m.show({
        controller: "DialogCtrl",
        templateUrl: "views/submissiondetails.html",
        parent: angular.element(document.body),
        targetEvent: a,
        clickOutsideToClose: !0,
        fullscreen: d,
        locals: {
          items: {
            rootScope: j,
            score: b,
            lines: c
          }
        }
      })
    };
    e.submit = function(a) {
      var c = e.problem.sourceFile;
      e.problem.sourceFile = null, e.loadingSubmission = !0;
      var d = null;
      d = h.testId ? b.testSubmitFile(e.problemId, h.testId, c) : b.submitFile(e.problemId, c), d.then(function(b) {
        var c = parseFloat(b.data.score),
          d = b.data.lines;
        e.loadingSubmission = !1, o(a, c, d)
      }, function(b) {
        i.warn(b), e.openCompilationWarningDiaog(b, a), e.loadingSubmission = !1
      })
    }, e.setFile = function(a, b) {
      e.problem[a] = b[0]
    };
    var p = [];
    h.testId ? (p.push(b.testGetOneProblem(e.problemId)), p.push(c.getList()), p.push(c.getTasks(h.testId))) : p.push(b.getOneProblem(e.problemId));
    var q = function(a) {
      return "object" != typeof a || 0 == a.length ? null : a.filter(function(a) {
        return a.id == h.testId
      })[0]
    };
    n.all(p).then(function(a) {
      var c = a[1],
        d = a[2];
      if (e.problem = a[0], e.loading = !1, j.$emit("loading-stop"), h.testId) {
        e.testObject = q(c || []);
        var f = (d || []).filter(function(a) {
          return a.id == e.problemId
        }).length > 0;
        return e.testObject && f ? b.testGetPDF(e.problemId) : n.reject("Verifica non valida")
      }
      return b.getPDF(e.problemId)
    }).then(function(a) {
      e.problem.pdf = a, e.pdfLoading = !1
    }, function(a) {
      e.pdfLoading = !1, i.error(a), h.testId && g.path("/tests/" + h.testId)
    })
  } else e.problems = [], b.getList().then(function(a) {
    e.loading = !1, j.$emit("loading-stop"), e.problems = a
  });
  e.openProblem = function(a) {
    j.$emit("has-back"), g.path("/problems/" + a)
  }, e.openCompilationWarningDiaog = function(a, b) {
    var c = (k("sm") || k("xs")) && j.customFullscreen;
    m.show({
      controller: "DialogCtrl",
      templateUrl: "views/compileroutput.html",
      parent: angular.element(document.body),
      targetEvent: b,
      clickOutsideToClose: !0,
      fullscreen: c,
      locals: {
        items: {
          compilerOutput: a.data.replace(/(.*)Compilation errors or warnings:/, ""),
          rootScope: j
        }
      }
    })
  }
}]), angular.module("frontendStableApp").controller("TestsCtrl", ["AuthService", "TestsService", "TasksService", "$scope", "Config", "$window", "$interval", "$location", "$routeParams", "$log", "$rootScope", "$q", "$mdDialog", "$mdMedia", function(a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
  function o(a, b) {
    var c = document.getElementById("fileDownload");
    c.href = a, c.download = b, c.click(), f.URL.revokeObjectURL(a)
  }
  if (!a.isLogged()) return h.search({
    redirect: h.path()
  }), void h.path("/login");
  if (!a.atLeast("teacher") || a.atLeast("admin")) return h.path("/"), void h.search({});
  var p = this;
  d.$location = h;
  var q = [];
  if (p.testTasks = [], d.deleteTest = function(a, c) {
      k.$emit("loading-start"), d.tests.splice(c, 1), b.deleteTest(a).then(function() {
        k.$emit("loading-stop")
      })
    }, d.loading = !0, k.$emit("loading-start"), d.testId = null, i.testId) {
    if (d.testId = i.testId, d.test = {
        description: "",
        is_on: "0",
        tasks: p.testTasks
      }, d.tasks = [], d.selectedItem = null, d.searchText = null, d.transformChip = function(a) {
        return a
      }, d.querySearch = function(a) {
        return a ? d.tasks.filter(function(b) {
          if ("0" != b.is_public) return !1;
          var c = p.testTasks.some(function(a) {
            return a.title == b.title
          });
          if (c) return !1;
          var d = b.title.toLowerCase();
          return 0 === d.lastIndexOf(a.toLowerCase(), 0)
        }) : []
      }, "new" == d.testId) d.loading = !1, k.$emit("loading-stop");
    else {
      d.risultati = [], d.loadingResults = !1, d.loadingTicks = 0, d.resultsInterval = null, d.$on("$routeChangeStart", function() {
        d.resultsInterval && g.cancel(d.resultsInterval)
      });
      var r = function() {
        d.loadingResults = !0, b.getClassResults(d.testId).then(function(a) {
          d.risultati = a, d.loadingTicks = 0, d.loadingResults = !1
        })
      };
      d.loadResults = function() {
        d.resultsInterval && g.cancel(d.resultsInterval), r(), d.resultsInterval = g(function() {
          d.loadingResults || (d.loadingTicks >= 100 ? r() : d.loadingTicks++)
        }, e.getTestResultsReloadInterval() / 100)
      }, d.loadingCSV = !1, d.downloadCSV = function() {
        d.loadingCSV = !0, b.getClassCSVResults(d.testId).then(function(a) {
          o(a, d.test.description + ".csv")
        })["finally"](function() {
          d.loadingCSV = !1
        })
      }, b.getList().then(function(a) {
        for (var e = 0; e < a.length; e++) a[e].id == d.testId && (d.test = a[e]);
        return d.test.description ? l.all([b.getTasks(d.testId), c.getList()]) : (h.path("/tests"), l.reject("Invalid testId"))
      }).then(function(a) {
        var b = a[0],
          c = a[1];
        p.testTasks = b, q = JSON.parse(JSON.stringify(b)), d.tasks = c, d.loading = !1, k.$emit("loading-stop"), "1" == d.test.is_on && d.loadResults()
      }), d.customFullscreen = n("xs") || n("sm");
      var s = (n("sm") || n("xs")) && d.customFullscreen;
      d.openRisultatiStudente = function(a, c, d, e, f, g) {
        var h = {};
        m.show({
          controller: "DialogCtrl",
          templateUrl: "views/taskresult.html",
          parent: angular.element(document.body),
          targetEvent: g,
          clickOutsideToClose: !0,
          fullscreen: s,
          locals: {
            items: {
              rootScope: k,
              result: h,
              score: d,
              fullName: e,
              downloading: {},
              downloadTaskSources: function(d, e, g) {
                g[e] = !0, b.downloadSources(d.task_id, a, c).then(function(a) {
                  o(a, f + "_" + d.short_title + ".c")
                })["finally"](function() {
                  g[e] = !1
                })
              }
            }
          }
        }), b.getStudentResult(a, c).then(function(a) {
          h.data = a
        })
      }, d.$watch(function() {
        return n("xs") || n("sm")
      }, function(a) {
        d.customFullscreen = a === !0
      })
    }
    d.save = function() {
      if (k.$emit("loading-start"), "new" == d.testId) b.addTest(d.test.description).then(function(a) {
        k.$emit("loading-stop"), h.path("/tests")
      });
      else {
        var a = [];
        p.testTasks.forEach(function(c) {
          var e = !q.some(function(a) {
            return a.title == c.title
          });
          e && a.push(b.assignTaskToTest(c.id, d.testId))
        }), q.forEach(function(c) {
          var e = !p.testTasks.some(function(a) {
            return a.title == c.title
          });
          e && a.push(b.removeTaskFromTest(c.id, d.testId))
        }), l.all(a).then(function() {
          return b.updateTest(d.testId, d.test)
        }).then(function(a) {
          k.$emit("loading-stop"), h.path("/tests")
        })
      }
    }
  } else d.tests = [], b.getList().then(function(a) {
    d.loading = !1, k.$emit("loading-stop"), d.tests = a;
    var c = [];
    return d.tests.forEach(function(a) {
      a.loadingResults = !0, c.push(b.getClassResults(a.id))
    }), l.all(c)
  }).then(function(a) {
    a.forEach(function(a, b) {
      d.tests[b].loadingResults = !1, d.tests[b].results = a
    })
  });
  d.openTest = function(a) {
    k.$emit("has-back"), h.path("/tests/" + a)
  }
}]), angular.module("frontendStableApp").controller("StudentsTestsCtrl", ["AuthService", "TestsService", "$location", "$rootScope", "$scope", "$q", function(a, b, c, d, e, f) {
  return a.isLogged() ? !a.atLeast("student") || a.atLeast("teacher") ? (c.path("/"), void c.search({})) : (e.$location = c, e.theme = d.theme, e.loading = !0, d.$emit("loading-start"), e.tests = [], b.getList().then(function(c) {
    e.loading = !1, d.$emit("loading-stop"), e.tests = c;
    var g = [];
    return e.tests.forEach(function(c) {
      c.loadingResults = !0, g.push(b.getStudentResult(a.getUserId(), c.id))
    }), f.all(g)
  }).then(function(a) {
    e.tests.forEach(function(b, c) {
      b.loadingResults = !1, b.results = a[c]
    })
  }), e.tasksForTest = {}, e.loadTasks = function(a, c, d) {
    e.tasksForTest[a] || b.getTasks(a).then(function(b) {
      e.tasksForTest[a] = b
    }), d(c)
  }, void(e.openTask = function(a, b) {
    d.$emit("has-back"), c.path("/problems/" + b + "/" + a)
  })) : (c.search({
    redirect: c.path()
  }), void c.path("/login"))
}]), angular.module("frontendStableApp").controller("StudentsCtrl", ["AuthService", "StudentsService", "$scope", "$location", "$routeParams", "$log", "$rootScope", function(a, b, c, d, e, f, g) {
  return a.isLogged() ? !a.atLeast("teacher") || a.atLeast("admin") ? (d.path("/"), void d.search({})) : (c.$location = d, c.deleteStudent = function(a, d, e) {
    g.$emit("loading-start"), c.students.splice(d, 1), b.deleteStudent(a).then(function() {
      g.$emit("loading-stop")
    })
  }, c.loading = !0, g.$emit("loading-start"), c.studentId = null, e.studentId ? (c.studentId = e.studentId, c.user = {
    name: "",
    surname: "",
    username: "",
    password: "",
    password2: ""
  }, "new" == c.studentId ? (c.loading = !1, g.$emit("loading-stop")) : b.getOneStudent(c.studentId).then(function(a) {
    c.loading = !1, g.$emit("loading-stop"), c.user = a
  }), c.save = function() {
    g.$emit("loading-start"), "new" == c.studentId ? b.addStudent(c.user.name, c.user.surname, c.user.username, c.user.password).then(function(a) {
      g.$emit("loading-stop"), d.path("/students")
    }) : b.updateStudent(c.studentId, c.user.name, c.user.surname, c.user.username, c.user.password).then(function(a) {
      g.$emit("loading-stop"), d.path("/students")
    })
  }) : (c.students = [], b.getList().then(function(a) {
    c.loading = !1, g.$emit("loading-stop"), c.students = a
  })), void(c.openStudent = function(a) {
    g.$emit("has-back"), d.path("/students/" + a)
  })) : (d.search({
    redirect: d.path()
  }), void d.path("/login"))
}]), angular.module("frontendStableApp").service("ResourcesGeneratorService", ["Config", "$resource", "$q", "$mdDialog", "$rootScope", function(a, b, c, d, e) {
  var f = {
    data: {
      "Not a valid request": "Richiesta incompleta",
      "User not found": "Credenziali errate o inesistenti",
      Forbidden: "Accesso negato",
      Unauthorized: "Sessione scaduta o permessi insufficienti",
      "Method not allowed by your role": "Permessi insufficienti",
      "Wrong role": "Il tuo ruolo non permette quest'azione",
      "category already exist": "Esiste già una categoria con questo nominativo",
      "group already exist": "Esiste già un gruppo con questo nominativo",
      "permission denied, user does not own this group": "Il gruppo appartiene ad un altro utente",
      "group does not exist or description is duplicated": "Gruppo da modificare non valido",
      "permission denied, user does not own this group or the group does not exist": "Gruppo inesistente",
      "permission denied, user is not a student or the student does not exist": "L'utente selezionato non esiste",
      "You don't own the task": "Problema inesistente",
      "permission denied, task is public or the task does not exist": "Il problema è pubblico o inesistente",
      "permission denied, the task does not exist": "Problema inesistente",
      "The user doesn't own the task": "Problema inesistente",
      "The task doesn't exist": "Problema inesistente",
      "permission denied, user does not own this test": "Test inesistente",
      "permission denied, user id is not correct": "Studente inesistente",
      "test already exist": "Esiste già un test con questo nominativo",
      "test does not exist or description is duplicated": "Test da modificare non valido",
      "permission denied, user does not own this test or the test does not exist": "Test inesistente",
      "Task does not exist": "Problema inesistente",
      "Task is not public": "Il problema è privato",
      "Task is public": "Il problema è pubblico",
      "There is not the submitted file": "Codice sorgente mancante",
      "Only students can submit solutions": "Solo gli studenti possono sottomettere una soluzione",
      "This task is not in the current test": "Il problema non appartiene ad una verifica",
      "The test is no longer available": "La verifica è conclusa",
      "Only teachers can submit solutions": "Solo gli insegnati possono ottenere i risultati",
      "Solution not found": "Soluzione non trovata"
    },
    code: {
      409: "Conflitto nella creazione della risorsa",
      404: "Risorsa non trovata",
      403: "Accesso negato",
      401: "Permessi insufficienti per accedere alla risorsa",
      400: "Parametri mancanti"
    }
  };
  this.getResource = function(c, d) {
    var e = {};
    return e[a.getAuthTokenName()] = c, c ? b(a.getServerPath() + d, {}, {
      get: {
        method: "GET",
        headers: e
      },
      save: {
        method: "POST",
        headers: e
      },
      post: {
        method: "POST",
        headers: e
      },
      put: {
        method: "PUT",
        headers: e,
        params: {
          studentId: "@studentId",
          groupId: "@groupId",
          testId: "@testId",
          taskId: "@taskId"
        }
      },
      query: {
        method: "GET",
        isArray: !0,
        headers: e
      },
      remove: {
        method: "DELETE",
        headers: e
      },
      "delete": {
        method: "DELETE",
        headers: e
      }
    }) : b(a.getServerPath() + "public/" + d)
  }, this.successHandler = function(a) {
    return a
  }, this.failureHandler = function(a) {
    e.$emit("loading-stop");
    var b = null;
    return a && a.data && void 0 != a.data.error && (b = f.data[a.data.error]), b || (b = f.code[a.status]), d.show(d.alert().clickOutsideToClose(!0).title("Si è verificato un errore").textContent(b).ariaLabel("Messaggio di errore").ok("Chiudi").targetEvent(e.getClickEvent()).theme(e.theme)), c.reject(b || a)
  }
}]), angular.module("frontendStableApp").service("AuthService", ["ResourcesGeneratorService", "$q", "$window", function(a, b, c) {
  function d(a) {
    switch (h = 0, a) {
      case "admin":
        h += j.roleValues.admin;
      case "teacher":
        h += j.roleValues.teacher;
      case "student":
        h += j.roleValues.student
    }
  }
  var e = c.localStorage.getItem("authToken"),
    f = null,
    g = !1,
    h = 0,
    i = {},
    j = this;
  this.roleValues = {
    admin: 4,
    teacher: 2,
    student: 1
  }, this.getLoginResponse = function() {
    return i
  }, this.getRolesArray = function() {
    var a = [];
    for (var b in this.roleValues) this.roleValues.hasOwnProperty(b) && h & this.roleValues[b] && a.push(b);
    return a
  }, this.allowedForbidden = function(a, b) {
    "object" != typeof a && (a = [a]), "object" != typeof b && (b = [b]);
    for (var c = 0, d = 0; d < a.length; d++) j.roleValues.hasOwnProperty(a[d]) && (c += j.roleValues[a[d]]);
    var e = 0;
    for (d = 0; d < b.length; d++) j.roleValues.hasOwnProperty(b[d]) && (e += j.roleValues[b[d]]);
    return 0 == (h & e) && (h & c) > 0
  }, this.checkRole = function(a) {
    if (!j.roleValues[a]) throw "Invalid role name";
    return (j.roleValues[a] & h) > 0
  }, this.atLeast = function(a) {
    if (!j.roleValues[a]) throw "Invalid role name";
    return h >= j.roleValues[a]
  }, this.getRoleValue = function() {
    return h
  }, this.isLogged = function() {
    return g
  }, this.getAuthToken = function() {
    return e
  }, this.hasAuthToken = function() {
    return void 0 != e && null != e
  }, this.getUserId = function() {
    return f
  }, this.login = function(h, j) {
    return a.getResource(null, "login").save({
      username: h,
      password: j
    }).$promise.then(function(a) {
      return c.localStorage.setItem("authToken", a.token), e = a.token, f = a.id, g = !0, i = a, d(a.role), a
    }, function(a) {
      return c.localStorage.removeItem("authToken"), e = null, g = !1, b.reject(a.data)
    })
  }, this.guestLogin = function() {
    i = {
      username: "ospite"
    }
  }, this.logout = function() {
    return e && g ? a.getResource(e, "logout").get().$promise.then(function(a) {
      return c.localStorage.removeItem("authToken"), e = null, g = !1, h = 0, i = null, a
    }, function(a) {
      return b.reject(a.data)
    }) : b.reject("null authToken")
  }, this.getSessionInfo = function() {
    return e ? a.getResource(e, "info").get().$promise.then(function(a) {
      return g = !0, i = a, f = a.id, d(a.role), a
    }, function(a) {
      return g = !1, b.reject(a.data)
    }) : b.reject("null authToken")
  }
}]), angular.module("frontendStableApp").service("TeachersService", ["ResourcesGeneratorService", "AuthService", "$q", function(a, b, c) {
  this.getList = function() {
    return b.isLogged && b.atLeast("admin") ? a.getResource(b.getAuthToken(), "teachers").query().$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.getOneTeacher = function(d) {
    return b.isLogged && b.atLeast("admin") ? a.getResource(b.getAuthToken(), "teachers/:id").get({
      id: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.addTeacher = function(d, e, f, g) {
    return b.isLogged && b.atLeast("admin") ? a.getResource(b.getAuthToken(), "teachers/").post({
      name: d,
      surname: e,
      username: f,
      password: g,
      role: "teacher"
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.updateTeacher = function(d, e, f, g, h) {
    return b.isLogged && b.atLeast("admin") ? a.getResource(b.getAuthToken(), "teachers/:id").put({
      id: d
    }, {
      name: e,
      surname: f,
      username: g,
      password: h,
      role: "teacher"
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.deleteTeacher = function(d) {
    return b.isLogged && b.atLeast("admin") ? a.getResource(b.getAuthToken(), "teachers/:id")["delete"]({
      id: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }
}]), angular.module("frontendStableApp").service("TasksService", ["ResourcesGeneratorService", "Upload", "Config", "AuthService", "$q", function(a, b, c, d, e) {
  this.getList = function() {
    return d.isLogged && d.atLeast("teacher") ? a.getResource(d.getAuthToken(), "tasks").query().$promise.then(a.successHandler, a.failureHandler) : e.reject("User not logged in")
  }, this.getOneTask = function(b) {
    return d.isLogged && d.atLeast("student") ? a.getResource(d.getAuthToken(), "tasks/:id").get({
      id: b
    }).$promise.then(a.successHandler, a.failureHandler) : e.reject("User not logged in")
  }, this.updateTask = function(f, g) {
    if (!d.isLogged || !d.allowedForbidden("teacher", "admin")) return e.reject("User not logged in");
    var h = {};
    return h[c.getAuthTokenName()] = d.getAuthToken(), b.upload({
      url: c.getServerPath() + "tasks/" + f,
      headers: h,
      data: g
    }).then(a.successHandler, a.failureHandler, function(a) {})
  }, this.addTask = function(f) {
    if (!d.isLogged || !d.allowedForbidden("teacher", "admin")) return e.reject("User not logged in");
    var g = {};
    return g[c.getAuthTokenName()] = d.getAuthToken(), b.upload({
      url: c.getServerPath() + "tasks",
      headers: g,
      data: f
    }).then(a.successHandler, a.failureHandler, function(a) {})
  }, this.deleteTask = function(b) {
    return d.isLogged && d.allowedForbidden("teacher", "admin") ? a.getResource(d.getAuthToken(), "tasks/:id")["delete"]({
      id: b
    }).$promise.then(a.successHandler, a.failureHandler) : e.reject("User not logged in")
  }
}]), angular.module("frontendStableApp").service("GroupsService", ["ResourcesGeneratorService", "AuthService", "$q", function(a, b, c) {
  this.getList = function() {
    return b.isLogged && b.atLeast("teacher") ? a.getResource(b.getAuthToken(), "groups").query().$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.addGroup = function(d) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "groups").post({
      description: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.updateGroup = function(d, e) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "groups/:id").put({
      id: d
    }, {
      description: e
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.deleteGroup = function(d) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "groups/:id")["delete"]({
      id: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.assignStudentToGroup = function(d, e) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "groups/:groupId/student/:studentId").put({
      groupId: e,
      studentId: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.removeStudentFromGroup = function(d, e) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "groups/:groupId/student/:studentId")["delete"]({
      groupId: e,
      studentId: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }
}]), angular.module("frontendStableApp").service("ProblemsService", ["ResourcesGeneratorService", "Upload", "Config", "AuthService", "$sce", "$http", "$q", function(a, b, c, d, e, f, g) {
  this.getList = function() {
    return a.getResource(null, "problems").query().$promise.then(a.successHandler, a.failureHandler)
  };
  var h = function(d, e) {
      return b.upload({
        url: c.getServerPath() + "public/submissions/" + d,
        data: {
          submission: e
        }
      }).then(a.successHandler, null, function(a) {})
    },
    i = function(e, f) {
      if (!d.isLogged) return g.reject("User not logged in");
      var h = {};
      return h[c.getAuthTokenName()] = d.getAuthToken(), b.upload({
        url: c.getServerPath() + "public/submissions/" + e,
        headers: h,
        data: {
          submission: f
        }
      }).then(a.successHandler, null, function(a) {})
    };
  this.submitFile = function(a, b) {
    return d.isLogged() ? i(a, b) : h(a, b)
  }, this.getOneProblem = function(b) {
    return a.getResource(null, "problems/:id").get({
      id: b
    }).$promise.then(a.successHandler, a.failureHandler)
  }, this.getPDF = function(b) {
    return f.get(c.getServerPath() + "public/problems/" + b + ".pdf", {
      responseType: "arraybuffer"
    }).then(function(a) {
      var b = new Blob([a.data], {
          type: "application/pdf"
        }),
        c = URL.createObjectURL(b);
      return e.trustAsResourceUrl(c)
    }, a.failureHandler)
  }, this.testGetOneProblem = function(b) {
    return d.isLogged && d.atLeast("student") && !d.atLeast("teacher") ? a.getResource(d.getAuthToken(), "problems/:id").get({
      id: b
    }).$promise.then(a.successHandler, a.failureHandler) : g.reject("User not logged in")
  }, this.testGetPDF = function(b) {
    return d.isLogged && d.atLeast("student") ? f.get(c.getServerPath() + "problems/" + b + ".pdf", {
      responseType: "arraybuffer",
      headers: {
        "X-Authorization-Token": d.getAuthToken()
      }
    }).then(function(a) {
      var b = new Blob([a.data], {
          type: "application/pdf"
        }),
        c = URL.createObjectURL(b);
      return e.trustAsResourceUrl(c)
    }, a.failureHandler) : g.reject("User not logged in")
  }, this.testSubmitFile = function(e, f, h) {
    if (!d.isLogged || !d.atLeast("student") || d.atLeast("teacher")) return g.reject("User not logged in");
    var i = {};
    return i[c.getAuthTokenName()] = d.getAuthToken(), b.upload({
      url: c.getServerPath() + "submissions/tests/" + f + "/tasks/" + e,
      headers: i,
      data: {
        submission: h
      }
    }).then(a.successHandler, a.failureHandler, function(a) {})
  }
}]), angular.module("frontendStableApp").service("CategoriesService", ["ResourcesGeneratorService", "AuthService", "$q", function(a, b, c) {
  this.getList = function() {
    return a.getResource(null, "categories").query().$promise.then(a.successHandler, a.failureHandler)
  }, this.addCategory = function(d) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "categories").post({
      description: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.getSingleCategory = function(d) {
    return b.isLogged && b.atLeast("teacher") ? a.getResource(b.getAuthToken(), "categories/:id").get({
      id: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }
}]), angular.module("frontendStableApp").service("ProblemsParserService", function() {
  var a = /n\. ([0-9]+).*user time:[ ]+([0-9.]+)s] (.*)/;
  this.parse = function(b) {
    var c = [];
    return b.forEach(function(b) {
      var d = b.match(a);
      if (null != d) {
        var e = parseInt(d[1]),
          f = parseFloat(d[2]),
          g = d[3];
        c.push({
          caseId: e,
          runtime: f,
          outputText: g,
          isCorrect: "Output is correct" == g
        })
      } else c.push(b)
    }), c
  }
}), angular.module("frontendStableApp").service("TestsService", ["ResourcesGeneratorService", "AuthService", "$q", "Config", "$sce", "$http", "$window", function(a, b, c, d, e, f, g) {
  this.getList = function() {
    return b.isLogged && b.atLeast("student") && !b.atLeast("admin") ? a.getResource(b.getAuthToken(), "tests").query().$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.getTasks = function(d) {
    return b.isLogged && b.atLeast("student") && !b.atLeast("admin") ? a.getResource(b.getAuthToken(), "tests/:testId/tasks").query({
      testId: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.addTest = function(d) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "tests").post({
      description: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.updateTest = function(d, e) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "tests/:id").put({
      id: d
    }, e).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.deleteTest = function(d) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "tests/:id")["delete"]({
      id: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.assignTaskToTest = function(d, e) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "tests/:testId/task/:taskId").put({
      testId: e,
      taskId: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.removeTaskFromTest = function(d, e) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "tests/:testId/task/:taskId")["delete"]({
      testId: e,
      taskId: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.getClassResults = function(d) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? a.getResource(b.getAuthToken(), "tests/:testId/results").query({
      testId: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.getClassCSVResults = function(e) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? f.get(d.getServerPath() + "tests/" + e + "/results.csv", {
      responseType: "arraybuffer",
      headers: {
        "X-Authorization-Token": b.getAuthToken()
      }
    }).then(function(a) {
      var b = new Blob([a.data], {
        type: "text/csv"
      });
      return g.URL.createObjectURL(b)
    }, a.failureHandler) : c.reject("User not logged in")
  }, this.getStudentResult = function(d, e) {
    return !b.isLogged || b.atLeast("admin") ? c.reject("User not logged in") : a.getResource(b.getAuthToken(), "tests/:testId/users/:studentId/details").query({
      testId: e,
      studentId: d
    }).$promise.then(a.successHandler, a.failureHandler)
  }, this.downloadSources = function(e, h, i) {
    return b.isLogged && b.allowedForbidden("teacher", "admin") ? f.get(d.getServerPath() + "submissions/tests/" + i + "/tasks/" + e + "/users/" + h, {
      responseType: "arraybuffer",
      headers: {
        "X-Authorization-Token": b.getAuthToken()
      }
    }).then(function(a) {
      var b = new Blob([a.data], {
        type: "text/plain"
      });
      return g.URL.createObjectURL(b)
    }, a.failureHandler) : c.reject("User not logged in")
  }
}]), angular.module("frontendStableApp").service("StudentsService", ["ResourcesGeneratorService", "AuthService", "$q", function(a, b, c) {
  this.getList = function() {
    return b.isLogged && b.atLeast("teacher") && !b.atLeast("admin") ? a.getResource(b.getAuthToken(), "students").query().$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.getOneStudent = function(d) {
    return b.isLogged && b.atLeast("teacher") && !b.atLeast("admin") ? a.getResource(b.getAuthToken(), "students/:id").get({
      id: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.addStudent = function(d, e, f, g) {
    return b.isLogged && b.atLeast("teacher") && !b.atLeast("admin") ? a.getResource(b.getAuthToken(), "students/").post({
      name: d,
      surname: e,
      username: f,
      password: g,
      role: "student"
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.updateStudent = function(d, e, f, g, h) {
    return b.isLogged && b.atLeast("teacher") && !b.atLeast("admin") ? a.getResource(b.getAuthToken(), "students/:id").put({
      id: d
    }, {
      name: e,
      surname: f,
      username: g,
      password: h,
      role: "student"
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }, this.deleteStudent = function(d) {
    return b.isLogged && b.atLeast("teacher") && !b.atLeast("admin") ? a.getResource(b.getAuthToken(), "students/:id")["delete"]({
      id: d
    }).$promise.then(a.successHandler, a.failureHandler) : c.reject("User not logged in")
  }
}]), angular.module("frontendStableApp").filter("roleFormatter", function() {
  return function(a) {
    if ("string" == typeof a) switch (a) {
      case "admin":
        return "Amministratore";
      case "teacher":
        return "Docente";
      case "student":
        return "Studente"
    }
    return ""
  }
}), angular.module("frontendStableApp").filter("fileSizeFormatter", function() {
  return function(a) {
    return "number" == typeof a ? 1024 > a ? a + "B" : 1048576 > a ? (a / 1024).toFixed(2) + "KB" : (a / 1048576).toFixed(2) + "MB" : ""
  }
}), angular.module("frontendStableApp").run(["$templateCache", function(a) {
  a.put("views/about.html", '<md-dialog aria-label="Informazioni" md-theme="{{rootScope.theme}}" style="width: 70%"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Informazioni</h2> <span flex></span> <md-button class="md-icon-button" ng-click="close()"> <md-icon md-font-icon="fa-close" style="font-size: 20px" class="fa" aria-label="Close dialog"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <h2 style="margin-top: 0">Correttore</h2> <h3 style="margin-bottom: 3px">Lo sapevi che...</h3> <div class="tips-container" ng-class="{\'dark\': false}"> <p> {{tip.value}} </p> </div> <div layout="row" layout-align="end center"> <md-button class="md-primary md-raised" ng-click="cambiaTema()" style="margin-right: 0">Cambia Tema </md-button> <md-button class="md-primary md-raised" ng-click="next()" style="margin-right: 0">Prossimo </md-button> </div> <h5>Versione: {{clientVersion}}</h5> </div> </md-dialog-content> </form> </md-dialog>'), a.put("views/compileroutput.html", '<md-dialog aria-label="Output del Compilatore" md-theme="{{rootScope.theme}}"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Warning ed Errori</h2> <span flex></span> <md-button class="md-icon-button" ng-click="close()"> <md-icon md-font-icon="fa-close" style="font-size: 20px" class="fa" aria-label="Close dialog"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <h2 style="margin-top: 0">Output del Compilatore</h2> <pre class="wrap-lines">{{compilerOutput}}</pre> </div> </md-dialog-content> </form> </md-dialog>'), a.put("views/groups.html", '<md-card layout-fill class="no-padding" ng-if="!groupId && !loading"> <md-button class="md-primary md-raised" ng-if="isTeacherOnly" ng-click="$location.path(\'/groups/new\')">Aggiungi Gruppo </md-button> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="group in groups" ng-click="isTeacherOnly && openGroup(group.id)"> <md-icon md-font-icon="fa-users" class="fa" style="font-size: 38px"></md-icon> <div class="md-list-item-text"> <h3>{{group.description}}</h3> <p>TODO: numero di studenti</p> </div> <md-button ng-if="isTeacherOnly" class="md-secondary md-icon-button md-raised" ng-click="deleteGroup(group.id, $index, $event)" aria-label="call"> <md-icon md-font-icon="fa-trash" class="fa" style="font-size: 25px"></md-icon> </md-button> </md-list-item> </md-list> </md-card> <md-card layout-padding ng-if="groupId && !loading"> <h2>{{groupId == \'new\' ? \'Aggiungi\' : \'Modifica\'}} Gruppo</h2> <md-content style="background-color: white"> <div> <form name="groupForm"> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Descrizione</label> <input ng-model="group.description" required> </md-input-container> </div> </form> </div> </md-content> <md-content layout="row" layout-align="end center" style="background-color: white"> <md-button class="md-primary md-raised" ng-disabled="groupForm.$invalid" ng-click="save()">Salva </md-button> </md-content> </md-card>'), a.put("views/login.html", '<md-content class="md-padding" layout-xs="column" layout="row" layout-align="center center"> <div flex-xs flex-gt-xs="50" flex-gt-md="30" layout="column"> <md-card style="margin-top: 25%"> <img ng-src="images/login-lock.jpg" class="md-card-image" alt="Login"> <md-content layout-padding class="login-container" style="position: relative"> <div ng-show="loading" layout="column" layout-align="center center" style="margin-top: 10px"> <md-progress-circular md-mode="indeterminate"></md-progress-circular> <h2>{{loadingMessage}}</h2> </div> <div ng-show="loginForm && !loading"> <h4 style="margin: 0" ng-if="errorMessage">{{errorMessage}}</h4> <form name="LoginForm"> <div layout="column"> <md-input-container> <label>Nome utente</label> <input ng-model="user.username" ng-disabled="loading" ng-keypress="!LoginForm.$invalid && $event.keyCode == 13 && login()" required> </md-input-container> <md-input-container> <label>Password</label> <input ng-model="user.password" ng-disabled="loading" ng-keypress="!LoginForm.$invalid && $event.keyCode == 13 && login()" type="password" required> </md-input-container> </div> </form> </div> </md-content> <md-card-actions layout="row" layout-align="space-between center" ng-show="loginForm && !loading"> <md-button class="md-primary md-raised" ng-click="guestLogin()">Accedi come Ospite </md-button> <md-button class="md-primary md-raised" ng-disabled="LoginForm.$invalid" ng-click="login()">Login </md-button> </md-card-actions> </md-card> </div> </md-content>'), a.put("views/main.html", '<h1 style="text-align: center">Correttore</h1>'), a.put("views/problems.html", '<md-card layout-fill class="no-padding" ng-if="!problemId && !loading"> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="problem in problems" ng-click="openProblem(problem.id)"> <md-icon md-font-icon="fa-code" class="fa" style="font-size: 38px"></md-icon> <div class="md-list-item-text"> <h3>{{problem.title}}</h3> <!-- <p>Linea aggiuntiva non utilizzata</p> --> </div> </md-list-item> </md-list> </md-card> <md-card layout-padding ng-if="problemId && !loading"> <md-content style="background-color: inherit"> <h2 class="cardHeader problem"> <span ng-if="testObject" class="monospace">{{testObject.description}} - </span> {{problem.title}} (<span class="monospace">{{problem.short_title}}</span>) </h2> <md-tabs md-dynamic-height md-border-bottom> <md-tab label="Testo"> <div style="position: relative; min-height: 200px; clear: both"> <embed ng-if="problem.pdf" style="width: 100%; height: 85vh" ng-src="{{problem.pdf}}"> <md-progress-circular ng-if="pdfLoading" style="left: calc(50% - 25px); top: calc(50% - 25px); position: absolute" md-mode="indeterminate"></md-progress-circular> <h1 ng-if="!pdfLoading && !problem.pdf" style="text-align: center; padding-top: 90px">Testo attualmente non disponibile</h1> </div> </md-tab> <md-tab label="Sottomissioni"> <div> <form name="submitForm"> <div layout-gt-sm="row" style="justify-content: space-around"> <div ngf-select ngf-drop ngf-change="setFile(\'sourceFile\', $files)" class="drop-box with-margin task-submission" ng-class="{\'dark\': currentThemeObj.isDark}" ngf-drag-over-class="\'dragover\'" ng-disabled="loadingSubmission"> <div class="inline-progress-circular"> <span>Codice Sorgente</span> <md-progress-circular ng-show="loadingSubmission" class="inline-progress-circular" md-mode="indeterminate"></md-progress-circular> </div> <div class="filename" ng-if="problem.sourceFile"> {{problem.sourceFile.name}} - {{problem.sourceFile.size | fileSizeFormatter}} </div> </div> <div ngf-no-file-drop>Drag and Drop non disponibile. Fare click per caricare</div> </div> </form> </div> <md-content layout="row" layout-align="end center" style="background-color: inherit"> <md-button class="md-primary md-raised" ng-disabled="submitForm.$invalid || !problem.sourceFile" ng-click="submit()">Sottometti </md-button> </md-content> </md-tab> </md-tabs> </md-content> </md-card>'), a.put("views/students.html", '<md-card layout-fill class="no-padding" ng-if="!studentId && !loading"> <md-button class="md-primary md-raised" ng-click="$location.path(\'/students/new\')">Aggiungi Studente</md-button> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="student in students" ng-click="openStudent(student.id)"> <md-icon md-font-icon="fa-graduation-cap" class="fa" style="font-size: 38px"></md-icon> <div class="md-list-item-text"> <h3>{{student.name}} {{student.surname}}</h3> <p>{{student.username}}</p> </div> <md-button class="md-secondary md-icon-button md-raised" ng-click="deleteStudent(student.id, $index, $event)" aria-label="call"> <md-icon md-font-icon="fa-trash" class="fa" style="font-size: 25px"></md-icon> </md-button> </md-list-item> </md-list> </md-card> <md-card layout-padding ng-if="studentId && !loading"> <h2 class="cardHeader">{{studentId == \'new\' ? \'Aggiungi\' : \'Modifica\'}} Studente</h2> <md-content style="background-color: white"> <div> <form name="studentForm"> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Nome</label> <input ng-model="user.name" required> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <label>Cognome</label> <input ng-model="user.surname" required> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Username</label> <input ng-model="user.username" ng-disabled="studentId != \'new\'" required> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Password</label> <input ng-model="user.password" type="password"> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <label>Conferma Password</label> <input ng-model="user.password2" type="password"> </md-input-container> </div> </form> </div> </md-content> <md-content layout="row" layout-align="end center" style="background-color: white"> <md-button class="md-primary md-raised" ng-disabled="studentForm.$invalid || user.password != user.password2 || (studentId == \'new\' && user.password.length == 0)" ng-click="save()">Salva </md-button> </md-content> </md-card>'), a.put("views/studentstests.html", '<md-card layout-fill class="no-padding" ng-if="!testId && !loading"> <md-list class="no-padding"> <!-- TODO: Aggiungiamo anche le verifiche passate? --> <md-list-item class="md-2-line" ng-repeat="verifica in tests"> <md-icon md-font-icon="fa-graduation-cap" class="fa" style="font-size: 38px; margin-top: 26px"></md-icon> <div class="md-list-item-text"> <h3>{{verifica.description}}</h3> <p> <md-progress-circular ng-if="verifica.loadingResults" class="loading-description"></md-progress-circular> <span ng-if="!verifica.loadingResults" ng-repeat="result in verifica.results"><span ng-if="!$first">, </span>{{result.short_title}}: {{result.score}}/{{result.test_cases}}</span> <span ng-if="!verifica.loadingResults && verifica.results.length == 0"> - </span> </p> </div> <md-menu class="md-secondary" md-position-mode="target-right target"> <md-button class="md-icon-button" ng-click="loadTasks(verifica.id, $event, $mdOpenMenu)" style="font-size: 1.8em"> <md-icon md-font-icon="fa-file-code-o" class="fa"></md-icon> </md-button> <md-menu-content width="4" style="padding-top: 0; padding-bottom: 5px"> <md-progress-linear md-mode="indeterminate" ng-style="{\'opacity\': tasksForTest[verifica.id] ? \'0\' : \'1\'}"></md-progress-linear> <md-menu-item ng-repeat="task in tasksForTest[verifica.id]" ng-if="tasksForTest[verifica.id]"> <md-button ng-click="openTask(verifica.id, task.id)"> {{task.title}} </md-button> </md-menu-item> </md-menu-content> </md-menu> </md-list-item> </md-list> </md-card>'), a.put("views/submissiondetails.html", '<md-dialog aria-label="Dettagli Sottomissione" md-theme="{{rootScope.theme}}" class="submission-popup"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Dettagli Sottomissione</h2> <span flex></span> <md-button class="md-icon-button" ng-click="close()"> <md-icon md-font-icon="fa-close" style="font-size: 20px" class="fa" aria-label="Close dialog"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <h2 style="margin: 0">Punteggio: {{score | number: 2}}</h2> <md-list> <!-- <md-list-item ng-repeat="line in lines">\n                        <p ng-if="line.caseId == undefined">{{line}}</p>\n                        <p ng-if="line.caseId != undefined">Runtime: {{line.runtime | number:3}}s</p>\n                        <md-checkbox class="md-secondary" ng-model="line.isCorrect" disabled></md-checkbox>\n                    </md-list-item> --> <md-list-item ng-repeat="line in lines"> <p>{{line}}</p> </md-list-item> </md-list> </div> </md-dialog-content> </form> </md-dialog>'), a.put("views/taskresult.html", '<md-dialog aria-label="Dettagli Punteggio" md-theme="{{rootScope.theme}}" class="submission-popup"> <form> <md-toolbar> <div class="md-toolbar-tools"> <h2>Dettagli Punteggio - {{fullName}}</h2> <span flex></span> <md-button class="md-icon-button" ng-click="close()"> <md-icon md-font-icon="fa-close" style="font-size: 20px" class="fa" aria-label="Close dialog"></md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content" style="padding-left: 0; padding-right: 0"> <h2 class="cardHeader" style="margin-left: 24px">Punteggio: {{score | number: 2}}</h2> <md-content style="background-color: white; padding: 0; position: relative; margin-top: 8px" ng-style="{\'min-height\': result.data ? \'0\' : \'150px\'}" class="animated-height"> <md-progress-circular ng-if="!result.data" class="central"></md-progress-circular> <md-list class="no-padding" ng-if="result.data"> <md-list-item class="md-2-line" ng-repeat="task in result.data" ng-click="null"> <md-icon md-font-icon="fa-code" class="fa" style="font-size: 38px"></md-icon> <md-icon ng-if="task.score == task.test_cases" md-font-icon="fa-check-circle-o" class="fa check-over-icon"></md-icon> <!-- Se tutti i test case sono corretti --> <div class="md-list-item-text"> <h3>{{task.short_title}}</h3> <p> Risultato: {{task.score}}/{{task.test_cases}} </p> </div> <md-button class="md-secondary md-icon-button md-raised" ng-click="downloadTaskSources(task, $index, downloading)" aria-label="call"> <md-progress-circular ng-if="downloading[$index]" class="md-primary" md-mode="indeterminate" md-diameter="20px" style="margin: auto"></md-progress-circular> <md-icon md-font-icon="fa-download" ng-if="!downloading[$index]" class="fa" style="font-size: 25px"></md-icon> </md-button> </md-list-item> </md-list> <div ng-if="result.data.length == 0" style="text-align: center; padding: 30px 0">Nessuna sottomissione </div> </md-content> </div> </md-dialog-content> </form> </md-dialog>'), a.put("views/tasks.html", '<md-card layout-fill class="no-padding" ng-if="!taskId && !loading"> <md-button class="md-primary md-raised" ng-if="isTeacherOnly" ng-click="$location.path(\'/tasks/new\')">Nuovo Problema </md-button> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="task in tasks" ng-click="openTask(task.id)"> <md-icon md-font-icon="fa-tasks" class="fa" style="font-size: 38px"></md-icon> <md-icon ng-if="task.is_public == \'1\'" md-font-icon="fa-unlock-alt" class="fa check-over-icon"></md-icon> <div class="md-list-item-text"> <h3>{{task.title}}</h3> <!-- <p>Linea aggiuntiva non utilizzata</p> --> </div> <md-button ng-if="isTeacherOnly" class="md-secondary md-icon-button md-raised" ng-click="deleteTask(task.id, $index, $event)" aria-label="call"> <md-icon md-font-icon="fa-trash" class="fa" style="font-size: 25px"></md-icon> </md-button> </md-list-item> </md-list> </md-card> <md-card layout-padding ng-if="taskId && !loading"> <h2 class="cardHeader">{{taskId == \'new\' ? \'Aggiungi\' : \'Dettagli\'}} Problema</h2> <md-content style="background-color: inherit"> <div> <form name="taskForm"> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Titolo</label> <input ng-model="task.title" required ng-disabled="!isTeacherOnly"> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <label>Sottotitolo</label> <input ng-model="task.short_title" required ng-disabled="!isTeacherOnly"> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <md-checkbox ng-model="task.is_public" ng-true-value="\'1\'" ng-false-value="\'0\'" aria-label="Is Public" style="margin: auto" ng-disabled="!isTeacherOnly"> Problema Pubblico </md-checkbox> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Livello</label> <md-select ng-model="task.level" required ng-disabled="!isTeacherOnly"> <md-option ng-repeat="num in [1, 2, 3, 4, 5, 6, 7, 8]" ng-value="num"> {{num}} </md-option> </md-select> </md-input-container> <md-input-container class="md-block select-plus-button" flex-gt-sm> <label>Categoria</label> <md-progress-circular ng-if="loadingCategories" md-mode="indeterminate"></md-progress-circular> <md-select ng-model="task.category_id" required ng-disabled="!isTeacherOnly"> <md-option ng-repeat="categoria in categorie" ng-value="categoria.id"> {{categoria.description}} </md-option> </md-select> <md-button ng-disabled="!isTeacherOnly" ng-click="newCategory()" class="md-icon-button md-primary" aria-label="Aggiungi Categoria"> <md-icon md-font-icon="fa-plus-square" class="fa"></md-icon> </md-button> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <!-- TODO: mostrare messaggio di errore per valore non valido --> <label>Numero di Test Case</label> <input type="number" step="1" ng-model="task.test_cases" min="1" max="50" required ng-disabled="!isTeacherOnly"> </md-input-container> </div> <div layout-gt-sm="row" style="justify-content: space-between"> <div ngf-select ngf-drop ngf-change="setFile(\'description\', $files)" class="drop-box" ngf-drag-over-class="\'dragover\'" ng-style="mdMedia(\'gt-sm\') ? {} : {\'width\': \'inherit\'}" ng-class="{\'dark\': currentThemeObj.isDark}" ng-disabled="!isTeacherOnly"> Descrizione <div class="filename" ng-if="task.description"> {{task.description.name}} - {{task.description.size | fileSizeFormatter}} </div> </div> <div ngf-no-file-drop>Drag and Drop non disponibile</div> <div ngf-select ngf-drop ngf-change="setFile(\'solution\', $files)" class="drop-box" ngf-drag-over-class="\'dragover\'" ng-style="mdMedia(\'gt-sm\') ? {} : {\'width\': \'inherit\', \'margin-top\': \'15px\', \'margin-left\': 0}" ng-class="{\'dark\': currentThemeObj.isDark}" ng-disabled="!isTeacherOnly"> Soluzione <div class="filename" ng-if="task.solution"> {{task.solution.name}} - {{task.solution.size | fileSizeFormatter}} </div> </div> <div ngf-no-file-drop>Drag and Drop non disponibile</div> <div ngf-select ngf-drop ngf-change="setFile(\'material\', $files)" class="drop-box" ngf-drag-over-class="\'dragover\'" ng-style="mdMedia(\'gt-sm\') ? {} : {\'width\': \'inherit\', \'margin-top\': \'15px\', \'margin-left\': 0}" ng-class="{\'dark\': currentThemeObj.isDark}" ng-disabled="!isTeacherOnly"> Materiale <div class="filename" ng-if="task.material"> {{task.material.name}} - {{task.material.size | fileSizeFormatter}} </div> </div> <div ngf-no-file-drop>Drag and Drop non disponibile</div> </div> </form> </div> </md-content> <md-content ng-if="showingPDF && !loadingPDF" style="background-color: inherit; padding: 0 8px; margin-top: 5px"> <md-button class="md-primary md-raised" aria-label="Nascondi PDF" ng-click="togglePDF()" style="margin-left: 0"> Nascondi PDF </md-button> <embed style="width: 100%; height: 85vh; margin-top: 8px" ng-src="{{taskPDF_URL}}"> </md-content> <!-- Se sto mostrando il PDF nascondo questo pulsante e metto il layout a end per tenere il "salva" a destra --> <md-content layout="row" layout-align="{{showingPDF ?  \'end\' : \'space-between\'}} center" style="background-color: inherit"> <md-button class="md-primary md-raised" aria-label="Mostra PDF" ng-hide="showingPDF" ng-click="togglePDF()" style="margin-left: 0" ng-disabled="taskId == \'new\'"> <md-progress-circular ng-if="loadingPDF" class="md-warn" md-mode="indeterminate" md-diameter="20px" style="margin: auto"></md-progress-circular> <span ng-if="!loadingPDF">Mostra PDF</span> </md-button> <md-button class="md-primary md-raised" style="margin-right: 0" ng-if="isTeacherOnly" ng-disabled="taskId == \'new\' && (taskForm.$invalid || !task.description || !task.solution || !task.material)" ng-click="save()">Salva </md-button> </md-content> </md-card>'), a.put("views/teachers.html", '<md-card layout-fill class="no-padding" ng-if="!teacherId && !loading"> <md-button class="md-primary md-raised" ng-click="$location.path(\'/teachers/new\')">Aggiungi Docente</md-button> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="teacher in teachers" ng-click="openTeacher(teacher.id)"> <md-icon md-font-icon="fa-graduation-cap" class="fa" style="font-size: 38px"></md-icon> <div class="md-list-item-text"> <h3>{{teacher.name}} {{teacher.surname}}</h3> <p>{{teacher.username}}</p> </div> <md-button class="md-secondary md-icon-button md-raised" ng-click="deleteTeacher(teacher.id, $index, $event)" aria-label="call"> <md-icon md-font-icon="fa-trash" class="fa" style="font-size: 25px"></md-icon> </md-button> </md-list-item> </md-list> </md-card> <md-card layout-padding ng-if="teacherId && !loading"> <h2 class="cardHeader">{{teacherId == \'new\' ? \'Aggiungi\' : \'Modifica\'}} Docente</h2> <md-content style="background-color: white"> <div> <form name="teacherForm"> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Nome</label> <input ng-model="user.name" required> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <label>Cognome</label> <input ng-model="user.surname" required> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Username</label> <input ng-model="user.username" required> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Password</label> <input ng-model="user.password" type="password"> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <label>Conferma Password</label> <input ng-model="user.password2" type="password"> </md-input-container> </div> </form> </div> </md-content> <md-content layout="row" layout-align="end center" style="background-color: white"> <md-button class="md-primary md-raised" ng-disabled="teacherForm.$invalid || user.password != user.password2 || (teacherId == \'new\' && user.password.length == 0)" ng-click="save()">Salva </md-button> </md-content> </md-card>'), a.put("views/tests.html", '<md-card layout-fill class="no-padding" ng-if="!testId && !loading"> <md-button class="md-primary md-raised" ng-click="$location.path(\'/tests/new\')">Aggiungi Verifica </md-button> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="verifica in tests" ng-click="openTest(verifica.id)"> <md-icon md-font-icon="fa-graduation-cap" class="fa" style="font-size: 38px"></md-icon> <md-icon ng-if="verifica.is_on == \'1\'" md-font-icon="fa-check-circle" class="fa check-over-icon"></md-icon> <div class="md-list-item-text"> <h3>{{verifica.description}}</h3> <p> <md-progress-circular ng-if="verifica.loadingResults" class="loading-description"></md-progress-circular> <span ng-if="!verifica.loadingResults"> {{verifica.results.length}} alunn{{verifica.results.length == 1 ? \'o\' : \'i\'}} ha{{verifica.results.length != 1 ? \'nno\' : \'\'}} sottomesso una soluzione</span> </p> </div> <md-button class="md-secondary md-icon-button md-raised" ng-click="deleteTest(verifica.id, $index, $event)" aria-label="call"> <md-icon md-font-icon="fa-trash" class="fa" style="font-size: 25px"></md-icon> </md-button> </md-list-item> </md-list> </md-card> <md-card layout-padding ng-if="testId && !loading"> <h2 class="cardHeader">{{testId == \'new\' ? \'Aggiungi\' : \'Modifica\'}} Verifica</h2> <md-content style="background-color: white"> <div> <form name="testForm"> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <label>Descrizione</label> <input ng-model="test.description" required> </md-input-container> <md-input-container class="md-block" flex-gt-sm> <md-checkbox ng-model="test.is_on" ng-disabled="testId == \'new\'" ng-true-value="\'1\'" ng-false-value="\'0\'" aria-label="Is Active" style="margin: auto"> Verifica Attiva </md-checkbox> </md-input-container> </div> <div layout-gt-sm="row"> <md-input-container class="md-block" flex-gt-sm> <md-chips ng-model="ctrl.testTasks" md-autocomplete-snap md-transform-chip="transformChip($chip)" md-require-match="true"> <md-autocomplete ng-disabled="testId == \'new\'" md-selected-item="selectedItem" md-search-text="searchText" md-items="item in querySearch(searchText)" md-item-text="item.title" md-min-length="0" placeholder="Aggiungi dei problemi"> <span md-highlight-text="searchText">{{item.title}}</span> </md-autocomplete> <md-chip-template> <span> <strong>{{$chip.title}}</strong> <!-- <em>({{$chip.category}})</em> TODO: si potrebbe aggiungere la categoria alla chiamata della lista dei tasks--> </span> </md-chip-template> </md-chips> </md-input-container> </div> </form> </div> </md-content> <md-content layout="row" layout-align="end center" style="background-color: white"> <md-button class="md-primary md-raised" style="margin-right: 0" ng-disabled="testForm.$invalid" ng-click="save()">Salva </md-button> </md-content> </md-card> <md-card layout-padding ng-if="testId && !loading && testId != \'new\'" style="padding: 0"> <md-progress-linear md-mode="{{loadingResults ? \'query\' : \'determinate\'}}" value="{{loadingTicks}}" ng-if="test.is_on == \'1\'" style="padding: 0"></md-progress-linear> <div layout="row" layout-align="space-between center"> <h2 class="cardHeader" style="margin-left: 8px">Risultati</h2> <div> <md-button class="md-primary md-raised" style="margin-right: 0" ng-disabled="loadingResults || test.is_on != \'1\'" ng-click="loadResults()">Ricarica </md-button> <md-button class="md-primary md-raised" aria-label="Scarica CSV" ng-click="downloadCSV()"> <md-progress-circular ng-if="loadingCSV" class="md-warn" md-mode="indeterminate" md-diameter="20px" style="margin: auto"></md-progress-circular> <span ng-if="!loadingCSV">Scarica CSV</span> </md-button> </div> </div> <md-content style="background-color: white; padding: 0"> <md-list class="no-padding"> <md-list-item class="md-2-line" ng-repeat="studente in risultati" ng-click="openRisultatiStudente(studente.ID, testId, studente.result, studente.surname + \' \' + studente.name, studente.username, $event)"> <md-icon md-font-icon="fa-file-code-o" class="fa" style="font-size: 38px"></md-icon> <md-icon ng-if="studente.result == 100" md-font-icon="fa-check-circle-o" class="fa check-over-icon"></md-icon> <!-- Il punteggio massimo dovrebbe essere 100 --> <div class="md-list-item-text"> <h3>{{studente.surname}} {{studente.name}} (<span class="monospace">{{studente.username}}</span>) </h3> <p> Punteggio: {{studente.result | number: 2}} </p> </div> </md-list-item> </md-list> <div ng-if="risultati.length == 0" style="text-align: center; padding: 30px 0; margin-bottom: 10px">Nessuno studente ha sottomesso una soluzione </div> <a id="fileDownload" href="#" style="display: none"></a> </md-content> </md-card>');
}]);
