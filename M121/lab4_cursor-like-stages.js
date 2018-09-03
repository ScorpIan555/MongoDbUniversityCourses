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
      cast: {
        $ifNull: ["$cast", ["none"]]
      }
  }},
  { "$addFields": {
      num_favs: {
         $size: { $setIntersection: [ "$cast", favorites] }
      }
    }
  },
  {
    "$sort" : { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1}
  },
  {
    "$skip": 25
  },
  {
    "$limit": 1
  }
]);
