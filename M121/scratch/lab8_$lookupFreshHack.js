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
      numOfPlanes: {$size: "$airRoutes.airplane"}
    }
  }},
  { "$match": {
    $or: [
      {"_id.allianceName": "380"},
      {"_id.numOfPlanes": "747"}
    ]
  }}
])




{ "$group": {
  _id: {
    allianceName: "$_id.allianceName",
    planes: "$_id.planes",
    count: {$sum: 1}
  }
}}
