sts = db.companies

//////////////////////////
// Single Facet Query 2:16
sts.findOne({}, {category_code:1})

{
	"_id" : ObjectId("52cdef7c4bab8bd675297d8b"),
	"category_code" : "enterprise"
}

//////////////////////////
// Single Facet Query 3:02
sts.aggregate([
  {$match: {
    $text: { $search: 'network' }
  }},
  { $sortByCount: "$category_code" }
])

{ "_id" : "web", "count" : 788 }
{ "_id" : "software", "count" : 463 }
{ "_id" : "network_hosting", "count" : 306 }
{ "_id" : "games_video", "count" : 276 }
{ "_id" : "mobile", "count" : 264 }
{ "_id" : "advertising", "count" : 205 }
{ "_id" : "enterprise", "count" : 151 }
{ "_id" : "other", "count" : 150 }
{ "_id" : null, "count" : 138 }
{ "_id" : "ecommerce", "count" : 101 }
{ "_id" : "hardware", "count" : 89 }
{ "_id" : "consulting", "count" : 88 }
{ "_id" : "public_relations", "count" : 86 }
{ "_id" : "security", "count" : 55 }
{ "_id" : "semiconductor", "count" : 41 }
{ "_id" : "search", "count" : 34 }
{ "_id" : "social", "count" : 30 }
{ "_id" : "cleantech", "count" : 17 }
{ "_id" : "news", "count" : 14 }
{ "_id" : "analytics", "count" : 13 }

//////////////////////////
// Single Facet Query 4:46
sts.aggregate([
  {$match: {
    $text: { $search: 'network' }
  }},
  {$unwind: "$offices"},
  {$match: {
    "offices.city": { $ne: "" }
  }},
  {$sortByCount: "$offices.city"}
])

{ "_id" : "San Francisco", "count" : 245 }
{ "_id" : "New York", "count" : 218 }
{ "_id" : "London", "count" : 133 }
{ "_id" : "Los Angeles", "count" : 66 }
{ "_id" : "Palo Alto", "count" : 62 }
{ "_id" : "Sunnyvale", "count" : 58 }
{ "_id" : "San Jose", "count" : 53 }
{ "_id" : "Santa Clara", "count" : 49 }
{ "_id" : "Seattle", "count" : 44 }
{ "_id" : "Mountain View", "count" : 41 }
{ "_id" : "Paris", "count" : 41 }
{ "_id" : "Chicago", "count" : 36 }
{ "_id" : "Austin", "count" : 34 }
{ "_id" : "San Diego", "count" : 33 }
{ "_id" : "Boston", "count" : 33 }
{ "_id" : "Toronto", "count" : 32 }
{ "_id" : "Cambridge", "count" : 31 }
{ "_id" : "Santa Monica", "count" : 28 }
{ "_id" : "Atlanta", "count" : 24 }
{ "_id" : null, "count" : 23 }


//////////////////////////
//  The $bucket Stage 1:15
db.movies.aggregate([
  {$bucket: {
    groupBy: "$imdb.rating",
    boundaries: [0, 5, 8, Infinity],
    default: "not rated"
  }}
])

{ "_id" : 0, "count" : 4992 }
{ "_id" : 5, "count" : 35516 }
{ "_id" : 8, "count" : 2284 }
{ "_id" : "not rated", "count" : 1705 }


//////////////////////////
//  The $bucket Stage 2:26
db.movies.aggregate([
  {$bucket: {
    groupBy: "$imdb.rating",
    boundaries: [0, 5, 8, Infinity],
    default: "not rated",
    output: {
      average_per_bucket: {
        $avg: "$imdb.rating"
      }
    },
    output: {
      avg_per_bucket: {
        $avg: {multiply: ["average_per_bucket", 10]}
      }
    }
  }}
])

{ "_id" : 0, "average_per_bucket" : 4.038561698717949 }
{ "_id" : 5, "average_per_bucket" : 6.593591620678004 }
{ "_id" : 8, "average_per_bucket" : 8.246234676007006 }
{ "_id" : "not rated", "average_per_bucket" : null }


//////////////////////////
//  The $bucket Stage 3:13
db.companies.aggregate([
  {$match: {
    founded_year: {$gt: 1980},
    number_of_employees: {$ne: null}
  }},
  {$bucket: {
    groupBy: "$number_of_employees",
    boundaries: [ 0, 20, 50, 100, 500, 1000, Infinity]
  }}
])

{ "_id" : 0, "count" : 5447 }
{ "_id" : 20, "count" : 1172 }
{ "_id" : 50, "count" : 652 }
{ "_id" : 100, "count" : 738 }
{ "_id" : 500, "count" : 98 }
{ "_id" : 1000, "count" : 137 }


//////////////////////////
//  The $bucket Stage 7:18
db.companies.aggregate([
  {$match: {
    founded_year: {$gt: 1980}
  }},
  {$bucket: {
    groupBy: "$number_of_employees",
    boundaries: [ 0, 20, 50, 100, 500, 1000, Infinity],
    default: 'Other',
    output: {
      total: {$sum: 1},
      average: {$avg: "$number_of_employees"},
      categories: {"$addToSet": "$category_code"}
    }
  }}
]).pretty()


{
	"_id" : 0,
	"total" : 5447,
	"average" : 6.002570222140628,
	"categories" : [
		"semiconductor",
		"design",
		"fashion",
		"health",
		"real_estate",
		"cleantech",
		"hospitality",
		"nonprofit",
		"messaging",
		"enterprise",
		"security",
		"legal",
		"news",
		"sports",
		"public_relations",
		"travel",
		"other",
		"education",
		"analytics",
		"medical",
		"finance",
		"biotech",
		"advertising",
		"ecommerce",
		"network_hosting",
		null,
		"photo_video",
		"software",
		"hardware",
		"transportation",
		"search",
		"games_video",
		"web",
		"consulting",
		"social",
		"music",
		"mobile"
	]
}
{
	"_id" : 20,
	"total" : 1172,
	"average" : 29.35580204778157,
	"categories" : [
		"semiconductor",
		"nanotech",
		"cleantech",
		"music",
		"messaging",
		"photo_video",
		null,
		"enterprise",
		"security",
		"legal",
		"news",
		"sports",
		"ecommerce",
		"network_hosting",
		"education",
		"analytics",
		"finance",
		"search",
		"software",
		"hardware",
		"social",
		"automotive",
		"games_video",
		"other",
		"biotech",
		"advertising",
		"real_estate",
		"public_relations",
		"mobile",
		"consulting",
		"web"
	]
}
{
	"_id" : 50,
	"total" : 652,
	"average" : 63.124233128834355,
	"categories" : [
		"cleantech",
		"manufacturing",
		"real_estate",
		"semiconductor",
		"education",
		"analytics",
		"enterprise",
		"security",
		"legal",
		"news",
		"sports",
		"medical",
		"finance",
		"ecommerce",
		"travel",
		"music",
		"mobile",
		"games_video",
		"advertising",
		"biotech",
		null,
		"photo_video",
		"network_hosting",
		"other",
		"health",
		"messaging",
		"hardware",
		"software",
		"public_relations",
		"consulting",
		"web",
		"search",
		"social"
	]
}
{
	"_id" : 100,
	"total" : 738,
	"average" : 185.4512195121951,
	"categories" : [
		"fashion",
		"finance",
		"semiconductor",
		"photo_video",
		null,
		"public_relations",
		"design",
		"hospitality",
		"enterprise",
		"security",
		"ecommerce",
		"education",
		"analytics",
		"other",
		"network_hosting",
		"web",
		"consulting",
		"legal",
		"news",
		"social",
		"software",
		"hardware",
		"transportation",
		"search",
		"cleantech",
		"music",
		"mobile",
		"nonprofit",
		"messaging",
		"games_video",
		"real_estate",
		"health",
		"biotech",
		"advertising"
	]
}
{
	"_id" : 500,
	"total" : 98,
	"average" : 631.1938775510204,
	"categories" : [
		"analytics",
		"other",
		"travel",
		"games_video",
		"consulting",
		"biotech",
		"network_hosting",
		"automotive",
		"advertising",
		"public_relations",
		"real_estate",
		"mobile",
		"cleantech",
		"web",
		"enterprise",
		"software",
		"semiconductor",
		"ecommerce",
		"search",
		"security"
	]
}
{
	"_id" : 1000,
	"total" : 137,
	"average" : 13091.737226277372,
	"categories" : [
		"security",
		"public_relations",
		"other",
		"travel",
		null,
		"games_video",
		"advertising",
		"finance",
		"software",
		"enterprise",
		"hardware",
		"search",
		"semiconductor",
		"ecommerce",
		"biotech",
		"network_hosting",
		"music",
		"mobile",
		"cleantech",
		"web",
		"consulting",
		"social"
	]
}
{
	"_id" : "Other",
	"total" : 4522,
	"average" : null,
	"categories" : [
		"design",
		"hospitality",
		"manufacturing",
		"real_estate",
		"nanotech",
		"cleantech",
		"fashion",
		null,
		"photo_video",
		"news",
		"legal",
		"sports",
		"other",
		"nonprofit",
		"messaging",
		"security",
		"enterprise",
		"hardware",
		"software",
		"public_relations",
		"local",
		"health",
		"biotech",
		"advertising",
		"transportation",
		"search",
		"education",
		"analytics",
		"medical",
		"finance",
		"social",
		"travel",
		"semiconductor",
		"ecommerce",
		"network_hosting",
		"music",
		"mobile",
		"consulting",
		"web",
		"automotive",
		"games_video"
	]
}

db.companies.aggregate([
  {$match: {
    founded_year: {$gt: 1980}
  }},
  {$bucket: {
    groupBy: "$number_of_employees",
    boundaries: [ 0, 20, 50, 100, 500, 1000, Infinity],
    default: 'Other',
    output: {
      total: {$sum: 1},
      average: {$avg: "$number_of_employees"},
      avg: {$divide: [{$trunc: {$avg: {$multiply: ["$number_of_employees", 10]}}}, 10]},
      categories: {"$addToSet": "$category_code"}
    }
  }}
]).pretty()


//////////////////////
// $bucketAuto Stage 1:00
db.movies.aggregate([
  {$bucketAuto: {
    groupBy: "$imdb.rating",
    buckets: 4,
    output: {
      average_per_bucket: {
        $avg: "$imdb.rating"
      },
      count: {$sum: 1}
    }
  }}
])

{ "_id" : { "min" : 1.1, "max" : 5.9 }, "average_per_bucket" : 4.858347573479152, "count" : 11704 }
{ "_id" : { "min" : 5.9, "max" : 6.8 }, "average_per_bucket" : 6.334620558676901, "count" : 12637 }
{ "_id" : { "min" : 6.8, "max" : 7.5 }, "average_per_bucket" : 7.091508360325659, "count" : 11423 }
{ "_id" : { "min" : 7.5, "max" : "" }, "average_per_bucket" : 7.8619664200341495, "count" : 8733 }


//////////////////////
// $bucketAuto Stage 1:45
db.movies.aggregate([
  {$match: {
    "imdb.rating": {$gt: 0}
  }},
  {$bucketAuto: {
    groupBy: "$imdb.rating",
    buckets: 4,
    output: {
      average_per_bucket: {
        $avg: "$imdb.rating"
      },
      count: {$sum: 1}
    }
  }}
])


{ "_id" : { "min" : 1.1, "max" : 5.9 }, "average_per_bucket" : 4.858347573479152, "count" : 11704 }
{ "_id" : { "min" : 5.9, "max" : 6.7 }, "average_per_bucket" : 6.27844426184607, "count" : 10953 }
{ "_id" : { "min" : 6.7, "max" : 7.4 }, "average_per_bucket" : 7.0023422966345334, "count" : 11826 }
{ "_id" : { "min" : 7.4, "max" : 9.6 }, "average_per_bucket" : 7.790744975327958, "count" : 8309 }


//////////////////////////
// Facets: Auto Buckets
