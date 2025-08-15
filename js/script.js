$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // STEP 0: Make an AJAX call to request the list of categories
  var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
  var homeHtmlUrl = "snippets/home-snippet.html";

  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowHomeHTML, // callback
    true // isJson
  );
});

/**
 * Builds HTML for the home page based on categories array
 */
function buildAndShowHomeHTML (categories) {
  var homeHtmlUrl = "snippets/home-snippet.html";

  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {

      // STEP 1: Choose a random category
      var randomCategory = chooseRandomCategory(categories);

      // STEP 2: Get its short_name
      var shortName = randomCategory.short_name;

      // STEP 3: Replace {{randomCategoryShortName}} in HTML
      // We wrap shortName in quotes so onclick="$dc.loadMenuItems('XYZ');" works correctly
      homeHtml = insertProperty(homeHtml, "randomCategoryShortName", "'" + shortName + "'");

      // STEP 4: Insert the processed HTML into main-content
      insertHtml("#main-content", homeHtml);
    },
    false // isJson
  );
}

/**
 * Chooses a random category from the categories array
 */
function chooseRandomCategory (categories) {
  var randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex];
}

/**************************************
 * HELPER FUNCTIONS (provided in starter)
 **************************************/

/**
 * Inserts html into the element with selector `selector`
 */
function insertHtml(selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
}

/**
 * Replaces all instances of {{propName}} with propValue
 */
function insertProperty(string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string.replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}