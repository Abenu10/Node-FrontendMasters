import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const comparePassowords = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  // check to see if there is a bearer token
  if (!bearer) {
    res.status(401);
    res.json({message: 'not authorized'});
    return;
  }

  // check to see if the bearer token is valid
  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.json({message: 'not authorized'});
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({message: 'not authorized'});
    return;
  }
};