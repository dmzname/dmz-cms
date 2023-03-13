exports.isAdmin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.role !== "Admin") {
      return res
        .status(403)
        .json({ error: "Access denied, you are not an admin." });
    }

    next();
  } catch (err) {
    return res.status(403).json({
      message: "No access",
    });
  }
};
