
export function enAuth(req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      } else {
        res.redirect('/')
      }
    }

export function enGuest(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/home');
      }
    }
