package main.java.com.apex.routine.repository;

import com.apex.routine.model.Routine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, String> {
    
    @Query("SELECT r FROM Routine r ORDER BY r.time ASC")
    List<Routine> findAllOrderedByTime();
}
