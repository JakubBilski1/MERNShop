const logout = async (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out' });
    res.redirect('/login');
}

module.exports = logout;