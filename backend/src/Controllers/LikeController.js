const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {

        const {user} = req.headers;
        const {devId} = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev does not exists'});
            }

            loggedDev.likes.push(targetDev._id);
            await loggedDev.save(loggedDev);        

            console.log(`User ${loggedDev.user} liked ${targetDev.user}`)
       
            
        
        if (targetDev.likes.includes(loggedDev._id)) {
            console.log('QUE MASSA DEU MATCH!')
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[devId]

            if (loggedSocket) {
                req.io.to(loggedSocket).emit('match', targetDev)
            }

            if (targetSocket) {
                req.io.to(targetSocket).emit('match', loggedDev)
            }
        }


        return res.json({ loggedDev });
    }
};