const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const Faculty = require("../models/Faculty");
const Student = require("../models/Student");

const keys = require("./key");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const faculty = await Faculty.findById(jwt_payload.id);
        const student = await Student.findById(jwt_payload.id);

        if (faculty) {
          return done(null, faculty);
        } else if (student) {
          return done(null, student);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.error("Passport Error:", err);
        return done(err, false);
      }
    })
  );
};
