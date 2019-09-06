const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./Controllers/DislikeController');

const routes = express.Router();

routes.get(
    "/",
    (req, res) => {

        // pegando query string
        if(req.query.name)
            return res.json({ message: `Hello World: ${req.query.name}` });
        else
            return res.send('sem parametro 2');
    }
);

routes.post('/devs', DevController.store)
routes.post('/devs/:devId/likes',LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store );
    



 routes.get('/devs', DevController.index );

module.exports = routes;