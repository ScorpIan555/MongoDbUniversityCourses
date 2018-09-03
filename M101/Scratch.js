// insertMany()
// querying the Twitter api result sets.

db.statuses.findOne({"retweeted_status.text" : { $regex: /cubs/, $options: "i"} })
// result set in twitterResultSet.json file
