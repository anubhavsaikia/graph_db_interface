const sess= require('../utils/database');

class Login{
    constructor(username, name, password, age, gender){
        this.parameters = {"username":username, 
                            "password":password, 
                            "name":name, 
                            "gender":gender, 
                            "age":age};
    }
    verify_login(){
        // can use await
        return sess.run("match (u:User {username:$username, password:$password}) \
                        return count(u) = 1;", this.parameters);       
    }
    check_uniqueness(){
        // check uniqueness of username
        return sess.run("match (u:User {username:$username}) \
                        return count(u) = 0;", this.parameters);
    }
    add_user(){
        // add user node to db
        return sess.run("create (:User {username:$username, name:$name, password:$password, age:$age, gender:$gender});", this.parameters);
    }
}

class User{
    constructor(username){
        this.parameters = {"username":username};
    }
    fetch_info(){
        return sess.run("match (u:User {username:$username}) return u;", this.parameters);
    }
    get_liked_movies(){
        // return all movies linked by an edge
        return sess.run("match (:User {username:$username})-[:LIKES]->(m:Movie) \
                        return m;", this.parameters);
    }
    get_disliked_movies(){
        return sess.run("match (:User {username:$username})-[:DISLIKES]->(m:Movie) \
                        return m;", this.parameters);
    }
    get_followers(){
        return sess.run("match (u:User)-[:FOLLOWS]->(:User {username:$username}) \
                        return u;", this.parameters);
    }
    get_following(){
        return sess.run("match (:User {username:$username})-[:FOLLOWS]->(u:User) \
                        return u;", this.parameters);
    }
    get_all_users(){
        return sess.run("match (u:User) where u.username <> $username return u;", this.parameters);
    }
    get_rating(movieid){
        this.parameters["movieid"] = movieid;
        return sess.run("match (u:User {username:$username}), (m:Movie {movieid:$movieid}) \
                        return EXISTS( (u)-[:LIKES]-(m) ) as like, EXISTS( (u)-[:DISLIKES]-(m) ) as dislike;", this.parameters);
    }
    remove_rating(movieid){
        this.parameters["movieid"] = movieid;
        return sess.run("match (u:User {username:$username})-[e]->(m:Movie {movieid:$movieid}) \
                        detach delete e;", this.parameters);
    }
    update_rating(movieid, rating){
        this.parameters["movieid"] = movieid;
        if (rating == 1){
            return sess.run("match (u:User {username:$username}), (m:Movie {movieid:$movieid}) \
                            merge (u)-[:LIKES]->(m) \
                            return u;", this.parameters);
        } else{
            return sess.run("match (u:User {username:$username}), (m:Movie {movieid:$movieid}) \
                            merge (u)-[:DISLIKES]->(m) \
                            return u;", this.parameters);
        }
    }
}

class Movie{
    constructor(movieid){
        this.parameters = {"movieid":movieid};
    }
    exists(){
        return sess.run("match (m:Movie {movieid:$movieid}) return count(m) = 1;", this.parameters);
    }
    get_all_movies(){
        return sess.run("match (m:Movie) return m.movieid as movieid, m.title as title, m.year as year;");
    }
    fetch_movie(){
        return sess.run("match (m:Movie {movieid:$movieid}) return m", this.parameters);
    }
}

class Friends{
    constructor(username){
        this.parameters = {"username":username};
    }
    exists(f_username){
        this.parameters["f_username"] = f_username;
        return sess.run("match (u:User {username:$f_username}) return count(u) = 1;", this.parameters);
    }
    fetch_info(f_username){
        this.parameters["f_username"] = f_username;
        return sess.run("match (u:User {username:$f_username}) return u;", this.parameters);
    }
    is_following(f_username){
        this.parameters["f_username"] = f_username;
        return sess.run("match (u1:User {username:$username}), (u2:User {username:$f_username})  \
                        return exists((u1)-[:FOLLOWS]->(u2));", this.parameters);
    }
    follow(f_username){
        this.parameters["f_username"] = f_username;
        return sess.run("match (u:User {username:$username}), (f:User {username:$f_username}) \
                        merge (u)-[:FOLLOWS]->(f) \
                        return u;", this.parameters);
    }
    unfollow(f_username){
        this.parameters["f_username"] = f_username;
        console.log(this.parameters);
        return sess.run("match (u:User {username:$username}), (f:User {username:$f_username}) \
                        merge (u)-[r:FOLLOWS]->(f) \
                        delete r \
                        return u;", this.parameters);
    }
}

class Recommend{
    constructor(username){
        this.parameters = {"username":username};
    }
    get_recommendations(num_movies){
        this.parameters["num_movies"] = num_movies;
        return sess.run("match (m:Movie) \
                        return m limit $num_movies;", this.parameters);
    }
    update_recommendations(movies, ratings){
        // need to add how to delete existing edges of opposite ratings
        query = "match (u:User {username:$username}) ";
        for (let index = 0; index < movies.length; index++) {
            if (ratings[index] == 1) {
                query += "merge (u)-[:LIKES]->(:Movie {movieid:$movie"+ toString(index+2) +"}) ";
            } else{
                query += "merge (u)-[:DISLIKES]->(:Movie {movieid:$movie"+ toString(index+2) +"}) ";
            }
            this.parameters["movie"+toString(index+2)] = movies[index];
        }
        return sess.run(query, this.parameters);
    }
}

module.exports = {
    Login: Login,
    User: User,
    Movie: Movie,
    Friends: Friends,
    Recommend: Recommend,
}

