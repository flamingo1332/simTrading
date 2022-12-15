package com.project.simtrading.payload.dto;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.simtrading.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String imageUrl;
}
