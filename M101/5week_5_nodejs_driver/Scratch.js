// show all indexes in a getCollection
// https://docs.mongodb.com/manual/tutorial/manage-indexes/
db.getCollectionNames().forEach(function(students) {
   indexes = db[students].getIndexes();
   print("Indexes for " + students + ":");
   printjson(indexes);
});
