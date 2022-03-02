import { storageService } from "../../../services/asyncStorage.js"

export const emailService = {
    get,
    put,
    post,
    query,
    remove,
    postMany,
}

const EMAIL_KEY = 'mailDB'

const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Nestor Appsus'
}

const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search 
    isRead: true, // (optional property, if missing: show all) 
    isStared: true, // (optional property, if missing: show all) 
    lables: ['important', 'romantic'] // has any of the labels }
}

function query(criteria) {
    return storageService.query(EMAIL_KEY)
        .then()
}

function get(mailId) {
    return storageService.get(EMAIL_KEY, mailId)
}

function post(newMail) {
    return storageService.post(EMAIL_KEY, newMail)
}

function postMany(newMails) {
    return storageService.postMany(EMAIL_KEY, newMails)
}

function put(updatedMail) {
    return storageService.put(EMAIL_KEY, updatedMail)
}

function remove(mailId) {
    return storageService.remove(EMAIL_KEY, mailId)
}

function _createEmails() {
    let
}