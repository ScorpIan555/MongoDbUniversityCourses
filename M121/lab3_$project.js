var pipeline = [
  {
    "$project": {
      title: 1,
      "titleArray": { "$split": [ "$title" , " "] }
    }
  },
  {
    "$project": {
      title: 1,
      _id: 0,
      "titleSize": { "$size": "$titleArray" }
    }
  },
  {
    "$match" : {
       "titleSize" : 1
    }
  },
  {
    "$count": "title"
  }
]

db.movies.aggregate([
  {
    "$project": {
      title: 1,
      "titleArray": { "$split": [ "$title" , " "] }
    }
  },
  {
    "$project": {
      title: 1,
      _id: 0,
      "titleSize": { "$size": "$titleArray" }
    }
  },
  {
    "$match" : {
       "titleSize" : 1
    }
  },
  {
    "$count": "title"
  }
]);


// db.movies.aggregate([
//   {
//     "$project": {
//       "titleArray": { "$split": [ "$title" , " "] }
//     }
//   },
//   {
//     "$project": {
//       "titleSize": { "$size": "$titleArray" }
//     }
//   },
//   {
//     "$project": {
//       "titleSizeOfOne": { "$eq" : [ "titleSize", 1 ] }
//     }
//   },
//   {
//     "$match" : {
//        "titleSize" : 1
//     }
//   }
// ]);


// db.movies.aggregate([
//   {
//     "$project": {
//       "titleArray": { "$split": [ "$title" , " "] }
//     }
//   },
//   {
//     "$project": {
//       "titleSize": { "$size": "$titleArray" }
//     }
//   },
//   {
//     "$match": {
//       "$eq" : [ "titleSize": 1 ]
//     }
//   },
//   {
//     "$project": {
//       _id: 0, title: 1
//     }
//   }
// ]);



// {
//   "$match": {
//
//   }
// },

// var pipeline = [
//   {
//     $match: {
//       "imdb.rating": {$gte :7},
//       genres: {$nin:[ "Crime", "Horror"]},
//       $or: [
//         {rated: "PG"}, {rated: "G"}
//       ],
//       languages: {
//         $all: [
//           "English", "Japanese"
//         ]
//       }
//     }
//   },
//   {
//     $project: {
//       title: 1,
//       rated: 1,
//       _id: 0
//     }
//   }
// ]
