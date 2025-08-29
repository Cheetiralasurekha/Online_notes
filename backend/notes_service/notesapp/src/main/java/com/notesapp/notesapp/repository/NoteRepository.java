package com.notesapp.notesapp.repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.notesapp.notesapp.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByUserId(Long userId);
}
