/*
Problem:

Let's use our increasing knowledge of the Aggregation Framework to explore our movies collection in
more detail. We'd like to calculate how many movies every cast member has been in and get an average
imdb.rating for each cast member.

What is the name, number of movies, and average rating (truncated to one decimal) for the cast member
that has been in the most number of movies with English as an available language?

db.movies.aggregate([
  {$match: {
    languages: ["English"]
  }},
  {$unwind: "$cast"},
  {$project: {
    cast: 1,
    title: 1,
    "imdb.rating": 1
  }},
  {$group: {
    _id: "$cast",
    "average_rating": { "$avg": "$imdb.rating" }
  }}
])



Provide the input in the following order and format
*/

db.movies.aggregate([
  {$match: {
    languages: "English"
  }},
  {$unwind: "$cast"},
  {$group: {
    _id: {
      actor: "$cast",
      title: "$title"
    },
    imdbAvg: { "$avg": "$imdb.rating" },
    countX: {"$sum": "$imdb.rating"}
  }},
  {$sort: {
    imdbAvg: 1, "id.actor": -1
  }},
  {$group: {
    _id: "$_id.actor",
    numFilms: {"$sum": 1},
    average: { "$avg": "$imdbAvg" }
  }},
  {$sort: {
    numFilms: -1
  }}
])
