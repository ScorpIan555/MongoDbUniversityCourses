var pipeline = [
  { $match: {
      "imdb.rating": {$gte :7},
      genres: {$nin:[ "Crime", "Horror"]},
      $or: [
        {rated: "PG"}, {rated: "G"}
      ],
      languages: {
        $all: [
          "English", "Japanese"
        ]
      }
    }
  }
]


db.movies.aggregate([
  {$match: {
    "imdb.rating": {$gte:7},
    genres: {$ne:[ "Crime", "Horror"]},
    $or: [
      {rated: "PG", rated: "G"  }
    ],
    $and: [
      { languages: "English", languages: "Japanese" }
    ]

    }
  }
])



//From compass, this query returns 39 results, the $and is wrong
{ "imdb.rating": {$gte:7}, genres: {$ne: ["Crime", "Horror"]}, $or: [{rated: "G", rated: "PG"}], $and: [{languages: "English", languages: "Japanese"}]  }
// Trying $all
{ "imdb.rating": {$gte:7}, genres: {$ne: ["Crime", "Horror"]}, $or: [{rated: "G", rated: "PG"}], $all: [{languages: "English", languages: "Japanese"}]  }
{ "imdb.rating": {$gte:7}, genres: {$ne: ["Crime", "Horror"]}, $or: [{rated: "G", rated: "PG"}], languages: {$all: [ "English", "Japanese"]}   }

//
// db.movies.aggregate([
//   {$match: {
//     "imdb.rating": {$gt:7},
//     genres: {$ne:[ "Crime", "Horror"]},
//     $or: [
//       {rated: ["PG", "G"] }
//     ],
//     $and: [
//        { languages: ["English", "Japonese"] }
//       ]
//     }
//   }
// ])
