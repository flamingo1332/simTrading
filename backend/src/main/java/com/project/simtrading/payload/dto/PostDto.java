package com.project.simtrading.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;

    private String content;
    private String coin;

    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;
    private List<CommentDto> comments;

    private UserDto user;
}
