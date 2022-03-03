import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/asyncStorage.js'

const NOTES_KEY = 'keeps'
_createNotes()

export const noteService = {
    query,
    remove,
    addNote,
    getEmptyNote
}

// export const typeService= {
//     getNoteTypes()
// }

// function getNoteTypes(){
//     const types = {
//         cmps:[
//             {
//                 type: 'note-txt',

//             }
//         ]
//     }
//     return Promise.resolve()
// }

function query() {
    return storageService.query(NOTES_KEY)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function addNote(note) {
    return storageService.post(NOTES_KEY, note)
}

function getEmptyNote(noteType) {
    const newNote = {
        // type: 'note-txt',
        isPinned: false,
        info: {},
        style: {
            backgroundColor: null
        }
    }
    if (noteType === 'note-txt') {
        newNote.info.txt = null
        newNote.info.title = null
    } else if (noteType === 'note-img') {
        newNote.info.url = null
        newNote.info.title = null
    } else if (noteType === 'note-video') {
        newNote.info.url = null
    }
    return newNote
}

// function _getFromYoutube(searchTerm){

// }
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
                url: '../../../../assets/imgs/horse.jpg',
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
        },
        {
            id: 'n104',
            type: 'note-video',
            info: {
                url: 'https://www.youtube.com/watch?v=oLDqCbv0FBQ'
            }
        },
        ]
        utilService.save(NOTES_KEY, notes)
    }
    return notes
}