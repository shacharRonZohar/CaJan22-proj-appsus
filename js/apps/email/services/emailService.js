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
    toggleStar,
    toggleRead,
    getNewEmail,
    handleRemove: handleRemove,
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
        .then(emails => {
            // Filter
            return emails.filter(email => {
                if (criteria.status === 'trash') return email.removedAt
                if (criteria.status === 'starred') return email.isStar
                let isMatch = (criteria.status === email.status) &&
                    email.body.toLowerCase().includes(criteria.txt.toLowerCase()) &&
                    !email.removedAt
                if (criteria.isRead && isMatch && criteria.isRead !== 'all') {
                    isMatch = (email.isRead === criteria.isRead)
                }
                return isMatch
            })
        })
        .then(emails => {
            // Sort
            if (!criteria.sort) return emails
            const sortType = criteria.sortBy === 'title' ? '' : 1
            return emails.autoSortObj(criteria.sort.by, sortType, criteria.sort.isAsc)
        })
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

function handleRemove(emailId) {
    return get(emailId)
        .then(email => {
            if (email.removedAt) return remove(email.id)
            email.removedAt = Date.now()
            email.isStar = false
            put(email)
        })
}
function send(email) {
    email.sentAt = Date.now()
    email.from = loggedInUser
    if (email.status === 'draft') {
        email.status = 'sent'
        return put(email)
    }
    email.status = 'sent'
    email.isRead = 'read'
    return post(email)
}

function getNewEmail() {
    return Promise.resolve({
        subject: '',
        body: '',
        sentAt: null,
        to: {},
        from: {},
        isStar: false,
        removedAt: null,
    })
}

function getNumOfUnread() {
    return query({ status: 'inbox', txt: '' })
        .then(emails => emails.filter(email => email.isRead === 'unread').length)
}
function toggleRead(email) {
    email.isRead = email.isRead === 'read' ? 'unread' : 'read'
    return put(email)
}

function toggleStar(id) {
    return get(id)
        .then(email => {
            email.isStar = !email.isStar
            return put(email)
        }
        )
}

function _setStatus(email) {
    let status
    if (email.to.email === loggedInUser.email) status = 'inbox'
    else status = 'sent'
    email.status = status
    return email
}

function _createEmails() {
    // Temporary!
    let emails = utilService.load(EMAIL_KEY) || []
    if (!emails || !emails.length) {
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
            isRead: isRecieved ? 'unread' : 'read',
            sentAt: Math.random() > 0.5 ? Date.now() : 1646229756255,
            to: isRecieved ? loggedInUser : otherUser,
            from: isRecieved ? otherUser : loggedInUser,
            isStar: false,
            removedAt: null
        }
        email = _setStatus(email)
        emails.push(email)
    }
    return emails
}