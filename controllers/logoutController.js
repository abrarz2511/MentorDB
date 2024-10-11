const User = require('../model/User');
const handleLogout = async (req, res) => {
    //delete access token in the frontend
    const { cookies } = req.cookies;
    if (!cookies?.jwt)return res.status(204); //No content
    
    const refreshToken = cookies.jwt;
    const foundUser = User.findOne({refreshToken: refreshToken}).exec();
    if (!foundUser){
    res.clearCookie('jwt',{httpOnly: true, sameSite: 'None', secure: 'true'});
     return res.sendStatus(204); //No content
    }
    // remove user from DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt',{httpOnly: true, maxAge: 24 *60 *60 *1000});
    return res.sendStatus(204);
}



module.exports = { handleLogout };