package com.project.simtrading.payload.reponseDto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long id;


    private String body;

    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;

    private UserDto user;
}