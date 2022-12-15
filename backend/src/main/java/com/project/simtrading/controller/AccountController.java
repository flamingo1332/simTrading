package com.project.simtrading.controller;

import com.project.simtrading.entity.Account;
import com.project.simtrading.payload.AccountRequest;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<List<Account>> getAccountsByUserId(@AuthenticationPrincipal CustomUserDetails customUserDetails){
        System.out.println("getAccountsByUserId");
        System.out.println(customUserDetails.getId());
        return ResponseEntity.ok(accountService.getAccountByUserId(customUserDetails.getId()));
    }
    @GetMapping("/update")
    public ResponseEntity<List<Account>> getAccountsByUserIdUpdated(@AuthenticationPrincipal CustomUserDetails customUserDetails){
        System.out.println("getAccountsByUserIdUpdated");
        System.out.println(customUserDetails.getId());
        return ResponseEntity.ok(accountService.getAccountByUserIdUpdated(customUserDetails.getId()));
    }

    @PostMapping
    public ResponseEntity<Account> createAccount(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                 @Valid @RequestBody AccountRequest request){
        // RestController에서 repository 직접 불러오는 것이 안좋은 습관인가?
        // https://softwareengineering.stackexchange.com/questions/306890/is-it-bad-practice-that-a-controller-calls-a-repository-instead-of-a-service
        System.out.println("creating account");

        return new ResponseEntity<>(accountService.createAccount(
                        customUserDetails.getId(),
                        request.getBalance(),
                        request.getName(),
                        request.getDescription())
                ,HttpStatus.CREATED);
    }

    @DeleteMapping("/{accountId}")
    public ResponseEntity<String> deleteAccount(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                @PathVariable long accountId){
        accountService.deleteAccountById(accountId);
        return ResponseEntity.ok("Account deleted");
    }

    // requestParam과 requestBody
    // put, post 차이 멱등성
    @PostMapping("/{accountId}/buy")
    public ResponseEntity<Account> buyCoin(@PathVariable long accountId,
                                           @RequestParam(name = "coin") String coin,
                                           @RequestParam(name = "amount") double amount,
                                           @RequestParam(name = "price") double price){
        return ResponseEntity.ok(accountService.buyCoin(accountId, coin, amount, price));
    }

    @PostMapping("/{accountId}/sell")
    public ResponseEntity<Account> sellCoin(@PathVariable long accountId,
                                            @RequestParam(name = "coin") String coin,
                                            @RequestParam(name = "amount") double amount,
                                            @RequestParam(name = "price") double price){
        return ResponseEntity.ok(accountService.sellCoin(accountId, coin, amount, price));
    }

}
