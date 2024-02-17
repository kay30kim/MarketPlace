function createUserSession(req, user, action) {
	req.session.uid = user._id.toString();
	req.session.isAdmin =  user.isAdmin;
	req.session.save(action);
}

function destoryUserAuthsession(req,) {
	req.session.uid = null;
	// req.session.save();
}

module.exports = {
	createUserSession: createUserSession,
	destoryUserAuthsession: destoryUserAuthsession
};