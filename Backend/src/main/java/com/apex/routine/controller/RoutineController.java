package com.apex.routine.controller;

import com.apex.routine.dto.RoutineRequestDto;
import com.apex.routine.dto.RoutineResponseDto;
import com.apex.routine.service.RoutineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/routines")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.DELETE})
public class RoutineController {

    private final RoutineService service;

    public RoutineController(RoutineService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<RoutineResponseDto>> getPipelineMatrix() {
        return ResponseEntity.ok(service.getAllRoutines());
    }

    @PostMapping
    public ResponseEntity<RoutineResponseDto> registerActivityInstance(@RequestBody RoutineRequestDto payload) {
        return new ResponseEntity<>(service.createRoutine(payload), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<RoutineResponseDto> cycleActivityCompleteness(@PathVariable String id) {
        return ResponseEntity.ok(service.toggleRoutine(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> clearActivityTarget(@PathVariable String id) {
        service.deleteRoutine(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/purge")
    public ResponseEntity<Void> clearWholeWorkspace() {
        service.purgeAllRoutines();
        return ResponseEntity.noContent().build();
    }
}
