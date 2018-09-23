db.movies.aggregate([
  {$match: {
    metacritic: {$type: "int"},
    "imdb.rating": {$gte: 0}
  }},
  {$sort: {
    metacritic: -1
  }},
  {$project: {
    _id: 0,
    title: 1,
    year: 1,
    plot: 1,
    awards: 1,
    "imdb.rating": 1,
    metacritic: 1
  }},
  {$limit: 10}
]).pretty()

{
	"title" : "The Wizard of Oz",
	"year" : 1939,
	"metacritic" : 100,
	"plot" : "Dorothy Gale is swept away to a magical land in a tornado and embarks on a quest to see the Wizard who can help her return home.",
	"awards" : "Won 2 Oscars. Another 7 wins & 13 nominations.",
	"imdb" : {
		"rating" : 8.1
	}
}
{
	"title" : "The Leopard",
	"year" : 1963,
	"metacritic" : 100,
	"plot" : "The Prince of Salina, a noble aristocrat of impeccable integrity, tries to preserve his family and class amid the tumultuous social upheavals of 1860's Sicily.",
	"awards" : "Nominated for 1 Oscar. Another 10 wins & 5 nominations.",
	"imdb" : {
		"rating" : 8.1
	}
}
{
	"title" : "The Godfather",
	"year" : 1972,
	"metacritic" : 100,
	"plot" : "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
	"awards" : "Won 3 Oscars. Another 30 wins & 19 nominations.",
	"imdb" : {
		"rating" : 9.2
	}
}
{
	"title" : "The Conformist",
	"year" : 1970,
	"metacritic" : 100,
	"plot" : "A weak-willed Italian man becomes a fascist flunky who goes abroad to arrange the assassination of his old teacher, now a political dissident.",
	"awards" : "Nominated for 1 Oscar. Another 15 wins & 2 nominations.",
	"imdb" : {
		"rating" : 8.1
	}
}
{
	"title" : "Sweet Smell of Success",
	"year" : 1957,
	"metacritic" : 100,
	"plot" : "Powerful but unethical Broadway columnist J.J. Hunsecker coerces unscrupulous press agent Sidney Falco into breaking up his sister's romance with a jazz musician.",
	"awards" : "Nominated for 1 BAFTA Film Award. Another 3 wins & 2 nominations.",
	"imdb" : {
		"rating" : 8.2
	}
}
{
	"title" : "Lawrence of Arabia",
	"year" : 1962,
	"metacritic" : 100,
	"plot" : "Follows a brilliant, flamboyant and controversial British military figure and his conflicted loyalties during wartime service.",
	"awards" : "Won 7 Oscars. Another 21 wins & 14 nominations.",
	"imdb" : {
		"rating" : 8.4
	}
}
{
	"title" : "Journey to Italy",
	"year" : 1954,
	"metacritic" : 100,
	"plot" : "Catherine and Alexander, wealthy and sophisticated, drive to Naples to dispose of a deceased uncle's villa. There's a coolness in their relationship and aspects of Naples add to the strain....",
	"awards" : "2 wins.",
	"imdb" : {
		"rating" : 7.5
	}
}
{
	"title" : "Fanny and Alexander",
	"year" : 1982,
	"metacritic" : 100,
	"plot" : "Two young Swedish children experience the many comedies and tragedies of their family, the Ekdahls.",
	"awards" : "Won 4 Oscars. Another 21 wins & 8 nominations.",
	"imdb" : {
		"rating" : 8.1
	}
}
{
	"title" : "Boyhood",
	"year" : 2014,
	"metacritic" : 100,
	"plot" : "The life of Mason, from early childhood to his arrival at college.",
	"awards" : "Won 1 Oscar. Another 184 wins & 161 nominations.",
	"imdb" : {
		"rating" : 8
	}
}
{
	"title" : "Best Kept Secret",
	"year" : 2013,
	"metacritic" : 100,
	"plot" : "JFK High School, located in the midst of a run-down area in Newark, New Jersey, is a public school for all types of students with special education needs, ranging from those on the autism ...",
	"awards" : "3 wins & 1 nomination.",
	"imdb" : {
		"rating" : 7.5
	}
}





db.movies.aggregate([
  {$match: {
    metacritic: {$type: "int"},
    "imdb.rating": {$gte: 0}
  }},
  {$sort: {
    "imdb.rating": -1
  }},
  {$project: {
    _id: 0,
    title: 1,
    year: 1,
    plot: 1,
    awards: 1,
    "imdb.rating": 1,
    metacritic: 1
  }},
  {$limit: 10}
]).pretty()

{
	"title" : "The Shawshank Redemption",
	"year" : 1994,
	"metacritic" : 80,
	"plot" : "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
	"awards" : "Nominated for 7 Oscars. Another 16 wins & 16 nominations.",
	"imdb" : {
		"rating" : 9.3
	}
}
{
	"title" : "The Godfather",
	"year" : 1972,
	"metacritic" : 100,
	"plot" : "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
	"awards" : "Won 3 Oscars. Another 30 wins & 19 nominations.",
	"imdb" : {
		"rating" : 9.2
	}
}
{
	"title" : "The Martian",
	"year" : 2015,
	"metacritic" : 72,
	"plot" : "During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.",
	"imdb" : {
		"rating" : 9.1
	}
}
{
	"title" : "The Godfather: Part II",
	"year" : 1974,
	"metacritic" : 80,
	"plot" : "The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.",
	"awards" : "Won 6 Oscars. Another 13 wins & 16 nominations.",
	"imdb" : {
		"rating" : 9.1
	}
}
{
	"title" : "The Dark Knight",
	"year" : 2008,
	"metacritic" : 82,
	"plot" : "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.",
	"awards" : "Won 2 Oscars. Another 142 wins & 106 nominations.",
	"imdb" : {
		"rating" : 9
	}
}
{
	"title" : "The Century of the Self",
	"year" : 2002,
	"metacritic" : 80,
	"plot" : "A documentary about the rise of psychoanalysis as a powerfull mean of persuasion for both governments and corporations.",
	"imdb" : {
		"rating" : 9
	}
}
{
	"title" : "The Power of Nightmares: The Rise of the Politics of Fear",
	"year" : 2004,
	"metacritic" : 78,
	"plot" : "A series of three documentaries about the use of fear for political gain.",
	"awards" : "4 wins.",
	"imdb" : {
		"rating" : 8.9
	}
}
{
	"title" : "The Lord of the Rings: The Return of the King",
	"year" : 2003,
	"metacritic" : 94,
	"plot" : "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
	"awards" : "Won 11 Oscars. Another 164 wins & 87 nominations.",
	"imdb" : {
		"rating" : 8.9
	}
}
{
	"title" : "Fight Club",
	"year" : 1999,
	"metacritic" : 66,
	"plot" : "An insomniac office worker, looking for a way to change his life, crosses paths with a devil-may-care soap maker, forming an underground fight club that evolves into something much, much more...",
	"awards" : "Nominated for 1 Oscar. Another 10 wins & 22 nominations.",
	"imdb" : {
		"rating" : 8.9
	}
}
{
	"title" : "Pulp Fiction",
	"year" : 1994,
	"metacritic" : 94,
	"plot" : "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
	"awards" : "Won 1 Oscar. Another 63 wins & 47 nominations.",
	"imdb" : {
		"rating" : 8.9
	}
}
