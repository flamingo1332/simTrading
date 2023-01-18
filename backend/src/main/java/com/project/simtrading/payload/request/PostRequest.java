package com.project.simtrading.payload.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class PostRequest {

    @NotBlank(message = "Body should not be null or empty")
    @Size(min = 1, message = "Comment body should be more than 1 char")
    private String body;

    private String coin;
}
