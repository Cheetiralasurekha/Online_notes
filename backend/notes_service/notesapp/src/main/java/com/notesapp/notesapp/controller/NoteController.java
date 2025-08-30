package com.notesapp.notesapp.controller;
import com.notesapp.notesapp.model.Note;
import com.notesapp.notesapp.service.NoteService;
import org.springframework.web.bind.annotation.*;
import com.notesapp.notesapp.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notes")
public class NoteController{

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    // ✅ Get all notes
    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }
    @GetMapping("/user/{userId}")
    public List<Note> getNotes(@PathVariable Long userId) {
        return noteService.getAllNotesByUserId(userId);
    }

    // ✅ Create new note
    @PostMapping
    public Note createNote(@RequestBody Note note) {
        return noteService.createNote(note);
    }

    // ✅ Update existing note
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        Note note = noteService.updateNote(id, updatedNote);
        return note;
    }

    // ✅ Delete note
    @DeleteMapping("/{id}")
    public String deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return "Note with id " + id + " deleted successfully!";
    }
    @GetMapping("/{id}")
    public Note getNoteById(@PathVariable Long id) {
        return noteService.getNoteById(id);
    }

}
