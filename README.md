# Test

## Contents

### Summary of the project
 
It was required to build a REST API in which contractors and consumers can register and sign in. 
The contractors have the possiblity to send quotes to registered consumers who can either
reject or accept them. In addition, the contractors can review the already sent quotes.

### Installation

### Registering. 
For contractors to register, the following API endpoint is provided:

#### API
/contractors/signup
#### Method(s)
POST
#### Data to be provided
The server accepts the values below. 
___
- first_name - The first name of the contractor
- last_name - The last name of the contractor
- email - The email of the contractor
- password - The password of the contractor
- location - The location of the contractor usually in coordinates (x, y)

#### Behavior of the endpoint

