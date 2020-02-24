// Add your function in module.exports

module.exports = {
  name: "get_users_in_group",
  label: "Get Users In Group",
  mock_input: {
    auth: {}
  },
  search: true,
  execute: function(input, options, output) {
    const MAX_RESULTS = 10;

    var pageId = Number(input.page) || 0;

    var lookupResult = {
      results: [],
      next_page: false
    };

    var arr = [];

    var qs = {};
    qs["$top"] = 10;
    const path =
      "https://" +
      input.auth.serverName +
      "/api/3.4/sites/" +
      input.auth.siteId +
      "/groups/" +
      input.groupId +
      "/users";

    if (input.nextPath) path = input.nextPath;

    self
      .makeApiCall(null, input, "GET", path, qs)
      .then(res => {
        const convert = require("xml-js");
        res = convert.xml2json(res, { compact: true, spaces: 4 });

        res = JSON.parse(res);

        if (res && res["@odata.nextLink"]) {
          lookupResult.next_page = true;
          lookupResult.meta = { nextPath: res["@odata.nextLink"] };
        }
        if (
          res &&
          Array.isArray(res.tsResponse.users.user) &&
          res.tsResponse.users.user.length
        ) {
          res.tsResponse.users.user.forEach(user => {
            if (user) {
              arr.push({
                id: String(user._attributes.id),
                value:
                  String(user._attributes.name) || String(user._attributes.id)
              });
            }
          });
          lookupResult.results = arr;
          arr = null;
          return output(null, lookupResult);
        } else {
          return output(null, lookupResult);
        }
      })
      .catch(err => {
        return output(err && err.message ? err.message : err, null);
      });
  },
  makeApiCall: function(options_par, input, method, url, qs) {
    const request = require("request");

    var temp_param = {
      method: method,
      url: url,
      qs: qs,
      headers: {
        Accept: "application/xml",
        "X-Tableau-Auth": input.auth.credentialsToken
      }
    };
    var params = options_par ? options_par : temp_param;

    return new Promise((resolve, reject) => {
      request(params, function(error, response, body) {
        if (error) {
          reject(error);
        }

        if (response.statusCode >= 200 && response.statusCode < 400) {
          resolve(body);
        } else if (response.statusCode == 403) {
          reject(
            "You don't have the necessary permissions to access this resource. Please ensure to select relevant scopes while creating the authorization and try again."
          );
        } else if (response.statusCode == 401) {
          reject(
            "Your authorization has expired. Please create a new authorization to continue. "
          );
        } else if (response.statusCode == 404) {
          reject(
            "Requested resource not found. Please check the input parameters or contact our customer support if the issue persists."
          );
        } else if (response.statusCode == 500) {
          reject(
            "Something went wrong at server. Please try again after some time."
          );
        } else if (response.statusCode == 503) {
          reject("Something went wrong. Please try again after some time.");
        } else if (response.statusCode == 504) {
          reject(
            "The server took too long to respond. Please try again after some time."
          );
        } else if (response.statusCode == 400) {
          reject(
            "Requested resource not found. Please check the input parameters or contact our customer support if the issue persists."
          );
        } else {
          if (body && body.message) {
            reject(body.message);
          } else {
            reject(body);
          }
        }
      });
    });
  }
};
var self = module.exports;
