/**
 * @swagger
 * components:
 *   schema:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: username of the client or trainer
 *         email:
 *           type: string
 *           description: The user or trainer email
 *         password:
 *           type: string
 *           description: The user or trainer password
 *         phone:
 *           type: number
 *           description: The client or trainer phone number
 *         sex:
 *           type: string
 *           description: The client or trainer sex
 *         role:
 *           type: string
 *           description: user or trainer role
 *         age:
 *           type: number
 *           description: The client or trainer age
 *         height:
 *           type: number
 *           description: The client or trainer height
 *         weight:
 *           type: number
 *           description: The client or trainer weight
 *         healthProblem:
 *           type: array
 *           description: The client healthProblem
 *         classes:
 *           type: array
 *           description: class that user join or class that trainer created
 *         createdDate:
 *           type: string
 *           description: date when client or trainer created
 *         createdTime:
 *           type: string
 *           description: time when client or trainer created
 */

/**
 * @swagger
 * components:
 *   schema:
 *     Class:
 *       type: object
 *       required:
 *         - title
 *         - activity
 *         - trainerID
 *       properties:
 *         title:
 *           type: string
 *           description: Title for trainer class
 *         seatTotal:
 *           type: number
 *           description: The total number of available seats in the class.
 *         seatOccupied:
 *           type: number
 *           description: The total number of seats that have been reserved by users.
 *         price:
 *           type: string
 *           description: The cost or price associated with the specified class.
 *         activity:
 *           type: string
 *           description: The classification or type of the class.
 *         venue:
 *           type: string
 *           description: Indicating whether the class is conducted online or in a physical location.
 *         locationOrLink:
 *           type: string
 *           description: The physical place where the class takes place.
 *         duration:
 *           type: string
 *           description: The overall length of time the class takes to complete.
 *         image:
 *           type: string
 *           description: Show the image associated with the class.
 *         trainerID:
 *           type: string
 *           description: The identification number of the trainer who created this class.
 *         trainerName:
 *           type: string
 *           description: The name of the trainer who developed or organized this class.
 *         classDate:
 *           type: string
 *           description: The specific date on which this class took place.
 *         classTime:
 *           type: string
 *           description: The specific time on which this class took place.
 *         clients:
 *           type: array
 *           description: The individuals who are participating in or joining this class.
 */

/**
 * @swagger
 * components:
 *   schema:
 *       Order:
 *           type: object
 *           properties:
 *               price:
 *                   type: string
 *                   description: The cost or price associated with enrolling in the book class.
 *               classID:
 *                   type: string
 *                   description: The unique identification number assigned to this class.
 *               userID:
 *                   type: string
 *                   description: The unique identification number of the user who has joined this class.
 *               status:
 *                   type: boolean
 *                   description: Indicating whether the class has been booked or is still available.
 *               selectedDate_Time:
 *                   type: string
 *                   description: The date being checked for a match with the date of the specified class.
 *               createdDate:
 *                   type: string
 *                   description: The date on which the order was placed.
 *               createdTime:
 *                   type: string
 *                   description: The time on which the order was placed.
 */

/**
 * @swagger
 * components:
 *   schema:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the admin
 *         email:
 *           type: string
 *           description: The email of the admin
 *         password:
 *           type: string
 *           description: The admin password
 */

/**
 * @swagger
 * /user/all:
 *   get:
 *       summary: To retrieve information about all the users who are registered in the database.
 *       tags: [Users]
 *       responses:
 *           200:
 *               description: All user data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Something went wrong to fetch User Data
 */

/**
 * @swagger
 * /user/:id:
 *   get:
 *       summary: To retrieve information about one perticular users who are registered in the database.
 *       tags: [Users]
 *       responses:
 *           200:
 *               description: Single user data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Something went wrong to fetch User Data
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *       summary: To add a user's and trainer's information to the database for registration.
 *       tags: [Users & Trainers]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/User'
 *       responses:
 *           200:
 *               description: User or Trainer registered successfully
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *       summary: Sign in or log in to the application in order to access its features.
 *       tags: [Users & Trainers]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/User'
 *       responses:
 *           200:
 *               description: Client or Trainer logged in successfully
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /user/update/:id:
 *   patch:
 *       summary: Modifying or updating the information related to specific client.
 *       tags: [Users]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/User'
 *       responses:
 *           200:
 *               description: Application Updated Successfully
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /user/delete/:id:
 *   delete:
 *     summary: To delete a specific user from the database.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/User'
 *     responses:
 *       200:
 *         description: Application Updated Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/User'
 *       400:
 *         description: Some server error
 */

/**
 * @swagger
 * /alltrainer:
 *   get:
 *       summary: To Retrieve Information about all the trainers who are registered in the database.
 *       tags: [Trainers]
 *       responses:
 *           200:
 *               description: All trainers data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/User'
 *           400:
 *               description: Something went wrong to fetch trainers Data
 */

// Classes _____________________________________________________________________________________________

/**
 * @swagger
 * /class/:id:
 *   get:
 *       summary: To Retrieve information of the specific class.
 *       tags: [Classes]
 *       responses:
 *           200:
 *               description: Class data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Class'
 *           400:
 *               description: Something went wrong to fetch User Data
 */

/**
 * @swagger
 * /class/all:
 *   get:
 *       summary: To gather details about all classes that have been created by trainers.
 *       tags: [Classes]
 *       responses:
 *           200:
 *               description: Data for all classes has been successfully obtained.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Class'
 *           400:
 *               description: Something went wrong to fetch User Data
 */

/**
 * @swagger
 * /class/create:
 *   post:
 *       summary: To have a trainer create a new class.
 *       tags: [Classes]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Class'
 *       responses:
 *           200:
 *               description: The trainer has successfully created a new class.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Class'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /class/update/:id:
 *   patch:
 *       summary: To Update a Class details in the database
 *       tags: [Classes]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Class'
 *       responses:
 *           200:
 *               description: Class data updated successfully
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Class'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /class/delete/:id:
 *   delete:
 *     summary: To Delete a specific Class from the database.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/Class'
 *     responses:
 *       200:
 *         description: Class data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/Class'
 *       400:
 *         description: Some server error
 */

// Orders _____________________________________________________________________________________________

/**
 * @swagger
 * /order/:id:
 *   get:
 *       summary: To Retrieve information of the specific order.
 *       tags: [Orders]
 *       responses:
 *           200:
 *               description: Order data has been successfully retrieved.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Order'
 *           400:
 *               description: Some Server error
 */

/**
 * @swagger
 * /order/all:
 *   get:
 *       summary: Displaying information about all orders.
 *       tags: [Orders]
 *       responses:
 *           200:
 *               description: Data for all orders has been successfully obtained.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Order'
 *           400:
 *               description: Some Server error
 */

/**
 * @swagger
 * /order/user/:id:
 *   get:
 *       summary: Displaying all orders placed by a single user.
 *       tags: [Orders]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Order'
 *       responses:
 *           200:
 *               description: Displaying all orders of user
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Order'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /order/checkAvailablity:
 *   post:
 *       summary: To check if seats are available for the class.
 *       tags: [Orders]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Order'
 *       responses:
 *           200:
 *               description: Seats for the class are currently available.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Order'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /order/create:
 *   post:
 *       summary: To make a new order for a class.
 *       tags: [Orders]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Order'
 *       responses:
 *           200:
 *               description: The User has successfully created a new order.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Order'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /order/update/:id:
 *   patch:
 *       summary: To Update a Orders details in the database
 *       tags: [Orders]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Order'
 *       responses:
 *           200:
 *               description: Order data updated successfully
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Order'
 *           400:
 *               description: Some server error
 */

// Admin ______________________________________________________________________________________________

/**
 * @swagger
 * /admin/signin:
 *   post:
 *       summary: To log in as an administrator in the database for accessing its features.
 *       tags: [Admin]
 *       requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schema/Admin'
 *       responses:
 *           200:
 *               description: Admin registered successfully
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Admin'
 *           400:
 *               description: Some server error
 */

/**
 * @swagger
 * /admin/all:
 *   get:
 *       summary: Displaying information about all users.
 *       tags: [Admin]
 *       responses:
 *           200:
 *               description: Data for all users has been successfully obtained.
 *               content:
 *                   application/json:
 *                       schema:
 *                           $ref: '#/components/schema/Admin'
 *           400:
 *               description: Some Server error
 */
