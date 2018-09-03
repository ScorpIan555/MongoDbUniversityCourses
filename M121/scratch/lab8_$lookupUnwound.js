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
      "as": "airRoutes"
  }},
  { "$group": {
    _id: {
      allianceName: "$name",
      planes: "$airRoutes.airplane"
    }
  }},
  { "$match": {
    $or: [
      {"_id.allianceName": "380"},
      {"_id.planes": "747"}
    ]
  }},
])
