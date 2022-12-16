package com.project.simtrading.payload;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
public class AccountRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    @Min(value=100, message="must be equal or greater than 100")
    private double balance;
}
