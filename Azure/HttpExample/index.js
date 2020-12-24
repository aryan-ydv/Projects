const{Get,Post}=require("./app"); 
module.exports = async function (context, req) {
    var responseMessage="";

    if (req.method == "POST") {
        responseMessage="POST"
    } else if (req.method == "GET") {
        responseMessage="Hello World!"
    } 
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}




