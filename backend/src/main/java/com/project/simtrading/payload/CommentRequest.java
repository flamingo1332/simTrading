package com.project.simtrading.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class CommentRequest {
    @NotBlank(message = "Body should not be null or empty")
    @Size(min = 1, message = "Comment body should be more than 1 char")
    private String body;
}
