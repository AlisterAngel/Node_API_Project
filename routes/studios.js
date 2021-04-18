const {
  index, show, create, update, destroy
} = require('../controllers/studios');
const passport = require('passport');

module.exports = router => {
  router.get('/studios', index);
  router.get('/studios/:id', show);
  router.post('/studios', passport.authenticate('jwt', { session: false }), create);
  router.put('/studios', passport.authenticate('jwt', { session: false }), update);
  router.delete('/studios', passport.authenticate('jwt', { session: false }), destroy);
};