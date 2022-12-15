package com.project.simtrading.payload;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class AccountRequest {
    @NotBlank
    private String name;

    @NotBlank
    @Size(max = 100)
    private String description;

    @NotBlank
    @Min(value=1, message="must be equal or greater than 1")
    private double balance;
}
