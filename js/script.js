// Ensure $dc namespace exists
var $dc = $dc || {};

(function (global) {
  var dc = global.$dc;

  var homeHtmlUrl = "snippets/home-snippet.html";
  var categoriesJsonUrl = "data/categories.json";
  var menuItemsJsonUrl = "data/menu_items.json?category={{short_name}}";

  // Convenience AJAX function for JSON responses
  function sendGetJson(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
      if (request.status === 200) {
        callback(JSON.parse(request.responseText));
      } else {
        console.error("Failed to load JSON from", url, request.status);
      }
    };
    request.send();
  }

  var insertHtml = function (selector, html) {
    document.querySelector(selector).innerHTML = html;
  };

  var insertProperty = function (string, propName, propValue) {
    return string.replace(new RegExp("{{" + propName + "}}", "g"), propValue);
  };

  var chooseRandomCategory = function (categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  dc.loadMenuCategories = function () {
    sendGetJson(categoriesJsonUrl, function (categories) {
      sendGetJson(homeHtmlUrl, function (homeHtml) {
        var randomCategory = chooseRandomCategory(categories);
        var shortName = randomCategory.short_name;
        var newHtml = insertProperty(homeHtml, "randomCategoryShortName", "'" + shortName + "'");
        insertHtml("#main-content", newHtml);
      });
    });
  };

  dc.loadMenuItems = function (categoryShort) {
    var menuItemsUrl = insertProperty(menuItemsJsonUrl, "short_name", categoryShort);
    sendGetJson(menuItemsUrl, function (menuItemsData) {
      // Here you'd implement rendering menu items with snippets or inline HTML
      insertHtml("#main-content", "<pre>" + JSON.stringify(menuItemsData, null, 2) + "</pre>");
    });
  };

  // Load home by default
  dc.loadMenuCategories();

})(window);
