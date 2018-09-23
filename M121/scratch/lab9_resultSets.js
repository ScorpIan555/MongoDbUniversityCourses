// db.air_alliances.find({name: "OneWorld"}).pretty()

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

// db.air_routes.findOne({"airline.name": "Iberia Airlines"})

{
	"_id" : ObjectId("56e9b39c732b6122f87877ea"),
	"airline" : {
		"id" : 2822,
		"name" : "Iberia Airlines",
		"alias" : "IB",
		"iata" : "IBE"
	},
	"src_airport" : "ACE",
	"dst_airport" : "BIO",
	"codeshare" : "Y",
	"stops" : 0,
	"airplane" : "320"
}


db.air_airlines.find({$or: [{country: "Spain"}, {country: "Germany"}, {country: "Canada"} ], $or: [{name: "Air Berlin"}, {name: "Iberia Airlines"}, {name: "Canadian Airlines"}]}).pretty()

{
	"_id" : ObjectId("56e9b497732b6122f87908cd"),
	"airline" : 1615,
	"name" : "Canadian Airlines",
	"alias" : "CP",
	"iata" : "CDN",
	"icao" : "CANADIAN",
	"active" : "Y",
	"country" : "Canada",
	"base" : "LVI"
}
{
	"_id" : ObjectId("56e9b497732b6122f8790355"),
	"airline" : 214,
	"name" : "Air Berlin",
	"alias" : "AB",
	"iata" : "BER",
	"icao" : "AIR BERLIN",
	"active" : "Y",
	"country" : "Germany",
	"base" : "KTE"
}
{
	"_id" : ObjectId("56e9b497732b6122f8790d83"),
	"airline" : 2822,
	"name" : "Iberia Airlines",
	"alias" : "IB",
	"iata" : "IBE",
	"icao" : "IBERIA",
	"active" : "Y",
	"country" : "Spain",
	"base" : "BRN"
}
