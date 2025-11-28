function allowed_users(allowedRoles = []) {
  return (req, res, next) => {
    try {
      const userType = req.verified?.type;

      if (!userType) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      if (!allowedRoles.includes(userType)) {
        return res.status(403).json({ message: "Access denied: Not allowed" });
      }

      next();
    } catch (err) {
      // console.error("allowed_users middleware error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

module.exports = allowed_users;
