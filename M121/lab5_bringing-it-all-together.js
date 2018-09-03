/*Calculate an average rating for each movie in our collection where English is an available language,
the minimum imdb.rating is at least 1, the minimum imdb.votes is at least 1, and it was released in 1990
 or after. You'll be required to rescale (or normalize) imdb.votes. The formula to rescale imdb.votes
 and calculate normalized_rating is included as a handout.

What film has the lowest normalized_rating?
*/
x_max = 1521105
x_min = 5
min = 1
max = 10
x = "$imdb.votes"

db.movies.aggregate([
  { "$match": {
      languages: ["English"],
      "imdb.rating": { $gte: 1 },
      "imdb.votes": { $gte: 1 },
      year: { $gte: 1990 }
  }},
  { "$project": {
    _id: 0,
    title: 1,
    "imdb.rating": 1,
    "imdb.votes": 1,
    scaled_votes:  {
      $add: [
        1,
        {
          $multiply: [
            9,
            {
              $divide: [
                { $subtract: [x, x_min] },
                { $subtract: [x_max, x_min] }
              ]
            }
          ]
        }
      ]
    },
    normalized_rating: {
      $avg: [
        "$scaled_votes",
        "$imdb.rating"
      ]
    }
  }},
  { "$sort": {
    "normalized_rating": 1
  }}
])





//
// ,
// { "$match": {
//   { scaled_votes: { $ne: "null" }}
// }}
//
//
// ,
// normalized_rating: {
//   $avg: []
// }
