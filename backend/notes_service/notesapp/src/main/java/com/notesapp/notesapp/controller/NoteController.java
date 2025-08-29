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
    @GetMapping("/user/{userId}")
    public List<Note> getNotes() {
        return noteService.getAllNotes();
    }

    // ✅ Create new note
    @PostMapping
    public Note createNote(@RequestBody Note note) {
     //   return noteService.createNote(note);
        Note n=new Note();
        n.setTitle("hie");
        n.setContent("hhehe");
        long a=1;
        n.setUserId(a);
        return n;
    }

    // ✅ Update existing note
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id, @RequestBody Note updatedNote) {
        return noteService.updateNote(id, updatedNote);
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
