../bin/neo4j-admin import --database movieGraph
     --nodes=Movie=movies.csv
     --nodes=Name=names.csv
     --nodes=Genre=genre.csv
     --nodes=Tag=tag.csv
     --nodes=Prod_Company=prod_company.csv
     --relationships=ACTOR_IN="actor.csv"
     --relationships=ACTRESS_IN="actress.csv"
     --relationships=DIRECTOR_IN="director.csv"
     --relationships=PRODUCER_IN="producer.csv"
     --relationships=HAS_GENRE="has_genre.csv"
     --relationships=HAS_TAG="has_tag.csv"
     --relationships=PRODUCED_BY="produced_by.csv"


movies.csv(movieid:ID(movieId), title, year, duration, country, language, description, avg_votes, combo_of_categories)
prod_company(comp_id:ID(compId), comp_name)
names.csv(nameid:ID(nameId), name, dob, dod, bio, height)
genre.csv(genre:ID(genreId), genrename)
tag.csv(tagId:ID(tagId), tagname)

# order.csv(movieid, ordering, nameid, category)

actor.csv(:END_ID(movieId), ordering, :START_ID(nameId))
actress.csv(:END_ID(movieId), ordering, :START_ID(nameId))
director.csv(:END_ID(movieId), ordering, :START_ID(nameId))
producer.csv(:END_ID(movieId), ordering, :START_ID(nameId))
...
has_genre(:START_ID(movieId), :END_ID(genreId))
has_tag(:START_ID(movieId), :END_ID(tagId), relevance)
produced_by(:START_ID(compId), :END_ID(movieId))

# ratings.csv(userd, :END_ID(movieId), rating)

