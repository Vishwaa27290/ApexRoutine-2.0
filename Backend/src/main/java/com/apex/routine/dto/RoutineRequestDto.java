package com.apex.routine.dto;

import com.apex.routine.model.Category;
import java.time.LocalTime;

public record RoutineRequestDto(
    String id,
    String title,
    LocalTime time,
    Category category,
    boolean completed,
    long timestamp
) {}
