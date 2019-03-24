# e-commerce

e-commerce API made with express

## List of article routes:

Route         | HTTP   | Request                         | Response
------------- | ------ | ------------------------------- | --------------------------------------------
products      | GET    |                                 | On success a list of products will be returned with                                                             status code 200, example: [ {product1}, {product2} ]
products      | POST   | header(access_token) body(name:String, price:Number, seller:ObjectId, stock:Number, image:String) | On success a new product document will be created in                                                            the database collection
products/:id  | GET    |                                 | On success will return a document with a specific id
products/:id  | PUT    | header(access_token) body(name:String, price:Number) | On success a document with a specific id will be                                                                updated with new values
products/:id  | DELETE | header(access_token)            | On success a document with a specific id will be                                                                deleted from the database
products/myList | GET   | header(access_token)           | On success all products that matches with the user will be shown, example: user objectid: 12345, returned array [ product1:{ seller: 12345 } ]

## List of user routes:

Route            | HTTP   | Request                     | Response
---------------- | ------ | --------------------------- | ----------------------------------------------------
user/register    | POST   | body(name:String, email:String, password:String) | On success a new user will be created in the                                                                    database, an error will be shown if fail
user/login       | POST   | body(email:String, password:String)       | On success a token will be generated in local                                                                   storage and a list of articles will be appear, an                                                               error will be shown if fail, example token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

## List of cart routes:

Route                     | HTTP   | Request                             | Response
------------------------- | ------ | ----------------------------------- | -------------------------
cart                      | POST   | header(access_token),                                                                                           body([{ productId:ObjectId, quantity:Number }])     | On success a new cart document will be created in the database collection and returned as an object, example: { productId: 15861298371927, quantity: 5 }
cart/:id                  | DELETE | header(access_token)                | On success a cart with a specific id will be deleted from the database
cart/:id/addProduct       | PUT    | header(access_token), body(product:ObjectId) | On success a product will be added to                                                                           the cart's product list
cart/:id/addQuantity      | PUT    | header(access_token), body(product:ObjectId) | On success a specific product's quantity will be added by 1, example: before: { productId: 12571235, quantity: 1 }, after: { productId: 12571235, quantity: 2 }
cart/:id/subtractQuantity | PUT    | header(access_token), body(product:ObjectId) | On success a specific product's quantity will be subtracted by 1, example: before: { productId: 12571235, quantity: 2 }, after: { productId: 12571235, quantity: 1 }
cart/:id/deleteProduct    | DELETE | header(access_token), body(product:ObjectId) | On success a specific product will                                                                              be removed from the cart's product                                                                              list