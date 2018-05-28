function User(iduser, login, password, email, isadmin, dateinscription) {
    this.iduser = iduser;
    this.login = login;
    this.password = password;
    this.email = email;
    this.isadmin = isadmin;
    this.dateinscription = dateinscription;
}

module.exports = User;
