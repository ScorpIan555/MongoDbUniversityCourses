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
  {
    "$group": {
      _id: "$name"
    }
  },
  {
    /*
        1) can maybe do a toArray on $airRoutes.airplane, then $size



    */
    "$group": "$airRoutes.airplane",

    "$sum": 1
  }


// got it with this answer
db.air_routes.aggregate([
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "airAlliances"
  }},
  {
    $match: {
      $or: [
        {airplane: "380"},
        {airplane: "747"}
      ]
  }},
  {
    $group: {
        _id: {
          allianceName: "$airAlliances.name",
          planeName: "$airplane"
        },
        numOfPlanes: {$sum:1}
  }}
])
