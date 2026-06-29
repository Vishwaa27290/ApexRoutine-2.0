package main.java.com.apex.routine.service;

import com.apex.routine.dto.RoutineRequestDto;
import com.apex.routine.dto.RoutineResponseDto;
import java.util.List;

public interface RoutineService {
    List<RoutineResponseDto> getAllRoutines();
    RoutineResponseDto createRoutine(RoutineRequestDto dto);
    RoutineResponseDto toggleRoutine(String id);
    void deleteRoutine(String id);
    void purgeAllRoutines();
}
