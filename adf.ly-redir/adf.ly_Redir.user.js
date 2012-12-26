/*
    Redirect adf.ly to its target location.
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name            adf.ly Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect adf.ly to its target location.
// @version         5.1
// @author          LouCypher
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/adf.ly-redir
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/adf.ly_Redir.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/adf.ly_Redir.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://adf.ly/*
// @include         http://j.gs/*
// @include         http://q.gs/*
// @include         http://9.bb/*
// @include         http://u.bb/*
// @exclude         http://adf.ly/go/*
// ==/UserScript==

(function() {
  if (/blocked/.test(location.pathname)) {
    redir(sessionStorage.getItem("adfly_redirURL"));
    return;
  }
  var scripts = document.querySelectorAll("script:not([src])");
  if (scripts.length) {
    var regx = /\/go\/.*(?=')/;
    for (var i = 0; i < scripts.length; i++) {
      if (regx.test(scripts[i].textContent)) {
        var path = scripts[i].textContent.match(regx);
        path = path.toString();
        sessionStorage.setItem("adfly_redirURL", path);
        redir(path);
        return;
      }
    }
  }
  alert("Sam Ting Wen Wong!");

  function redir(aPath) {
    document.title = "Redirecting\u2026";
    document.body.innerHTML = document.title;
    location.replace("http://adf.ly" + aPath);
  }
})()