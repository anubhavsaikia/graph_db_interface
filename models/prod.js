
module.exports = class Prod {

    constructor(title, image, price, quantity) {
        this.title = title;
        this.image = image;
    }

    static get_all(){
        return ["inception","superman","harry potter"];
    };

};