/*
Problem:

Determine the approach that satisfies the following question in the most efficient manner:

Find the list of all possible distinct destinations, with at most one layover,
departing from the base airports of airlines that make part of the "OneWorld" alliance.
The airlines should be national carriers from Germany, Spain or Canada only. Include
both the destination and which airline services that location. As a small hint, you should
find 158 destinations.

Select the correct pipeline from the following set of options:

*/

db.air_alliances.aggregate([
  {$unwind: {
    path: "$airlines",
    includeArrayIndex: '<<string>>',
    preserveNullAndEmptyArrays: false
  }},
  {$graphLookup: {
    from: 'air_airlines',
    startWith: "$airlines",
    connectFromField: "base",
    connectToField: 'name',
    as: 'airAirlines',
    maxDepth: 2,
    depthField: '2',
    restrictSearchWithMatch: {}
  }},
  {$match: {
    $or: [
      { "airAirlines.country": "Germany" },
      { "airAirlines.country": "Canada" },
      { "airAirlines.country": "Spain" }
    ],
    name: "OneWorld"
  }},
  {$graphLookup: {
    from: 'air_routes',
    startWith: "$airlines",
    connectFromField: "dst_airport",
    connectToField: "airline.name",
    as: 'airRoutes',
    maxDepth: 2,
    depthField: '2',
    restrictSearchWithMatch: {}
  }},
  {$group: {
    _id: {
    airline: "$airlines",
    base: "$airAirlines.base",
    numOfDestinationAirports: {$size: "$airRoutes.dst_airport"},
    destinationAirports: "$airRoutes.dst_airport",
    }
  }},
  {$group: {
    _id: {
    airline: "$airlines",
    base: "$airAirlines.base",
    numOfDestinationAirports:  "$_id.destinationAirports",
    },
    uniqueDestinationAirports: {$push: "$_id.destinationAirports"},
  }}
])
