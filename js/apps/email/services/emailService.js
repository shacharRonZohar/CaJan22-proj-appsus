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

const otherUser = {
    email: 'momo@momo.com',
    fullName: 'Mister Momo'
}

_createEmails()


function query(criteria) {
    return storageService.query(EMAIL_KEY)
        .then(emails => emails.filter(email => {
            // console.log(email.status)
            // console.log(criteria.status)
            return email.status === criteria.status
        }))
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

function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
        to: {},
        from: {},
        status: ''
    }
}
function _setStatus(email) {
    let status
    if (email.to.email === loggedInUser.email) status = 'inbox'
    // else if (email.isDeleted) status = 'trash'
    // else if (!email.isComplete) status = 'draft'
    else status = 'sent'
    email.status = status
    return email
}

function _createEmails() {
    // Temporary!
    let emails = utilService.load(EMAIL_KEY) || []
    if (!emails || !emails.length) {
        let email1 = getEmptyEmail(), email2 = getEmptyEmail()
        email1.id = 'e101'
        email1.subject = 'Miss you!'
        email1.body = 'Would love to catch up sometimes'
        email1.isRead = false
        email1.sentAt = 1646229756255
        email1.to = loggedInUser
        email1.from = otherUser
        email1 = _setStatus(email1)
        email2.id = 'e102'
        email2.body = 'Would love to catch up sometimes2'
        email2.isRead = true
        email2.sentAt = 1551133953
        email2.to = otherUser
        email2.from = loggedInUser
        email2 = _setStatus(email2)
        emails = [email1, email2]
    }
    utilService.save(EMAIL_KEY, emails)
}