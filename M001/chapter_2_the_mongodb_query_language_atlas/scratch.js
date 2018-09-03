// Updating Documents: updateOne()
// let reviewText1 = [
//   "The Martian shoulda been shit!  But it wasn't!"
// ].join()
// db.movieDetails.updateOne({
//   title: "The Martian"
// }, {
//   $push: {
//       reviews: {
//           rating: 4.5,
//           date: ISODate( "2016-01-29T09:00:00Z"),
//           reviewer: "Spencer H",
//           text: reviewText1
//         }
//       }
//   })


// Updating Documents: replaceOne()
// detailDoc = db.movieDetails.findOne( { "imdb.id": "tt4368814" } )
//
// detailDoc.poster
// detailDoc.poster = "https://www.imdb.com/title/tt4368814/mediaviewer/rm2926634240"
//
// detailDoc.genres
// detailDoc.genres.push("Documentary")
//
// db.movieDetails.replaceOne({
//  "imdb.id":  detailDoc.imdb.id
//  },
//    detailDoc
// )


// Deleting Documents: deleteOne()
// https://docs.mongodb.com/manual/reference/method/db.getSiblingDB/
// mongo "mongodb+srv://sandbox-xychu.mongodb.net/test" --username adminUser loadReviewsDataset
// uploads data from that script into the db, creates collection "reviews"
db.reviews.deleteOne({
  _id: ObjectId("595b0937411bedf6bed99b3b")
})

db.reviews.deleteMany({
  reviewer_id: 759723314
})
