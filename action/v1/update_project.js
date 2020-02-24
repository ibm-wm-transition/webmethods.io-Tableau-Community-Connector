module.exports = {
  name: "update_project",

  title: "Update Project",

  description: "",
  version: "v1",

  input: {
    title: "Update Project",
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
      },
      newParentProjectId: {
        title: "New Parent Project Id",
        type: "string",
        description:
          'To update a project without changing its placement in the project hierarchy, omit the parentProjectId attribute. To move a project to the top of the project hierarchy, provide an empty string ("") for the parentProjectId attribute.'
      },
      newName: {
        title: "New Project Name",
        type: "string",
        minLength: 1,
        description: "The new name to assign to the project."
      },
      newDescription: {
        title: "New Project Description",
        type: "string",
        description: "(Optional) A new description for the project."
      },
      newContentPermissions: {
        title: "New Content Permissions",
        type: "string",
        enum: ["LockedToProject", "ManagedByOwner"],
        description:
          "	(Optional) Specify LockedToProject to lock permissions so that users cannot overwrite the default permissions set for the project, or specify ManagedByOwner to allow users to manage permissions for content that they own."
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
    const builder = require("xmlbuilder");

    const xmlBody = builder
      .create("tsRequest", { headless: true })
      .ele("project", {
        parentProjectId: input.newParentProjectId,
        name: input.newName,
        description: input.newDescription,
        contentPermissions: input.newContentPermissions
      })
      .end({ pretty: true });

    const options = {
      method: "PUT",
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
        "X-Tableau-Auth": input.auth.credentialsToken,
        "Content-Type": "application/xml"
      },
      body: xmlBody
    };

    request(options, function(err, res, body) {
      const convert = require("xml-js");
      if (err) {
        return output(err);
      }
      body = convert.xml2json(body, { compact: true, spaces: 4 });

      if (typeof body == "string") {
        try {
          body = JSON.parse(body);
        } catch (err) {
          return output(body);
        }
      }
      if (res && res.statusCode >= 200 && res.statusCode < 400) {
        return output(null, body);
      } else if (res.statusCode == 403) {
        return output(
          "You don't have the necessary permissions to access this resource. Please ensure to select relevant scopes while creating the authorization and try again."
        );
      } else if (res.statusCode == 401) {
        return output(
          "Your authorization has expired. Please create a new authorization to continue. "
        );
      } else if (res.statusCode == 404) {
        return output(
          "Requested resource not found. Please check the input parameters or contact our customer support if the issue persists."
        );
      } else if (res.statusCode == 500) {
        return output(
          "Something went wrong at server. Please try again after some time."
        );
      } else if (res.statusCode == 503) {
        return output(
          "Something went wrong. Please try again after some time."
        );
      } else if (res.statusCode == 504) {
        return output(
          "The server took too long to respond. Please try again after some time."
        );
      } else if (res.statusCode == 400) {
        return output(body);
      } else {
        if (body && body.err && body.err.message) {
          return output(body.err.message);
        } else {
          return output(body);
        }
      }
    });
  }
};
