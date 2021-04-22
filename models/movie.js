
// const { SESSION_EXPIRED } = require('neo4j-driver/types/error');
// const { movie } = require('../controllers');
const sess= require('../utils/database');

class Login{
    constructor(username, name, password, age, gender){
        this.username = username;
        this.name = name;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.parameters = {"username":username, "password":password, "name":name, "gender":gender, "age":age};
    }
    verify_login(){
        // can use await
        return sess.run("match (u:User {username:$username, password:$password}) \
                        return count(u) = 1;", this.parameters);
        // return sess.run("match (u:User {username:'Utkarsh', password:'asdfghj'}) \
        //                 return count(u) = 1;");
        // Query query = new Query("match (u:User {username:$1, password:$2}) \
        //                     return count(u) = 1;");
        // Result result = session.run(query.withParameters(Values.parameters("myNameParam", "Bob")));
        
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
        this.username = username;
    }
    fetch_info(){
        return sess.run("match (u:User {username:$1}) return u;", [this.username]);
    }
    get_liked_movies(){
        // return all movies linked by an edge
        return sess.run("match (:User {username:$1})-[:LIKES]->(m:Movie) \
                        return m;", [this.username]);
    }
    get_disliked_movies(){
        return sess.run("match (:User {username:$1})-[:DISLIKES]->(m:Movie) \
                        return m;", [this.username]);
    }
    get_followers(){
        return sess.run("match (u:User)-[:FOLLOWS]->(:User {username:$1}) \
                        return u;", [this.username]);
    }
    get_following(){
        return sess.run("match (:User {username:$1})-[:FOLLOWS]->(u:User) \
                        return u;", [this.username]);
    }
    get_all_users(){
        return sess.run("match (u:User) return u;");
    }
    get_rating(movieid){
        return sess.run("match (:User {username:$1})-[e]->(:Movie) \
                        return type(e) = \"LIKES\";", [this.username, movieid]);
    }
    update_rating(movieid, rating){
        if (rating == 1){
            return sess.run("match (u:User {username:$1}), (m:Movie {movieid:$2}) \
                            merge (u)-[:LIKES]->(m) \
                            return u;", [this.username, movieid]);
        } else{
            return sess.run("match (u:User {username:$1}), (m:Movie {movieid:$2}) \
                            merge (u)-[:DISLIKES]->(m) \
                            return u;", [this.username, movieid]);
        }
    }
}

class Movie{
    constructor(movieid){
        this.movieid = movieid;
    }
    get_all_movies(){
        return sess.run("match (m:Movie) return m;");
    }
    fetch_movie(){
        return sess.run("match (m:Movie {movieid:$1}) return m", [this.movieid]);
    }
}

class Friends{
    constructor(username){
        this.username = username;
    }
    fetch_info(f_username){
        return sess.run("match (u:User {username:$1}) return u", [f_username]);
    }
    is_following(f_username){
        return sess.run("match p = (:User {username:$2})-[:FOLLOWS]->(:User {username:$1}) \
                        return exists(p);", [this.username, f_username]);
    }
    follow(f_username){
        return sess.run("match (u:User {username:$1}), (f:User {username:$2}) \
                        merge (u)-[:FOLLOWS]->(f) \
                        return u;", [this.username, f_username]);
    }
    unfollow(f_username){
        return sess.run("match (u:User {username:$1}), (f:User {username:$2}) \
                        merge (u)-[r:FOLLOWS]->(f) \
                        delete r \
                        return u;", [this.username, f_username]);
    }
}

class Recommend{
    constructor(username){
        this.username = username;
    }
    get_recommendations(num_movies){
        return sess.run("match (m:Movie) \
                        return m limit $1;", [num_movies, this.username]);
    }
    update_recommendations(movies, ratings){
        // need to add how to delete existing edges of opposite ratings
        query = "match (u:User {username:$1}) ";
        for (let index = 0; index < movies.length; index++) {
            if (ratings[index] == 1) {
                query += "merge (u)-[:LIKES]->(:Movie {movieid:$"+ toString(index+2) +"}) ";
            } else{
                query += "merge (u)-[:DISLIKES]->(:Movie {movieid:$"+ toString(index+2) +"}) ";
            }
        }
        return sess.run(query, [this.username] + movies);
    }
}

module.exports = {
    Login: Login,
    User: User,
    Movie: Movie,
    Friends: Friends,
    Recommend: Recommend,
}

