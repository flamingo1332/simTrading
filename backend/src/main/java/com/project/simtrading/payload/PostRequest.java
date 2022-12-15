package com.project.simtrading.payload;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class PostRequest {

    @NotNull
    private String content;

    @NotNull
    private String coin;
}
