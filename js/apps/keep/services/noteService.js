import { utilService } from '../../../services/utilService.js'
import { storageService } from '../../../services/asyncStorage.js'

const NOTES_KEY = 'keepDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    addNote,
    getEmptyNote,
    pinNote,
    duplicateNote
}

function query({search, type}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            const newNotes = notes.filter(note => {
                const regex = new RegExp(search, 'i')
                return (regex.test(note.info.title) || 
                        regex.test(note.info.txt))
            })
            return newNotes
        })
        .then(notes => notes.autoSortObj('isPinned', 1, false))
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}
function put(updatedNote) {
    return storageService.put(NOTES_KEY, updatedNote)
}

function duplicateNote(note) {
    return get(note.id)
        .then(note => {
            const clone = JSON.parse(JSON.stringify(note))
            clone.isPinned = false
            storageService.post(NOTES_KEY, clone)
        })
}

function pinNote(noteId) {
    return get(noteId)
        .then(note => {
            note.isPinned = true
            put(note)
        })
}

function addNote(note) {
    return storageService.post(NOTES_KEY, note)
}

function getEmptyNote(noteType) {
    const newNote = {
        isPinned: false,
        type: noteType,
        info: {},
        style: {
            backgroundColor: null
        }
    }

    if (noteType === 'note-img') {
        newNote.info.url = null
        newNote.info.title = null
    } else if (noteType === 'note-video') {
        newNote.info.url = null
    }
    return Promise.resolve(newNote)
}

function _createNotes() {
    let notes = utilService.load(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [{
            id: 'n101',
            type: 'note-txt',
            isPinned: false,
            info: {
                txt: 'Fullstack Me Baby!',
                title: 'avocado',

            },
            style: {
                backgroundColor: 'lightblue'
            }
        },
        {
            id: 'n102',
            type: 'note-img',
            isPinned: true,
            info: {
                url: './assets/imgs/horse.jpg',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: 'lightgreen'
            },

        },
        // {
        //     id: 'n103',
        //     type: 'note-todos',
        //     isPinned: false,
        //     info: {
        //         label: 'Get my stuff together',
        //         todos: [
        //             { txt: 'Driving liscence', doneAt: null },
        //             { txt: 'Coding power', doneAt: 187111111 }
        //         ]
        //     }
        // },
        // {
        //     id: 'n104',
        //     type: 'note-video',
        //     isPinned: false,
        //     info: {
        //         url: 'https://www.youtube.com/watch?v=oLDqCbv0FBQ'
        //     }
        // },
        // {
        //     id: 'n105',
        //     type: 'note-video',
        //     isPinned: false,
        //     info: {
        //         url: 'https://www.youtube.com/watch?v=C926N9zMJkU'
        //     }
        // },
        // {
        //     id: 'n106',
        //     type: 'note-txt',
        //     isPinned: true,
        //     info: {
        //         txt: 'Fullstack Me Baby!',
        //         title: 'Okay'
        //     }
        // },
        // {
        //     id: 'n107',
        //     type: 'note-img',
        //     isPinned: false,
        //     info: {
        //         url: './assets/imgs/horse.jpg',
        //         title: 'Bojack Horseman',

        //     },
        //     style: {
        //         backgroundColor: 'lightgreen'
        //     }

        // },
        // {
        //     id: 'n108',
        //     type: 'note-video',
        //     isPinned: false,
        //     info: {
        //         url: 'https://www.youtube.com/watch?v=uNT_AxXrUGs'
        //     }
        // },
        ]
        utilService.save(NOTES_KEY, notes)
    }
    return notes
}