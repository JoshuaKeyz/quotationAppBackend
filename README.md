# Test

## Contents

### Summary of the project
 
It was required to build a REST API in which contractors and consumers can register and sign in. 
The contractors have the possiblity to send quotes to registered consumers who can either
reject or accept them. In addition, the contractors can review the already sent quotes.

### Installation

### Registering. 
1. For contractors to register, the following API endpoint is provided:

#### API
/contractors/signup
#### Method(s)
POST
#### Data to be provided
The server accepts the values below. 
- first_name - The first name of the contractor
- last_name - The last name of the contractor
- email - The email of the contractor
- password - The password of the contractor
- location - The location of the contractor usually in coordinates (x, y)

#### Behavior of the endpoint
- if first_name, last_name, email and password and location are not provided, or one of the items are missing from the set, 
then, an error is returned with the message:  {error: "insufficient values provided"}
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
