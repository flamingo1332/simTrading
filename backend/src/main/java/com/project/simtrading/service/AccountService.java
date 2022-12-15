package com.project.simtrading.service;

import com.project.simtrading.entity.Account;

import java.util.List;

public interface AccountService {

    Account createAccount(long id, double balance, String name, String description);

    void deleteAccountById(long accountId);

    List<Account> getAccountByUserId(long userId);
    List<Account> getAccountByUserIdUpdated(long userId);
    Account buyCoin(long accountId, String coin, double amount, double price);
    Account sellCoin(long accountId, String coin, double amount, double price);

}
