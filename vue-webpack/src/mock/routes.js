export defaut {

  ['GET /api/users'] (request, next) {
    let body = 'world!';
    next(request.respondWith(body, {status: 200}));
  },

};
