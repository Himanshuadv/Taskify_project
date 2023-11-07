const admin = require('../config/firebase-config');


class Middleware {
     async decodeToken (req,res,next){
       

        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' }); // Return a 401 Unauthorized status if token is missing
            }

            const decodeValue = await admin.auth().verifyIdToken(token);
            // console.log(decodeValue);
            if(decodeValue){
                req.user = decodeValue;
                return next();
            }else{
                return res.json({message:'unathorized '})
            }
            
        } catch (error) {
            console.log(error)
            return res.json({message:'Internal error'});
        }
     }
}

module.exports = new Middleware();
