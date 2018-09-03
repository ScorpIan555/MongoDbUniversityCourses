/*
Problem:

Now that you have been introduced to $graphLookup, let's use it to solve an interesting need.
You are working for a travel agency and would like to find routes for a client!
For this exercise, we'll be using the air_airlines, air_alliances, and
air_routes collections in the aggregations database.

The air_airlines collection will use the following schema:

{
    "_id" : ObjectId("56e9b497732b6122f8790280"),
    "airline" : 4,
    "name" : "2 Sqn No 1 Elementary Flying Training School",
    "alias" : "",
    "iata" : "WYT",
    "icao" : "",
    "active" : "N",
    "country" : "United Kingdom",
    "base" : "HGH"
}
The air_routes collection will use this schema:

{
    "_id" : ObjectId("56e9b39b732b6122f877fa31"),
    "airline" : {
            "id" : 410,
            "name" : "Aerocondor",
            "alias" : "2B",
            "iata" : "ARD"
    },
    "src_airport" : "CEK",
    "dst_airport" : "KZN",
    "codeshare" : "",
    "stops" : 0,
    "airplane" : "CR2"
}
Finally, the air_alliances collection will show the airlines that are in each alliance,
with this schema:

{
    "_id" : ObjectId("581288b9f374076da2e36fe5"),
    "name" : "Star Alliance",
    "airlines" : [
            "Air Canada",
            "Adria Airways",
            "Avianca",
            "Scandinavian Airlines",
            "All Nippon Airways",
            "Brussels Airlines",
            "Shenzhen Airlines",
            "Air China",
            "Air New Zealand",
            "Asiana Airlines",
            "Brussels Airlines",
            "Copa Airlines",
            "Croatia Airlines",
            "EgyptAir",
            "TAP Portugal",
            "United Airlines",
            "Turkish Airlines",
            "Swiss International Air Lines",
            "Lufthansa",
            "EVA Air",
            "South African Airways",
            "Singapore Airlines"
    ]
}
Determine the approach that satisfies the following question in the most efficient manner:

Find the list of all possible distinct destinations, with at most one layover, departing
from the base airports of airlines that make part of the "OneWorld" alliance. The airlines
should be national carriers from Germany, Spain or Canada only. Include both the
destination and which airline services that location. As a small hint, you should find
158 destinations.

Select the correct pipeline from the following set of options:

*/


// Query for air_airlines collection
db.air_airlines.findOne({
  $or: [{country: "Germany"}, {country: "Canada"}, {country: "Spain"}]
}).pretty()

//  615 Results
// Schema
{
	"_id" : ObjectId("56e9b497732b6122f879028b"),
	"airline" : 12,
	"name" : "611897 Alberta Limited",
	"alias" : "",
	"iata" : "THD",
	"icao" : "DONUT",
	"active" : "N",
	"country" : "Canada",
	"base" : "PBL"
}

db.air_airlines.aggregate([
  {$match: {
    $or: [
      { country: "Germany" },
      { country: "Canada" },
      { country: "Spain" }
    ]
  }},
  {$group: {
      _id: {
        airlineCountry: "$country"
      },
      count: {$sum:1}
  }}
])

{ "_id" : { "airlineCountry" : "Germany" }, "count" : 131 }
{ "_id" : { "airlineCountry" : "Spain" }, "count" : 166 }
{ "_id" : { "airlineCountry" : "Canada" }, "count" : 318 }


///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
///////////////////////////////
// Query for air_airlines collection
// 1 Result
db.air_alliances.find({name: "OneWorld"}).pretty()
//
{
	"_id" : ObjectId("5980bef9a39d0ba3c650ae9d"),
	"name" : "OneWorld",
	"airlines" : [
		"Air Berlin",
		"American Airlines",
		"British Airways",
		"Cathay Pacific",
		"Finnair",
		"Iberia Airlines",
		"Japan Airlines",
		"LATAM Chile",
		"LATAM Brasil",
		"Malasya Airlines",
		"Canadian Airlines",
		"Quantas",
		"Qatar Airways",
		"Royal Jordainian",
		"SriLanka Airlines",
		"S7 Airlines"
	]
}


db.air_alliances.aggregate([
  {$group: {
      _id: {
        allianceName: "$name"
      }
    }}
])

{ "_id" : { "allianceName" : "SkyTeam" } }
{ "_id" : { "allianceName" : "Star Alliance" } }
{ "_id" : { "allianceName" : "OneWorld" } }


// Query for air routes collections
// 66945 Results
db.air_routes.findOne(
  {
    stops: { $lte:1 },
    dst_airport: { $type: ["int", "long", "string"] }
  },
  {
    "airline.name": 1,
    _id: 0,
    dst_airport: 1
  },
  { dst_airport: 1,
    "airline.name": 1
  })

{
  "airline" : {
    "name" : "Air Burkina"
  },
  "dst_airport" : "LFW"
}




db.air_airlines.aggregate([
  {$match: {
    $or: [
      { country: "Germany" },
      { country: "Canada" },
      { country: "Spain" }
    ]
  }},
  {$group: {
      _id: {
        airlineCountry: "$country"
      },
      count: {$sum:1}
  }}
])


db.air_alliances.aggregate([
  {$group: {
      _id: {
        allianceName: "$name"
      }
    }}
])






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










db.air_airlines.aggregate([
  {$match: {
    $or: [
      { country: "Germany" },
      { country: "Canada" },
      { country: "Spain" }
    ]
  }},
  {$graphLookup: {
    from: 'air_alliances',
    startWith: "$airlines",
    connectFromField: 'airlines',
    connectToField: 'name',
    as: 'names',
    maxDepth: 25,
    depthField: 'numConnections',
    restrictSearchWithMatch: {}
  }},
])
