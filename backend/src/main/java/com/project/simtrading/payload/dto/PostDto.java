package com.project.simtrading.payload.dto;

import com.project.simtrading.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long id;

    // should not be null
    // at least ~ char

    @NotBlank
    @Size(min = 1, message = "Post title should have at least 1 char")
    private String title;

    @NotBlank
    @Size(min = 1, message = "Post content should have at least 1 char")
    private String content;

    private LocalDateTime dateCreated;
    private LocalDateTime dateUpdated;

    private Set<CommentDto> comments;

    private UserDto user;
}