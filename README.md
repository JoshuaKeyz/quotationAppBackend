# Test

### Contents
-   [Summary of the Project](#summary-of-the-project)
-   [Installation](#installation)
-   [Testing the REST API](#test-the-rest-api)
-   [Core API](#core-api)
    -   [Registering](#registering)
    -   [Signing In](#signing-in)
    -   [Sending Quotes](#sending-quotes)
    -   [Getting Quotes by both consumers and contractors](#getting-quotes-by-both-consumers-and-contrators)
    -   [Handling Quotes by consumers](#handling-quotes-by-consumers)
    -   [Reviewing of the Quotes by the contractors](#reviewing-of-the-quotes-by-the-contractors)
    
-   [Expiration of quotes in 5 minutes](#expiration-of-quotes-in-5-minutes)

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
### Getting Quotes by both consumers and contractors
The consumer has the means to see all the quotes that has been sent from the consumer to him/her using the following API. They both have the possiblity to see the distance between themselves, expecially the consumer, who needs to see how far the contractor is before accepting a quote.

#### API
Consumers | Contractors
----------|------------
/consumers/getquotes?consumer_id=id | /contractors/getquotes?contractor_id=id

##### Method
**GET**


#### Required Data for this endpoint
The only required data for these endpoints are the consumer_id and contractor_id for each of the respective endpoints, passed into the query string

#### Behaviour of the endpoint and errors `
-   If the user is not loggedIn, the following error is returned
```javascript
    {error: 'not signedIn'}
```

-   If the user is signed in, the following response is retured:
```javascript
    {status: 'success'}
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
-   consumer_id: This must be passed as a query string to the endpoint. The consumer_id is always present as a session variable (req.session.consumer_id) when the consumer is signed in.
-   quote_id: The value of the id of the quotation.
-   action: the action to be performed by the consumer. This can only be two values which are **accept** and **reject**

#### Behaviour of the endpoint and errors (unit tests not complete)
-   If the user is not signed in when he wants to handle a quote for some reasons, the following error is returned
```javascript
    {error: 'not signedIn'}
```
-   When the user rejects a quote by passing "reject" to the action slot of the request, the entire model is returned with the **status** field set to "rejected"

-   When the user accepts a quote by passing "accept" to the action slot of the request, the entire model is returned with the **status** field set to "accepted"

-   If the quote has already been accepted, the below error is thrown.
```javascript
    {error: "quote already accepted"}
```

-   If the quote has already been rejected, the below error is thrown.
```javascript
    {error: "quote already rejected"}
```

-   If the quote_id specified is not in the database record, the following error is retured
```javascript
    {error: "invalid quotation"}
```

-   If the action specified is neither "accept" or "reject", the error below is returned
```javascript
    {error: "invalid action"}
```

-   If no quote_id is specified, then the following error is retured
```javascript
    {error: "invalid quote"}
```

-   If the consumer_id specified in the query string is not registered, the following error is returned
```javascript
    {error: "unregistered user"}
```

-   If the consumer_id is not specified at all, the following error is returned
```javascript
    {error: "invalid request"}
```

### Reviewing of the Quotes by the contractors
The contractor has the means to review the quotes sent to Him/Her, by updating some of the quote items prices, by the following API endpoint.

#### API
Contractors|
-----------|
/contractors/quotes?contractor_id=id |

##### Method
**PUT**

#### Required Data for this endpoint
-   quote_id: The Id of the quote to be reviewed. (This may be gotten from the /contractors/getquotes?contractor_id=id end point described above)
-   labor: The labor price
-   expenses: The expenses price
-   sales_task: The sales task
-   miscellaneous: The miscellanous expenses incurred
-   total: The total cost of everything

#### Behaviour of the endpoint and errors
-   If the contractor is not signed in, the following response is retured
```javascript
    {error: 'not signedin'}
```
-   If the contractor is signed in, the following response is gotten
```javascript
    {status: "success"}
```
-   If the quote_id specified is not recorded, the error is returned below:
```javascript
    {error: "this quote doesn't exist"}
```

-   If the contractor_id specified in the query string is not registered, the following error is returned
```javascript
    {error: 'unregistered contractor'}
```

### Getting a list of quotations made to a consumer
The consumer has the possiblility to see all quotes assigned to him/her as well as the contractor email and the distance between the consumer himself and the contractor, before accepting a quotation, using the following API:


### Expiration of quotes in 5 minutes
    If i were to implement the expiration of quotes in 5 minutes, I would create two web services on my docker stack of services, that accepts REST requests from this current REST API on different ports. One of them would be responsible for checking for expired quotes and the other for deletion of the expired quotes.

    So as every new quotes are made, a before a final response is made, a request will be made to the first web service to start monitoring the time difference, which typically queues the monitored records stored in an array. 

    The REST service could every 30 second, iterate through all quotations with the status field of "pending" (as I built all the quotes to have a "status" field in the database) and if the time of their creation is compared to the current time, and the difference is more than 5 minutes, it will send the quote id to the other web service, which will queue all of these to be deleted as soon as possible. 