package com.project.simtrading.service.impl;

import com.project.simtrading.entity.Account;
import com.project.simtrading.entity.BuyOrder;
import com.project.simtrading.entity.SellOrder;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.BadRequestException;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.repo.AccountRepository;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository repository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Account createAccount(long id, double initialBalance) {
        User user = userRepository.findById(id).orElseThrow(() ->
            new ResourceNotFoundException("user", "id", id));

        Account account = new Account();
        account.setBalance(initialBalance);
        account.setTotal(initialBalance);
        account.setBuyOrders(new ArrayList<>());
        account.setSellOrders(new ArrayList<>());
        account.setCoins(new HashMap<>());
        account.setUser(user);
        return repository.save(account);
    }

    @Override
    public void deleteAccountById(long id) {
        Account account = repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Account", "id", id));
        repository.delete(account);
    }

    @Override
    public List<Account> getAccountByUserId(long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
        return user.getAccounts();
    }

    @Override
    public Account updateAccountTotal(long id) {
//        getAccountByUserId(1)
        return null;
    }

    @Override
    public Account buyCoin(long id, String coin, double amount, double price) {
        Account account = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account", "id", id));
        Map<String, Double> coins = account.getCoins();
        if(amount * price > account.getBalance()) {
            throw new BadRequestException("Not enough balance");
        }
        coins.put(coin, coins.getOrDefault(coin, 0.0) + amount);

        BuyOrder buyOrder = new BuyOrder();
        buyOrder.setAccount(account);
        buyOrder.setAmount(amount);
        buyOrder.setSymbol(coin);

        account.setBalance(account.getBalance() - amount * price);
        account.getBuyOrders().add(buyOrder);
        return repository.save(account);
    }

    @Override
    public Account sellCoin(long id, String coin, double amount, double price) {
        Account account = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Account", "id", id));
        Map<String, Double> coins = account.getCoins();
        if(!coins.containsKey(coin) || coins.get(coin) < amount) {
            throw new BadRequestException("You're selling more than you have");
        }

        coins.put(coin, coins.get(coin) - amount);

        SellOrder sellOrder = new SellOrder();
        sellOrder.setAccount(account);
        sellOrder.setAmount(amount);
        sellOrder.setSymbol(coin);

        account.setBalance(account.getBalance() + amount * price);
        account.getSellOrders().add(sellOrder);

        return repository.save(account);
    }


}
