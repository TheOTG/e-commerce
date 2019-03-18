# e-commerce

e-commerce API made with express

## List of article routes:

Route         | HTTP   | Request                         | Response
------------- | ------ | ------------------------------- | --------------------------------------------
products      | GET    |                                 | On success a list of products will be returned with                                                             status code 200
products      | POST   | body(name:String, price:Number) | On success a new product document will be created in                                                            the database collection
products/:id  | GET    |                                 | On success will return a document with a specific id
products/:id  | PUT    | body(name:String, price:Number) | On success a document with a specific id will be                                                                updated with new values
products/:id  | DELETE |                                 | On success a document with a specific id will be                                                                deleted from the database

## List of user routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
user/register    | POST   | body(name, email, password) | On success a new user will be created in the                                                                    database, an error will be shown if fail
user/login       | POST   | body(email, password)       | On success a token will be generated in local                                                                   storage and a list of articles will be appear, an                                                               error will be shown if fail

## List of cart routes:

Route                    | HTTP   | Request                             | Response
------------------------ | ------ | ----------------------------------- | -------------------------
cart                     | POST   | header(access_token)                | On success a new cart document will be created in the database collection
cart/:id                 | DELETE | header(access_token)                | On success a cart with a specific id will be deleted from the database
cart/:id/addProduct      | PUT    | header(access_token), body(product) | On success a product will be added to                                                                           the cart's product list
cart/:id/subtractProduct | PUT    | header(access_token), body(product) | On success one specific product will                                                                            be removed from the cart's product                                                                              list
cart/:id/deleteProduct   | DELETE | header(access_token), body(product) | On success all specific product will                                                                            be removed from the cart's product                                                                              list