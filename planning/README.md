# CSE 316: Final Project Planning

This is the planning document.

## Database objects

Here are the database objects.

### Employee

This is object represents the employee.

- **employeeID** - primary key
  - Can be represented as the auto-assigned ObjectId in MongoDB
- **email** - unique key
- **firstName**
- **lastName**
- **password**

### EmployeeTest

This is object represents an employee covid test.

- **testBarcode** - primary key
- **employeeID** - foreign key to `Employee:employeeID`; not null
  - Can be represented as an ObjectId in MongoDB
  - Set `required: true` in the model schema for EmployeeTest
  - https://www.navicat.com/en/company/aboutus/blog/1003-relationships-in-mongodb
- **collectionTime**
  - https://docs.mongodb.com/manual/reference/method/Date/
- **collectedBy** - foreign key to `Employee:employeeID`

### Pool Map

This object represents the pool map, which maps the employee test to the pool barcode.

- **testBarcode** - foreign key to `EmployeeTest:testBarcode`
- **poolBarcode** - foreign key to `Pool:poolBarcode`

### Pool

This object represents the pool.

- **poolBarcode** - primary key
  - Can be represented as the auto-assigned ObjectId in MongoDB

### WellTesting

This object represents a well covid test.

- **poolBarcode** - foreign key to `Pool:poolBarcode`
- **wellBarcode** - foreign key to `Well:wellBarcode`
- **testingStartTime**
- **testingEndTime**
- **result** - enum of `["in progress", "negative", "positive"]`
  - May need to define a custom validator
  - https://docs.mongodb.com/manual/core/schema-validation/

### Well

This object represents a well.

- **wellBarcode** - primary key

## Additional Notes

Here are some additional notes for the final project.

- We are allowed to use any database for this final project.
  - https://piazza.com/class/ke1ckdikw1kuz?cid=185
- Example dataset:
  - https://docs.google.com/spreadsheets/d/17A0-Qcu6JmT0qmpJoFPt9JvWocpp2_huelIIpb9EcMg/edit#gid=0
- `items` dataset is for testing purposes

### Some things that might need to be changed later on.

- WellTesting model schema has `testingEndTime` set to default value of `Data.now`
- The proxy in client package.json is `http://localhost:5000`
-

## TODOS

Here are all the things to do.

- [x] Crying in front of HonorLock proctor.
- [x] Look into either Context API or Redux to manage the state. Decided to go with Redux for this project.
- [x] Create an example dataset.
- [x] Go to sleep 11/18/2020.
- [x] Set up application routes for the backend.
- [x] Set up an example server with redux details and no db.
- [x] Start setting up client side routes.
- [x] Setup instructions
- [x] Go to sleep 11/19/2020.
- [x] Connect to backend.
- [x] Working backend example.
- [x] Prepare repo for meeting.
- [x] Go to sleep 11/20/2020.
- [ ] What are the needed client side pages.
- [ ] Learn about login and authentication.
- [ ] Complete.
