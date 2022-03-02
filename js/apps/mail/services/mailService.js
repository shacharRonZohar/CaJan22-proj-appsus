import { storageService } from "../../../services/asyncStorage.js"

export const mailService = {
    get,
    put,
    post,
    query,
    remove,
    postMany,
}

const MAIL_KEY = 'mailDB'

function query() {
    return storageService.query(MAIL_KEY)
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function post(newMail) {
    return storageService.post(MAIL_KEY, newMail)
}

function postMany(newMails) {
    return storageService.postMany(MAIL_KEY, newMails)
}

function put(updatedMail) {
    return storageService.put(MAIL_KEY, updatedMail)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}