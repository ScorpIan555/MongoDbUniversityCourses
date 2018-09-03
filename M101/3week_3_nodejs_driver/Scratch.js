// insertMany()
// querying the Twitter api result sets.

db.statuses.findOne({"retweeted_status.text" : { $regex: /cubs/, $options: "i"} })
// result set in twitterResultSet.json file

// homework3_2.json imported into local mongod
db.students.aggregate([{ $sort :{grade: 1} }, { $skip: 6}, {$limit: 2} ])
// result set
{ "_id" : 14, "student" : "Seamus", "grade" : 33, "assignment" : "exam" }
{ "_id" : 13, "student" : "Bob", "grade" : 37, "assignment" : "exam" }
