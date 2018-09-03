var pipeline = [
  {
    $match: {
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
  },
  {
    $project: {
      title: 1,
      rated: 1,
      _id: 0
    }
  }
]

//
// db.movies.aggregate([
//   {
//     $match: {
//       "imdb.rating": { $gte:7 },
//       genres: {
//         $nin: [
//          "Crime", "Horror"
//        ]
//      },
//       $or: [
//         {
//           rated: "PG", rated: "G"
//         }
//       ],
//       languages: {
//         $all: [
//           "English", "Japanese"
//         ]
//       }
//     },
//     $project: {
//
//     }
//   }
// ])
