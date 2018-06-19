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
4.  Deploy the Application by running these commands (docker swarm init && docker stack deploy -c docker-compose.yml jobTest)

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
#### HTTP Method
POST
#### Data to be provided for both consumers and contractors
The server accepts the values below. 
- first_name - The first name of the contractor
- last_name - The last name of the contractor
- email - The email of the contractor
- password - The password of the contractor
- location - The location of the contractor usually in coordinates (x, y)

#### Behavior of the endpoint
- if first_name, last_name, email and password and location are not provided, or one of the items are missing from the set, 
then, an error is returned with the message:  **{error: "insufficient values provided"}**
- if the email provided is not valid for example name.outlook.com, instead of name@outlook.com, 
the API returns {error: "invalid email provided"}
- if the user is already registered, then the API returns {error: "this email has already been registered"}

2. For consumers to register, the following API endpoint is provided:

#### API
/consumers/signup
#### METHOD
POST
#### Data to be provided
The server accepts the values below
- first_name - The first name of the consumer
- last_name - The last name of the consumer
- email - The email of the consumer
- password - The password of the consumer
- location - The location of the consumer usually in coordinates (x, y)

#### Behavior of the endpoint
- if first_name, last_name, email and password and location are not provided, or one of the items are missing from the set, 
then, an error is returned with the message:  {error: "insufficient values provided"}
- if the email provided is not valid for example name.outlook.com, instead of consumerinitials@outlook.com, 
the API returns {error: "invalid email provided"}
- if the user is already registered, then the API returns {error: "this email has already been registered"}

### Signing In
To sign in, for both contractors and consumers, the session variable "isLoggedIn = true" is created to keep the user session for a period of 25 minutes. Using the following API

#### API
Consumers | Contractors
----------|------------
/consumers/signin | /contractors/signin

