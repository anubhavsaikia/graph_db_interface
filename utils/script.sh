../../../../../../neo4j-home/bin/neo4j-admin import --database movieGraph\
     --nodes=Movie=movies.csv\
     --nodes=Name=names.csv\
     --nodes=Genre=genre.csv\
     --nodes=Tag=tag.csv\
     --nodes=Decade=decades.csv\
     --nodes=Prod_Company=production_company.csv\
     --relationships=ACTOR_IN="movie_persons_header.csv,actor.csv"\
     --relationships=ACTRESS_IN="movie_persons_header.csv,actress.csv"\
     --relationships=DIRECTOR_IN="movie_persons_header.csv,director.csv"\
     --relationships=PRODUCER_IN="movie_persons_header.csv,producer.csv"\
     --relationships=WRITER_IN="movie_persons_header.csv,writer.csv"\
     --relationships=EDITOR_IN="movie_persons_header.csv,editor.csv"\
     --relationships=ARCHIVE_FOOTAGE_IN="movie_persons_header.csv,archive_footage.csv"\
     --relationships=ARCHIVE_SOUND_IN="movie_persons_header.csv,archive_sound.csv"\
     --relationships=CINEMATOGRAPHER_IN="movie_persons_header.csv,cinematographer.csv"\
     --relationships=COMPOSER_IN="movie_persons_header.csv,composer.csv"\
     --relationships=PRODUCTION_DESIGNER_IN="movie_persons_header.csv,production_designer.csv"\
     --relationships=HAS_GENRE="has_genre.csv"\
     --relationships=IN_DECADE="movie_decade.csv"\
     --relationships=HAS_TAG="has_tag.csv"\
     --relationships=PRODUCES="produced_by.csv"

# # All Nodes

# movies.csv(:IGNORE, movieid:ID(movieId), title, year, duration, country, language, description, avg_votes, combo_of_categories)
# prod_company(:IGNORE, comp_name:ID(comp))
# names.csv(:IGNORE, nameid:ID(nameId), name, dob, dod, bio, height)
# genre.csv(:IGNORE, genre:ID(genre))
# tag.csv(:IGNORE, tagId:ID(tagId), tagname)
# decades.csv(:IGNORE,decade:ID(decade))

# # order.csv(movieid, ordering, nameid, category)

# # Category Relationships
# :IGNORE, :END_ID(movieId), ordering, :START_ID(nameId)
# actor.csv
# actress.csv
# director.csv
# producer.csv
# ...

# # Other Relationships

# has_genre(:IGNORE, :START_ID(movieId), :END_ID(genre))
# has_tag(:IGNORE, :START_ID(movieId), :END_ID(tagId), relevance)
# produces(:IGNORE, :END_ID(movieId),:START_ID(comp))
# in_decade(:IGNORE, :START_ID(movieId), :END_ID(decade))

# # ratings.csv(userd, :END_ID(movieId), rating)

