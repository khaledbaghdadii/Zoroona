

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport =require("passport")

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'thesecretkey'
},
function (jwtPayload, cb) {

   if(!jwtPayload) return "Error has occured"
   else return jwtPayload
}
));

module.exports = passport;