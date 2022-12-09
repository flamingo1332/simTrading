package com.project.simtrading.service;

import com.project.simtrading.entity.Account;

import java.util.List;

public interface AccountService {

    Account createAccount(long id, double balance);

    void deleteAccountById(long accountId);
    List<Account> getAccountByUserId(long userId);
    Account updateAccountTotal(long userId);
    Account buyCoin(long accountId, String coin, double amount, double price);
    Account sellCoin(long accountId, String coin, double amount, double price);

}
