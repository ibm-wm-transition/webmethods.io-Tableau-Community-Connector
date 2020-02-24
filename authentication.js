module.exports = {
  label: "Connect to Tableau",
  mock_input: {},
  input: {
    type: "object",
    properties: {
      credentialsToken: {
        title: "Credentials Token",
        type: "string",
        minLength: 1,
        description:
          "Note: You have to generate a new Credentials Token after every 2 hours"
      },
      serverName: {
        title: "Tableau Server Name",
        type: "string",
        minLength: 1,
        description: "Example: prod-apnorth-a.online.tableau.com"
      },
      siteId: {
        title: "Your Site Id",
        type: "string",
        minLength: 1
      }
    }
  },
  validate: function(input, output) {
    // auth data will be available in input.auth
    // like var username = input.auth.username
    // callback pattern
    // output(error, success)
    output(null, true);
  }
};
