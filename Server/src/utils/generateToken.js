const generateToken = (res, statusCode, user, isUser) => {
  try {
    let token = user.generateJwtToken(); // Generating token for user
    let text = "userToken";
    return res.status(statusCode).json({
      _id: user._id,
      name: user.name,
      phoneNumber: user?.phoneNumber,
      email: user.email,
      userToken: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default generateToken;
