package com.apex.routine.model;


import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.Objects;

@Entity
@Table(name = "routines", indexes = {
    @Index(name = "idx_routine_timestamp", columnList = "created_at")
})
public class Routine {

    @Id
    @Column(length = 50, updatable = false, nullable = false)
    private String id;

    @Column(nullable = false, length = 40)
    private String title;

    @Column(name = "time_slot", nullable = false , columnDefinition = "TIME")
    private LocalTime time;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Category category;

    @Column(nullable = false)
    private boolean completed;

    @Column(name = "created_at", nullable = false, updatable = false)
    private long timestamp;

    @PrePersist
    public void generateIdforeSave() {
        if(this.id == null){
            this.id = java.util.UUID.randomUUID().toString();
        }
    }

    public Routine() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalTime getTime() { return time; }
    public void setTime(LocalTime time) { this.time = time; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Routine routine = (Routine) o;
        return Objects.equals(id, routine.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
