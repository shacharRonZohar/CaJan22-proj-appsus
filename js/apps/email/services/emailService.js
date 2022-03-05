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
    email: 'Shachar@Adam.js',
    fullName: 'Shachar Perlin'
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
            console.log(criteria.sort.by)
            const sortType = criteria.sort.by === 'subject' ? 'string' : 1
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
        for (let i = 0; i < 5; i++) {
            emails.push(..._getDemoRecievedEmails())
            emails.push(..._getDemoSentEmails())
        }
    }
    utilService.save(EMAIL_KEY, emails)
}

function _getDemoRecievedEmails() {
    const yaronUser = {
        email: 'yaronBiton@Walid.com',
        fullName: 'Yaron Biton'
    }
    return [
        {
            id: utilService.makeExtId(),
            subject: 'Missing Notice!',
            body: 'Has anyone seen joy?',
            isRead: 'unread',
            sentAt: 1643536810000,
            to: loggedInUser,
            from: yaronUser,
            isStar: true,
            removedAt: null,
            status: 'inbox'
        },
        {
            id: utilService.makeExtId(),
            subject: 'UI notes',
            body: 'I DON\'T WANT TO SEE THAT SHIT IN 10 MINUTES',
            isRead: 'read',
            sentAt: 1646128810000,
            to: loggedInUser,
            from: {
                email: 'RotemBublil@CodingAcademy.puki',
                fullName: 'Rotem Bublil'
            },
            isStar: false,
            removedAt: null,
            status: 'inbox'
        }, {
            id: utilService.makeExtId(),
            subject: 'Lidor\'s Credit Card',
            body: `Hello my friend!
            Here is Lidors credit card info as requested:
            1337-420-6969`,
            isRead: 'unread',
            sentAt: Date.now(),
            to: loggedInUser,
            from: {
                email: 'prince@nigeria.scam',
                fullName: 'Nigerian Prince'
            },
            isStar: false,
            removedAt: null,
            status: 'inbox'
        }, {
            id: utilService.makeExtId(),
            subject: 'Project Status',
            body: 'CAN I SEND AN EMAIL TO MY AUNT ALREADY???',
            isRead: 'unread',
            sentAt: Date.now(),
            to: loggedInUser,
            from: yaronUser,
            isStar: false,
            removedAt: null,
            status: 'inbox'
        }, {
            id: utilService.makeExtId(),
            subject: 'Sprint 3 answers',
            body:
                `Hey guys!
             Here are the answers to sprint no. 3, make sure to upload them
             so the other students don't suspect you are metargelim`,
            isRead: 'read',
            sentAt: 1646128810000,
            to: loggedInUser,
            from: {
                email: 'matan@crispel.net',
                fullName: 'Matan Crispel'
            },
            isStar: false,
            removedAt: null,
            status: 'inbox'
        }, {
            id: utilService.makeExtId(),
            subject: 'Miss you!',
            body: 'Would love to catch up sometimes',
            isRead: 'read',
            sentAt: Date.now(),
            to: loggedInUser,
            from: {
                email: 'zendaya@hollywood.crime',
                fullName: 'Zendaya'
            },
            isStar: true,
            removedAt: null,
            status: 'inbox'
        }, {
            id: utilService.makeExtId(),
            subject: 'You are my heroes!',
            body:
                `Thank you for building us a site!
            You are truly helping the war efforts, 
            contributing something to the world by building this app`,
            isRead: 'read',
            sentAt: Date.now(),
            to: loggedInUser,
            from: {
                email: 'vladimir@zelensky.ru',
                fullName: 'Vladimir Zelensky'
            },
            isStar: true,
            removedAt: null,
            status: 'inbox'
        },
    ]
}


function _getDemoSentEmails() {
    const yaronUser = {
        email: 'yaronBiton@Walid.com',
        fullName: 'Yaron Biton'
    }
    return [
        {
            id: utilService.makeExtId(),
            subject: 'Delivery',
            body: 'When are you coming bro?',
            isRead: 'read',
            sentAt: 1643536810000,
            to: {
                email: 'MrBachur@plants.drugs',
                fullName: 'Mar Bachur'
            },
            from: loggedInUser,
            isStar: false,
            removedAt: null,
            status: 'sent'
        },
        {
            id: utilService.makeExtId(),
            subject: 'Missing Payment',
            body:
                `Hey bill!
            We haven't recieved the latest payment for creating DOS.
            We understand you like screwing people over, but don't go with us,
            we will duplicate the code all over the application,
            and make it die slowly with pain!`,
            isRead: 'read',
            sentAt: 1646128810000,
            to: {
                email: 'billGates@yahoo.com',
                fullName: 'Bill the Steal'
            },
            from: loggedInUser,
            isStar: false,
            removedAt: null,
            status: 'sent'
        }, {
            id: utilService.makeExtId(),
            subject: 'Lidor\'s Credit Card',
            body: `Hello my friend!
            Here is Lidors credit card info as requested:
            1337-420-6969`,
            isRead: 'read',
            sentAt: Date.now(),
            to: {
                email: 'prince@nigeria.scam',
                fullName: 'Nigerian Prince'
            },
            from: loggedInUser,
            isStar: false,
            removedAt: null,
            status: 'sent'
        }, {
            id: utilService.makeExtId(),
            subject: 'Project Status',
            body: 'CAN I SEND AN EMAIL TO MY AUNT ALREADY???',
            isRead: 'read',
            sentAt: Date.now(),
            to: {
                email: 'randomGuy@fiverr.pay',
                fullName: 'Fiverr Fullstack dev'
            },
            from: loggedInUser,
            isStar: true,
            removedAt: null,
            status: 'sent'
        }, {
            id: utilService.makeExtId(),
            subject: 'Reavealing Secrets',
            body:
                `Hey matan!
             Looks like the students caught on to us being the shutluim in
             the kvutzat whatsapp, what should we do?`,
            isRead: 'read',
            sentAt: 1646128810000,
            to: {
                email: 'matan@crispel.net',
                fullName: 'Matan Crispel'
            },
            from: loggedInUser,
            isStar: false,
            removedAt: null,
            status: 'sent'
        }
    ]
}