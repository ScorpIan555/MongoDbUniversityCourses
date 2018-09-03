/*
Problem:

Which alliance from air_alliances flies the most routes with either a
Boeing 747 or an Airbus A380 (abbreviated 747 and 380 in air_routes)?
*/


db.air_routes.aggregate([
  { "$match": {
    $or: [
      {airplane: "380"},
      {airplane: "747"}
    ]
  }},
  {
    "$lookup": {
      "from": "air_alliances",
      "localField": "airline.name",
      "foreignField": "airlines",
      "as": "allianceName"
  }},
  {
    "$group": {
      _id: {
        theAlliance: "$allianceName.name",
        planes: "$airplane",
        count: { $sum: 1 }
      }
  }}
])
