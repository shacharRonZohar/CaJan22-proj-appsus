import { utilService } from '../../../services/utilService.js'
import { storageService } from "../../../services/asyncStorage.js"

export const emailService = {
    get,
    put,
    post,
    send,
    query,
    remove,
    postMany,
    toggleRead,
    getNewEmail,
    getNumOfUnread,
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

function send(email) {
    email.sentAt = Date.now()
    email.from = loggedInUser
    email.isRead = true
    email = _setStatus(email)
    post(email)
}
function getNewEmail() {
    return Promise.resolve({
        subject: '',
        body: '',
        sentAt: null,
        to: {},
        from: {}
    })
}

function getNumOfUnread() {
    return query({ status: 'inbox' })
        .then(emails => emails.filter(email => !email.isRead).length)
}
function toggleRead(email) {
    email.isRead = !email.isRead
    return put(email)
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
        // let email1 = getEmptyEmail(), email2 = getEmptyEmail()
        emails.push(..._getDemoEmails(true))
        emails.push(..._getDemoEmails(false))
    }
    utilService.save(EMAIL_KEY, emails)
}

function _getDemoEmails(isRecieved) {
    let emails = []
    for (let i = 0; i < 10; i++) {
        let email = {
            id: utilService.makeExtId(),
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: isRecieved ? false : true,
            sentAt: Math.random() > 0.5 ? Date.now() : 1646229756255,
            to: isRecieved ? loggedInUser : otherUser,
            from: isRecieved ? otherUser : loggedInUser
        }
        console.log(email)
        email = _setStatus(email)
        emails.push(email)
    }
    return emails
}