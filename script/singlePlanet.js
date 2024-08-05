
console.log("Planet ID: ", getIdFromQueryString());


function getIdFromQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return parseInt(urlParams.get("id"));
}