export default function initializeSession(req, res, next) {
    if(!req.session.sentItems) {
        req.session.sentItems = [];
    }
    next();
}