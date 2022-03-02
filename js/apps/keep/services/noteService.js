import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/asyncStorage.js'

const NOTES_KEY = 'keeps'
_createNotes()

export const noteService = {
    query,
    remove,
}

function query() {
    return storageService.query(NOTES_KEY)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function addNote() { }

function getEmptyNote() { }

function _createNotes() {
    let notes = utilService.load(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [{
            id: 'n101',
            type: 'note-txt',
            isPinned: true,
            info: {
                txt: 'Fullstack Me Baby!',
                title: 'avocado'
            }
        },
        {
            id: 'n102',
            type: 'note-img',
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n103',
            type: 'note-todos',
            info: {
                label: 'Get my stuff together',
                todos: [
                    { txt: 'Driving liscence', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        }
        ]
        utilService.save(NOTES_KEY, notes)
    }
    return notes
}