const logout = async (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out', redirectTo: '/login' });
}

module.exports = logout;