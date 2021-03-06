const isEmpty = require('./isEmpty');

module.exports = getProfileFields = req => {
    let profileFields = {};
    profileFields.user = req.user.id;
    
    const { handle, company, website, location, biography, status, github } = req.body;
    const payload = { handle, company, website, location, biography, status, github };
    Object.keys(payload).forEach(key => isEmpty(payload[key]) && delete payload[key]);
    

    const { youtube, twitter, facebook, linkedin, instagram } = req.body;
    const social = { youtube, twitter, facebook, linkedin, instagram };
    Object.keys(social).forEach(key => isEmpty(social[key]) && delete social[key]);
    payload.social = social;

    if (typeof req.body.skills !== 'undefined') {
        payload.skills = req.body.skills.split(',').map(skill => skill.trim());
    }

    profileFields = {...profileFields, ...payload};
    
    return profileFields;
};