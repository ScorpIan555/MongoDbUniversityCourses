

// without count
db.movies.aggregate([
  { "$match": { writers: { $exists: true} } },
  { "$match": { cast: { $exists: true} } },
  { "$match": { directors: { $exists: true} } },
  { "$project": {
    writers: {
        $map: {
          input: "$writers",
          as: "writer",
          in: {
            $arrayElemAt: [
              {
                $split: [ "$$writer", " (" ]
              },
              0
            ]
          }
        }
      },
      cast: 1,
      directors: 1
    }
  },
  { "$project": {
      writers: 1,
      cast: 1,
      directors: 1,
      _id: 0,
      laborOfLove: { $setIntersection: ["$cast", "$writers", "$directors"] },
    }
  },
  { "$match": { laborOfLove: {$ne: [] } } }
]);
//
//
// // with count
// db.movies.aggregate([
//   { "$match": { writers: { $exists: true}} },
//   { "$project": {
//     writers: {
//         $map: {
//           input: "$writers",
//           as: "writer",
//           in: {
//             $arrayElemAt: [
//               {
//                 $split: [ "$$writer", " (" ]
//               },
//               0
//             ]
//           }
//         }
//       }
//     }
//   },
//   { "$match": { writer: { $ne: "null" }} },
//   { $count: "writer"}
// ]);
//
// // add the $count stage to the end of your pipeline
// // you will learn about this stage shortly!
// db.movies.aggregate([
//   {$stage1},
//   {$stage2},
//   ...$stageN,
//   { $count: "labors of love" }
// ])
