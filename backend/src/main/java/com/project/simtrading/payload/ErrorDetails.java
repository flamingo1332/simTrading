package com.project.simtrading.payload;

import lombok.Getter;

import java.util.Date;

@Getter
public class ErrorDetails {
    private Date dateTime;
    private String message;
    private String details;

    public ErrorDetails(Date dateTime, String message, String details){
        this.dateTime = dateTime;
        this.message = message;
        this.details = details;
    }
}
