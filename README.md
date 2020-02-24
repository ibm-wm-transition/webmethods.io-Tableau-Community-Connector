# webmethods.io-Tableau-Community-Connector
This is a Webmethods.io community connector for [BambooHR](https://en.wikipedia.org/wiki/BambooHR), a cloud-based human resources (HR) software service. The connector uses the [BambooHR REST API](https://documentation.bamboohr.com/reference#get-employee-dependents-1) to make HTTP requests to access or modify a resource. The actions supported by this community connector are:

#### 1. [Add User to Group](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#add_user_to_group)
#### 2. [Create Group](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#create_group)
#### 3. [Create Project](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#create_project)
#### 4. [Delete Project](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#delete_project)
#### 5. [Get Users in Group](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#get_users_in_group)
#### 6. [Query Groups](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#query_groups)
#### 7. [Query Projects](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#query_projects)
#### 8. [Update Project](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm#update_project)

Learn about other supported actions [here](https://help.tableau.com/current/api/rest_api/en-us/REST/rest_api_ref.htm).

#### Note: 
The response contains two pieces of information that you will need to complete the rest of the tasks in this tutorial:

1. The value of the credentials token: This token will allow the other calls to be authenticated as valid by your Tableau Server. To keep things secure, the token has a time limit, typically 2 hours. After that you'll need to sign in again and use the new token from the response for following requests.
2. The value of site id: This is the identifier for the site on your Tableau Server that you define in the contentUrl in your request body. Your users, workbooks and views are all children of your site object, and you need this identifier to make REST calls to them. If contentUrl is empty, then the default site’s id is returned.
3. Every REST call to the server after sign in needs to pass a valid token to succeed. To pass the token you place it in the request header as a key/value pair:




## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
This connector requires any [Node](https://nodejs.org/dist/) version between 8.14.0 and 10.14.2.

Note: If you have installed any other Node version on your system, you can:
1. Use tools to switch between different versions of Node

  - For Windows, use [nvm-windows](https://github.com/coreybutler/nvm-windows#installation--upgrades).
  
  - For Mac, use [homebrew](https://brew.sh/).
2. Build your app using your existing Node version and then transpile your code using a transpiler like [Babel](https://babeljs.io/).

The connector has been built with [wmiocli](https://docs.webmethods.io/integration/developer_guide/connector_builder/#gsc.tab=0), webmethod.io's iPaaS Connector Builder CLI tool, which must be installed. 

### Getting the access credentials
To generate the necessary access credentials, make a REST sign in request using Postman. 
1. Open Postman and select +New > Request.
2. In Request name, type "Sign in".
3. Choose +Create collection and name the new collection “REST Tutorial Collection".
4 Choose the check mark on the right of the form field, then choose Save to REST Tutorial Collection.
5. Change the verb on the upper left to POST, and then replace "Enter request URL " with your URI.
6. Select Body, then select raw.
7. Copy/Paste the body XML from the preceding section into the raw body area, ensuring the placeholders have been replaced with valid values.
8. Choose Send, then scroll down to view the response panel.

Below is a GIF that shows the above steps in action.

![gif](https://help.tableau.com/current/api/rest_api/en-us/Img/postman_auth.gif)

### Installing
1. Clone the repo `https://github.com/yuvanmytri/webmethods.io-Tableau-Community-Connector.git`.
2. Run `npm install -g @webmethodsio/wmiocli`.
3. Login to your webmethods.io tenant using `wmio login`.
4. Execute `wmio init` to get started.
5. Finally, execute `wmio deploy` to deploy this connector to your tenant.

Once deployed, it’ll be automatically registered with webMethods.io Integration and will be available to you locally in the Connectors panel under the Services tab.

## Running the tests
To test, you can execute `wmio test`.

## Deployment
Execute `wmio deploy` to deploy this connector to your webmethods.io tenant. And `wmio unpublish` to unpublish the published connector app along with triggers and actions associated with the app.

![image](https://user-images.githubusercontent.com/20556391/75150886-605ae000-572b-11ea-85df-01c93df60705.png)

## Built With
Node v8.14.0 and [wmiocli](https://docs.webmethods.io/integration/developer_guide/connector_builder/#gsc.tab=0), webmethod.io's iPaaS Connector Builder CLI.

## Contributors
[Anshuman Saikia](https://github.com/anshu96788) |
[Dipankar Dutta](https://github.com/DipankarDDUT) |
[Nawajish Laskar](https://github.com/Nawajish)

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE.md](https://github.com/SoftwareAG/webmethods-microservicesruntime-samples/blob/master/LICENSE) file for details
