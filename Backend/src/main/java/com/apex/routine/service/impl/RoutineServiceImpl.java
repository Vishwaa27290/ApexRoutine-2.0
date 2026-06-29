package com.apex.routine.service.impl;

import com.apex.routine.dto.RoutineRequestDto;
import com.apex.routine.dto.RoutineResponseDto;
import com.apex.routine.exception.ResourceNotFoundException;
import com.apex.routine.model.Routine;
import com.apex.routine.repository.RoutineRepository;
import com.apex.routine.service.RoutineService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoutineServiceImpl implements RoutineService {

    private final RoutineRepository repository;

    public RoutineServiceImpl(RoutineRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RoutineResponseDto> getAllRoutines() {
        return repository.findAllOrderedByTime().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RoutineResponseDto createRoutine(RoutineRequestDto dto) {
        Routine routine = new Routine();
        routine.setId(dto.id());
        routine.setTitle(dto.title());
        routine.setTime(dto.time());
        routine.setCategory(dto.category());
        routine.setCompleted(dto.completed());
        routine.setTimestamp(dto.timestamp());
        
        Routine saved = repository.save(routine);
        return mapToResponseDto(saved);
    }

    @Override
    @Transactional
    public RoutineResponseDto toggleRoutine(String id) {
        Routine routine = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Routine targeting key index context not found: " + id));
        
        routine.setCompleted(!routine.isCompleted());
        Routine updated = repository.save(routine);
        return mapToResponseDto(updated);
    }

    @Override
    @Transactional
    public void deleteRoutine(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Target execution reference does not exist for deletion: " + id);
        }
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public void purgeAllRoutines() {
        repository.deleteAll();
    }

    private RoutineResponseDto mapToResponseDto(Routine routine) {
        return new RoutineResponseDto(
                routine.getId(),
                routine.getTitle(),
                routine.getTime(),
                routine.getCategory(),
                routine.isCompleted(),
                routine.getTimestamp()
        );
    }
}
