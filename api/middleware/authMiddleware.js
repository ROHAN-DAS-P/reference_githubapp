import jwt from 'jsonwebtoken';

export const ensureAuth = (req, res, next) => {
     const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401,"unAuthorized"));
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};