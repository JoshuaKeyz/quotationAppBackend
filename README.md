# Test

### Contents
-   [Summary of the Project](#summary-of-the-project)
-   [Installation](#installation)
-   [Testing the REST API](#test-the-rest-api)
-   [Core API](#core-api)

## Summary of the project
 
It was required to build a REST API in which contractors and consumers can register and sign in. 
The contractors have the possiblity to send quotes to registered consumers who can either
reject or accept them. In addition, the contractors can review the already sent quotes.

## Installation
To Install this program:
1.  Clone this repository (git  clone   git@github.com:JoshuaKeyz/updatedVersion.git     jobtest)
2.  Enter the directory of the application (cd jobtest)
3.  Run the command to initialize Docker (docker-compose build)
4.  Deploy the Application by running this command docker-compose up)

## Test the REST API
To run the test of the features of the application (after installation), open a terminal and enter the following command:
    npm run test

## Core API
### Registering. 
1. For contractors and consumers to register, the following API endpoint is provided:
#### API
Consumers | Contractors
----------|------------
/consumers/register | /contractors/register
##### HTTP Method
**POST**
#### Data to be provided for both consumers and contractors
The server accepts the values below. 
- first_name - The first name of the contractor
- last_name - The last name of the contractor
- email - The email of the contractor
- password - The password of the contractor
- location - The location of the contractor usually in coordinates (x, y) (which may represent latitude and longitude) :) 

#### Behavior of the endpoint and errors
- if first_name, last_name, email and password and location are not provided, or one of the items are missing from the set, 
then, an error is returned with the message:  **{error: "insufficient values provided"}**
- if the email provided is not valid for example name.outlook.com, instead of name@outlook.com, 
the API returns **{error: "invalid email provided"}**
- if the user is already registered, then the API returns **{error: "this email has already been registered"}**


### Signing In
To sign in, for both contractors and consumers, the session variable "isLoggedIn = true" is created to keep the user session for a period of 25 minutes (1500000ms). Using the following API

#### API
Consumers | Contractors
----------|------------
/consumers/signin | /contractors/signin

##### HTTP Method
**POST**

#### Data to be provided for both consumers and contractors
The server accepts the values below for signing in
- email - The email of the contractor
- password - The password of the contractor

#### Behavior of the endpoint and errors
-   If the email provided is not valid for example name.outlook.com, instead of name@outlook.com, 
the API returns:
```javascript 
    {error: "invalid email provided"}
```
-   If the email and password combination provided is not registered, the following error response will be returned:
```javascript
    {error: "incorrect username/password"}
``` 
-   If the email and password combination matches, the session variable isLoggedIn is set to true for 25 minutes and the following response is returned:
```javascript
    {status: "success"}
```

### Sending Quotes
The functionality of sending quotes is only reserved for the contractors by the usage of the following API.

#### API
Contractors|
-----------|
/contractors/sendquotes |

##### Method
**POST**

#### Data to be provided by contractors
The server accepts the values below for sending a quote
- contractor_id: The ID of the Contractor (which can be gotten from the session variable req.session.contractor_id)
- consumer_id: The ID of the Consumer (which can be gotten from a list of consumers)
- labor: The price for the cost of labor
- expenses: The price for the expences incurred. 
- sales_task: The cost of the task on sales
- miscellaneous: The miscellaneous expences incurred
- total: The total cost of the quotation

#### Behaviour of the endpoint and errors
-   If the contractor is not logged in and he wants to send a quote the following error is returned
```javascript
    {error: 'not signedIn'}
```

-   If the user is logged in, the contractor can send quotes and when the quotes are sent the following response is returned, where the model object is the full object containing all the entries made by the contractor like, contractor_id, consumer_id, labor, expences, sales_task and so on.
```javascript
    {status: "success", model: {}}
```
-   The API automatically appends "pending" to the status field of every new quotes

-   If the contractor sends the quote without some of the [data to be provided](#data-to-be-provided-by-contractors), the following error is specified
```javascript
    {error: "invalid quotation"}
```

### Handling Quotes by consumers
The consumer has the means to reject of accept a quote that is still pending by the following API.

#### API
Consumers|
---------|
/consumers/handlequotes?consumer_id=id |

##### Method
**PUT**

#### Required Data for this endpoint

