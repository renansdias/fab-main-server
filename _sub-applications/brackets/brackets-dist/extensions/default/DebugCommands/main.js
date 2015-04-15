define("ErrorNotification",["require","exports","module"],function(e,t,n){function r(){try{brackets.app.showDeveloperTools()}catch(e){console.error(e)}}function a(){return w&&0!==v?h?void h.text(v).parent().show():(h=$("<span>").text(v),void $("<div>").attr("id","error-counter").attr("title",b.CMD_SHOW_DEV_TOOLS+"…").text(b.ERRORS+": ").append(h).on("click",r).insertBefore("#status-bar .spinner")):void(h&&h.parent().hide())}function o(){v++,E(),a()}function i(){v=0,a()}function s(){w||(w=!0,u=window.onerror,c=window.console.error,g=window.console.clear,window.onerror=function(e,t,n){return o(),u?u(e,t,n):!1},window.console.error=function(){return o(),c.apply(window.console,arguments)},window.console.clear=function(){return i(),g.apply(window.console,arguments)})}function l(){w&&(w=!1,window.onerror=u,window.console.error=c,window.console.clear=g)}function d(e){e?s():l(),a()}var u,c,g,f=brackets.getModule("thirdparty/lodash"),p=brackets.getModule("utils/AnimationUtils"),m=brackets.getModule("utils/ExtensionUtils"),b=brackets.getModule("strings"),h=null,v=0,w=!1;m.loadStyleSheet(n,"styles.css");var E=f.debounce(function(){p.animateUsingClass(h.parent()[0],"flash",1500)},100);t.toggle=d}),define("NodeDebugUtils",["require","exports","module"],function(e,t){function n(){brackets.app&&brackets.app.getNodeState?brackets.app.getNodeState(function(e,t){console.log(e?"[NodeDebugUtils] Node is in error state "+e:"[NodeDebugUtils] Node is listening on port "+t)}):console.error("[NodeDebugUtils] No brackets.app.getNodeState function. Maybe you're running the wrong shell?")}function r(){try{s.domains.base.restartNode()}catch(e){alert("Failed trying to restart Node: "+e.message)}}function a(){try{s.domains.base.enableDebugger()}catch(e){alert("Failed trying to enable Node debugger: "+e.message)}}function o(e,t,n,r){var a=new Date(n);l.push({level:t,timestamp:a,message:r});var o="[node-"+t+" "+a.toLocaleTimeString()+"] "+r;switch(t){case"info":case"warn":case"error":console[t](o);break;default:console.log(o)}}var i=brackets.getModule("utils/NodeConnection"),s=null,l=[];s=new i,s.connect(!0),$(s).on("base.log",o),t.logNodeState=n,t.restartNode=r,t.enableDebugger=a}),define("text",["module"],function(e){var t,n,r,a,o,i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,l=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d="undefined"!=typeof location&&location.href,u=d&&location.protocol&&location.protocol.replace(/\:/,""),c=d&&location.hostname,g=d&&(location.port||void 0),f={},p=e.config&&e.config()||{};return t={version:"2.0.10",strip:function(e){if(e){e=e.replace(s,"");var t=e.match(l);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=i[t];try{e=new ActiveXObject(n)}catch(r){}if(e){i=[n];break}}return e},parseName:function(e){var t,n,r,a=!1,o=e.indexOf("."),i=0===e.indexOf("./")||0===e.indexOf("../");return-1!==o&&(!i||o>1)?(t=e.substring(0,o),n=e.substring(o+1,e.length)):t=e,r=n||t,o=r.indexOf("!"),-1!==o&&(a="strip"===r.substring(o+1),r=r.substring(0,o),n?n=r:t=r),{moduleName:t,ext:n,strip:a}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,r,a){var o,i,s,l=t.xdRegExp.exec(e);return l?(o=l[2],i=l[3],i=i.split(":"),s=i[1],i=i[0],!(o&&o!==n||i&&i.toLowerCase()!==r.toLowerCase()||(s||i)&&s!==a)):!0},finishLoad:function(e,n,r,a){r=n?t.strip(r):r,p.isBuild&&(f[e]=r),a(r)},load:function(e,n,r,a){if(a.isBuild&&!a.inlineText)return void r();p.isBuild=a.isBuild;var o=t.parseName(e),i=o.moduleName+(o.ext?"."+o.ext:""),s=n.toUrl(i),l=p.useXhr||t.useXhr;return 0===s.indexOf("empty:")?void r():void(!d||l(s,u,c,g)?t.get(s,function(n){t.finishLoad(e,o.strip,n,r)},function(e){r.error&&r.error(e)}):n([i],function(e){t.finishLoad(o.moduleName+"."+o.ext,o.strip,e,r)}))},write:function(e,n,r){if(f.hasOwnProperty(n)){var a=t.jsEscape(f[n]);r.asModule(e+"!"+n,"define(function () { return '"+a+"';});\n")}},writeFile:function(e,n,r,a,o){var i=t.parseName(n),s=i.ext?"."+i.ext:"",l=i.moduleName+s,d=r.toUrl(i.moduleName+s)+".js";t.load(l,r,function(){var n=function(e){return a(d,e)};n.asModule=function(e,t){return a.asModule(e,d,t)},t.write(e,l,n,o)},o)}},"node"===p.env||!p.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,r){try{var a=n.readFileSync(e,"utf8");0===a.indexOf("﻿")&&(a=a.substring(1)),t(a)}catch(o){r(o)}}):"xhr"===p.env||!p.env&&t.createXhr()?t.get=function(e,n,r,a){var o,i=t.createXhr();if(i.open("GET",e,!0),a)for(o in a)a.hasOwnProperty(o)&&i.setRequestHeader(o.toLowerCase(),a[o]);p.onXhr&&p.onXhr(i,e),i.onreadystatechange=function(){var t,a;4===i.readyState&&(t=i.status,t>399&&600>t?(a=new Error(e+" HTTP status: "+t),a.xhr=i,r(a)):n(i.responseText),p.onXhrComplete&&p.onXhrComplete(i,e))},i.send(null)}:"rhino"===p.env||!p.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,r,a="utf-8",o=new java.io.File(e),i=java.lang.System.getProperty("line.separator"),s=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(o),a)),l="";try{for(n=new java.lang.StringBuffer,r=s.readLine(),r&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),null!==r&&n.append(r);null!==(r=s.readLine());)n.append(i),n.append(r);l=String(n.toString())}finally{s.close()}t(l)}:("xpconnect"===p.env||!p.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(r=Components.classes,a=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),o="@mozilla.org/windows-registry-key;1"in r,t.get=function(e,t){var n,i,s,l={};o&&(e=e.replace(/\//g,"\\")),s=new FileUtils.File(e);try{n=r["@mozilla.org/network/file-input-stream;1"].createInstance(a.nsIFileInputStream),n.init(s,1,0,!1),i=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(a.nsIConverterInputStream),i.init(n,"utf-8",n.available(),a.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),i.readString(n.available(),l),i.close(),n.close(),t(l.value)}catch(d){throw new Error((s&&s.path||"")+": "+d)}}),t}),define("text!htmlContent/perf-dialog.html",[],function(){return'<div class="modal">\n    <div class="modal-header">\n        <h1 class="dialog-title">Performance Data</h1>\n    </div>\n    <div class="modal-body no-padding">\n        <table class="table table-striped">\n            <thead><th>Operation</th><th class="right">Time (ms)</th></thead>\n            <tbody>\n                {{#perfData}}\n                <tr>\n                    <td>{{{testName}}}</td>\n                    <td class="right">{{value}}</td>\n                </tr>\n                {{/perfData}}\n            </tbody>\n        </table>\n    </div>\n    <div class="modal-footer">\n        <div class="left">\n            <label for="brackets-perf-raw-data" class="inline">Raw data (copy paste out):</label>\n            <textarea rows="1" id="brackets-perf-raw-data" style="margin: 0; width: 50px;">{{delimitedPerfData}}</textarea>        \n        </div>\n        <button class="dialog-button btn primary" data-button-id="ok">Close</button>\n    </div>\n</div>\n'}),define("text!htmlContent/language-dialog.html",[],function(){return'<div class="switch-language modal">\n    <div class="modal-header">\n        <h1 class="dialog-title">{{Strings.LANGUAGE_TITLE}}</h1>\n    </div>\n    <div class="modal-body">\n        <p class="dialog-message">\n            {{Strings.LANGUAGE_MESSAGE}}\n            <select>\n                {{#languages}}\n                <option value="{{language}}">{{label}}</option>\n                {{/languages}}\n            </select>\n        </p>\n    </div>\n    <div class="modal-footer">\n        <button class="dialog-button btn primary" data-button-id="ok" disabled>{{Strings.LANGUAGE_SUBMIT}}</button>\n        <button class="dialog-button btn left" data-button-id="cancel">{{Strings.CANCEL}}</button>\n    </div>\n</div>\n'}),define("text!keyboard.json",[],function(){return'{\n    "showDeveloperTools":  [\n        {\n            "key": "F12"\n        },\n        {\n            "key": "Cmd-Opt-I",\n            "platform": "mac"\n        }\n    ],\n    "refreshWindow":  [\n        {\n            "key": "F5"\n        },\n        {\n            "key": "Cmd-R",\n            "platform": "mac"\n        }\n    ],\n    "reloadWithoutUserExts":  [\n        {\n            "key": "Shift-F5"\n        }\n    ]\n}'}),define("main",["require","exports","module","ErrorNotification","NodeDebugUtils","text!htmlContent/perf-dialog.html","text!htmlContent/language-dialog.html","text!keyboard.json"],function(e,t){function n(){brackets.app.showDeveloperTools()}function r(e){var t=e?"?spec="+e:"";if(G)try{G.location.search!==t?G.location.href="../test/SpecRunner.html"+t:G.location.reload(!0)}catch(n){G=null}G||(G=window.open("../test/SpecRunner.html"+t,"brackets-test","width="+$(window).width()+",height="+$(window).height()),G.location.reload(!0))}function a(){p.execute(f.APP_RELOAD)}function o(){p.execute(f.APP_RELOAD_WITHOUT_EXTS)}function i(){window.open(window.location.href)}function s(){var e={delimitedPerfData:v.getDelimitedPerfData(),perfData:[]},t=function(e){if(Array.isArray(e)){var t,n,r,a=0,o=Number.MAX_VALUE,i=0;for(t=0;t<e.length;t++)n=e[t],o=Math.min(o,n),a+=n,i=Math.max(i,n);return r=Math.round(10*a/e.length)/10,String(o)+"/"+String(r)+"("+e.length+")/"+String(i)+"/"+String(n)}return e},n=v.getData();g.forEach(n,function(n,r){e.perfData.push({testName:w.breakableUrl(r),value:t(n)})});var r=Mustache.render(_,e);E.showModalDialogUsingTemplate(r),$("#brackets-perf-raw-data").click(function(){$(this).focus().select()})}function l(){var e=h.getNativeBracketsDirectoryPath()+"/nls";b.getDirectoryForPath(e).getContents(function(e,t){if(!e){var n,r,a,o,i=brackets.isLocaleDefault()?null:brackets.getLocale(),s=[],l=function(){o=a.val(),r.prop("disabled",o===(i||""))};t.forEach(function(e){if(e.isDirectory){var t=e.name.match(/^([a-z]{2})(-[a-z]{2})?$/);if(t){var n=e.name,r=t[1];t[2]&&(r+=t[2].toUpperCase()),s.push({label:S.getLocalizedLabel(r),language:n})}}}),s.push({label:S.getLocalizedLabel("en"),language:"en"}),s.sort(function(e,t){return e.label.localeCompare(t.label)}),s.unshift({label:M.LANGUAGE_SYSTEM_DEFAULT,language:null});var d=Mustache.render(k,{languages:s,Strings:M});E.showModalDialogUsingTemplate(d).done(function(e){e===E.DIALOG_BTN_OK&&o!==i&&(brackets.setLocale(o),p.execute(f.APP_RELOAD))}),n=$(".switch-language.instance"),r=n.find(".dialog-button[data-button-id='"+E.DIALOG_BTN_OK+"']"),a=n.find("select"),a.on("change",l).val(i)}})}function d(){if(!brackets.inBrowser){var e=b.getFileForPath(h.getNativeBracketsDirectoryPath()+"/../test/SpecRunner.html");e.exists(function(e,t){!e&&t&&p.get(L).setEnabled(!0)})}}function u(e){var t;t="undefined"==typeof e?!D.get(X):!!e,N.toggle(t),p.get(X).setChecked(t),D.set(X,t)}function c(){var e=h.getNativeBracketsDirectoryPath().replace(/\/[^\/]+$/,"/");brackets.app.showOSFolder(e)}var g=brackets.getModule("thirdparty/lodash"),f=brackets.getModule("command/Commands"),p=brackets.getModule("command/CommandManager"),m=brackets.getModule("command/Menus"),b=brackets.getModule("filesystem/FileSystem"),h=brackets.getModule("file/FileUtils"),v=brackets.getModule("utils/PerfUtils"),w=brackets.getModule("utils/StringUtils"),E=brackets.getModule("widgets/Dialogs"),M=brackets.getModule("strings"),D=brackets.getModule("preferences/PreferencesManager"),S=brackets.getModule("utils/LocalizationUtils"),N=e("ErrorNotification"),y=e("NodeDebugUtils"),_=e("text!htmlContent/perf-dialog.html"),k=e("text!htmlContent/language-dialog.html"),x=JSON.parse(e("text!keyboard.json")),T="debug-menu",C="debug.refreshWindow",U="debug.showDeveloperTools",L="debug.runUnitTests",A="debug.showPerfData",O="debug.reloadWithoutUserExts",R="debug.newBracketsWindow",I="debug.switchLanguage",P="debug.enableNodeDebugger",F="debug.logNodeState",B="debug.restartNode",X="debug.showErrorsInStatusBar",W="debug.openBracketsSource";D.definePreference(X,"boolean",!1);var G=null;p.register(M.CMD_SHOW_DEV_TOOLS,U,n).setEnabled(!!brackets.app.showDeveloperTools),p.register(M.CMD_REFRESH_WINDOW,C,a),p.register(M.CMD_RELOAD_WITHOUT_USER_EXTS,O,o),p.register(M.CMD_NEW_BRACKETS_WINDOW,R,i),p.register(M.CMD_RUN_UNIT_TESTS,L,r).setEnabled(!1),p.register(M.CMD_SHOW_PERF_DATA,A,s),p.register(M.CMD_OPEN_BRACKETS_SOURCE,W,c).setEnabled(!w.endsWith(decodeURI(window.location.pathname),"/www/index.html")),p.register(M.CMD_SWITCH_LANGUAGE,I,l),p.register(M.CMD_SHOW_ERRORS_IN_STATUS_BAR,X,u),p.register(M.CMD_ENABLE_NODE_DEBUGGER,P,y.enableDebugger),p.register(M.CMD_LOG_NODE_STATE,F,y.logNodeState),p.register(M.CMD_RESTART_NODE,B,y.restartNode),d(),u(D.get(X));var H=m.addMenu(M.DEBUG_MENU,T,m.BEFORE,m.AppMenuBar.HELP_MENU);H.addMenuItem(U,x.showDeveloperTools),H.addMenuItem(C,x.refreshWindow),H.addMenuItem(O,x.reloadWithoutUserExts),H.addMenuItem(R),H.addMenuDivider(),H.addMenuItem(I),H.addMenuDivider(),H.addMenuItem(L),H.addMenuItem(A),H.addMenuItem(W),H.addMenuDivider(),H.addMenuItem(P),H.addMenuItem(F),H.addMenuItem(B),H.addMenuItem(X),H.addMenuItem(f.FILE_OPEN_PREFERENCES),t._runUnitTests=r});