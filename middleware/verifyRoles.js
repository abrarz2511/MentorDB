const verifyRoles = (...allowedRoles) =>
     { return (req, res, next) => {
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(value=> value === true) //the map function first creates a new array after applying the following callback function. the find function returns the first true in the new array. Thus, the result variable will have a true if there is even one true in the map funciton.
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles