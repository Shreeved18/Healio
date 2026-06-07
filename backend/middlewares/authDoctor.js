import jwt from 'jsonwebtoken'

// doctor authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    // frontend sends headers: { dToken }
    const token = req.headers.dtoken || req.headers.dtoken;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized, Login Again' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // jwt payload is created as: jwt.sign({ id: doc._id }, ...)
    req.docId = token_decode.id;

    next();
  } catch (error) {
    console.log('Auth error:', error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;

