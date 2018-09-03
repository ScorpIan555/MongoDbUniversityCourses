// Lecture: Shaping documents with $project
db.solarSystem.aggregate([
  {
    $project: { _id:0, name:1, "gravity.value": 1 }
  }
])

// Lecture: Shaping documents with $project
db.solarSystem.aggregate([
  {
    $project: { _id:0, name:1, surfaceGravity: "$gravity.value" }
  }
])
