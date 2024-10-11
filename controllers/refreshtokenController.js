//verify the refresh token sent by the user
const User = require('../model/User');

const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies  = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401).json({ 'message': 'Unauthorized' });
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken: refreshToken}.exec());
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate JWT 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if (err||foundUser.username == decoded.username) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                { "userinfo": {"username": decoded.username, "roles": roles }},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({ accessToken });
        }
    );
    
}

module.exports = { handleRefreshToken };