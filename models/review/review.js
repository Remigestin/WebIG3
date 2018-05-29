function Review(idreview, commentaire, note, datereview, iduser, idalbum) {
    this.idreview = idreview;
    this.commentaire = commentaire;
    this.note = note;
    this.datereview = datereview;
    this.iduser = iduser;
    this.idalbum = idalbum;
    }

module.exports = Review;
