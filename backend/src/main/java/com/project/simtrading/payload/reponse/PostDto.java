package com.project.simtrading.payload.reponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;

    private String body;
    private String coin;

    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
//    private List<CommentDto> comments;

    private UserDto user;
}
