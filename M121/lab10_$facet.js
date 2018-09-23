// db.movies.aggregate([
//   { "$facet": {
//   "Rating": [{"$sortByCount": "$imdb.rating"}],
//   }}
// ]).pretty()
//
//
//
//
//



db.movies.aggregate([
    { "$match": {
      "imdb.rating": {"$gt": 0},
      "metacritic": {$type: "int"}
    }},
    {"$project": {
      _id: 0,
      title: 1,
      "imdb.rating": 1,
      metacritic: 1
    }},
    {"$facet": {
      "byImdbRating": [
        {$sort: {"imdb.rating": -1}},
        {$limit: 10},
        {
          "$bucketAuto": {
            "groupBy": "$imdb.rating",
            "buckets": 1,
            "output": {
              "titles": {"$push": "$title"}
              }
            }
          },
        ],
        "byMetacriticRating": [
          {$sort: {metacritic: -1}},
          {$limit: 10},
          {
            "$bucketAuto": {
              "groupBy": "$metacritic",
              "buckets": 1,
              "output": {
                "titles": {"$push": "$title"}
                }
              }
            }
          ]
      }},
      {"$facet": {
        "byImdbRatingss": [
          {$sort: {"title": -1}},          
          ],
        }},
      {$unwind: "$byImdbRating"},
      {$unwind: "$byMetacriticRating"},
      {$project: {
        "byMetacriticRating.titles": 1,
        "byImdbRating.titles":1,
      }},
      {$addFields: {
        "commonToBoth": {$setIntersection: ["$byMetacriticRating.titles", "$byImdbRating.titles"]}
      }}
]).pretty()



  {$unwind: "$byMetacriticRating.titles" },
  {$unwind: "$byImdbRating.titles" },
  {$project: {
    "byMetacriticRating.titles":1,
    "byImdbRating.titles":1,
    "commonToBoth": {$setIntersection: ["$byMetacriticRating.titles", "$byImdbRating.titles"]}
  }},
