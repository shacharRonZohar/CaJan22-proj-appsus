import { utilService } from '../../../services/utilService.js'
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

_createEmails()
const criteria = {
    status: 'inbox/sent/trash/draft',
    txt: 'puki', // no need to support complex text search 
    isRead: true, // (optional property, if missing: show all) 
    isStared: true, // (optional property, if missing: show all) 
    lables: ['important', 'romantic'] // has any of the labels }
}

function query(criteria) {
    return storageService.query(EMAIL_KEY)
    // .then()
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
    let emails = utilService.load(EMAIL_KEY) || []
    if (!emails || !emails.length) {
        emails.push({
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: false,
            sentAt: 1551133930594,
            to: 'momo@momo.com'
        }),
            emails.push({
                id: 'e102',
                subject: 'Missasdfa you!',
                body: 'Would asdasdlove to catch up sometimes',
                isRead: true,
                sentAt: 1551133953,
                to: 'momo2@momo2.com'
            })
    }
    utilService.save(EMAIL_KEY, emails)
}