var favorites = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"
]
db.movies.aggregate([
  { "$match": {
    "tomatoes.viewer.rating": { $gte: 3 },
    "countries": ["USA"]
   } },
  { "$project": {
      title: 1,
      _id: 0,
      cast: 1
    }
  },
  { "$addFields": {
      favs: {
        $setIntersection: [ favorites, "$cast"]
      }
    }
  },
  { "$addFields": {
      favType: { $type: "$favs" }
    }
  },
  { "$match": {
    favs: {$exists: true},
    favType: "array"
  }},
  { "$addFields": {
    num_favs: { $size: "$favs"}
  }},
  { "$match": {
    num_favs: {$gt: 0}
  }},
  {
    "$sort" : { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1}
  },
  {
    "$skip": 24
  },
  {
    "$limit": 1
  }
]);
