module.exports = {
  name: "delete_project",

  title: "Delete Project",

  description: "",
  version: "v1",

  input: {
    title: "Delete Project",
    type: "object",
    properties: {
      apiVersion: {
        title: "API Version",
        type: "string",
        minLength: 1,
        description: "Your API version"
      },
      projectId: {
        title: "Project Id",
        type: "string",
        minLength: 1,
        description: "Id of the project you want to update."
      }
    }
  },

  output: {
    title: "output",
    type: "object",
    properties: {}
  },

  mock_input: {},

  execute: function(input, output) {
    const request = require("request");
    const options = {
      method: "DELETE",
      url:
        "https://" +
        input.auth.serverName +
        "/api/" +
        input.apiVersion +
        "/sites/" +
        input.auth.siteId +
        "/projects/" +
        input.projectId,
      headers: {
        "X-Tableau-Auth": input.auth.credentialsToken
      }
    };

    request(options, function(err, res, body) {
      if (err) {
        return output(err);
      }
      if (res.statusCode >= 200 && res.statusCode < 400) {
        return output(null, { result: "Project deleted successfully!" });
      } else {
        return output(null, { result: "Project could not be deleted!" });
      }
    });
  }
};
