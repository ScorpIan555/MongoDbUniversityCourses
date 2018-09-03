/*
Problem:

In the last lab, we calculated a normalized rating that required us to know what the minimum and maximum values for imdb.votes were. These values were found using the $group stage!

For all films that won at least 1 Oscar, calculate the standard deviation, highest, lowest, and average imdb.rating. Use the sample standard deviation expression.

HINT - All movies in the collection that won an Oscar begin with a string resembling one of the following in their awards field

Won 13 Oscars
Won 1 Oscar
Select the correct answer from the choices below. Numbers are truncated to 4 decimal places.

_id: null,
average: ,
stan_dev: ,
highest: ,
lowest: ,
*/

db.movies.aggregate([
  {$match: {
    awards: /Oscar/
  }},
  {$match: {
    awards: /^Won/
  }},
  {$project: {
    awards: 1,
    title: 1,
    "imdb.rating": 1
  }},
  {$group: {
    _id: null,
    average: {$avg: "$imdb.rating"},
    standardDev: {$stdDevSamp: "$imdb.rating"},
    highest: {$max: "$imdb.rating"},
    lowest: {$min: "$imdb.rating"}
  }}
])


{ "_id" : null, "average" : 7.490729001584786, "standardDev" : 0.6537281174018708, "highest" : 9.6, "lowest" : 4.5 }
