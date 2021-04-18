const { index, show, create, update, destroy } = require('../controllers/games');
const passport = require('passport');

module.exports = router => {
  router.get("/games", index);
  router.get("/games/:id", show);
  router.post("/games", passport.authenticate('jwt', { session: false }), create);
  router.put("/games", passport.authenticate('jwt', { session: false }), update);
  router.delete("/games", passport.authenticate('jwt', { session: false }), destroy);

  return router;
};