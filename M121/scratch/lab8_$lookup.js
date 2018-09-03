/*
Problem:

Which alliance from air_alliances flies the most routes with either a
Boeing 747 or an Airbus A380 (abbreviated 747 and 380 in air_routes)?
*/


db.air_alliances.aggregate([
  {
    "$unwind": "$airlines"
  },
  {
    "$lookup": {
      "from": "air_routes",
      "localField": "airlines",
      "foreignField": "airline.name",
      "as": "airlineName"
  }},
  { "$match": {
    $or: [
      {"airlineName.airplane": "380"},
      {"airlineName.airplane": "747"}
    ]
  }},
  {
    "$group": {
      _id: {
        theAlliance: "$name",
        planes: "$airlineName.airplane",
      },
      count: {$sum:1}
  }},
  {
    "$match": {
      "_id.planes": "380"
    }
  },
  {
    "$group": {
      _id: {
        allianceName: "$_id.theAlliance",
        plane: "$_id.planes",
        count: {$sum: 1}
      }
    }
  }
])
