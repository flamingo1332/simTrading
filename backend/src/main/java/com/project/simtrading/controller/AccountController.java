package com.project.simtrading.controller;

import com.project.simtrading.entity.Account;
import com.project.simtrading.entity.User;
import com.project.simtrading.exception.ResourceNotFoundException;
import com.project.simtrading.payload.request.AccountRequest;
import com.project.simtrading.repo.UserRepository;
import com.project.simtrading.security.CustomUserDetails;
import com.project.simtrading.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;
    @Autowired
    private UserRepository userRepository;



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
    public ResponseEntity<?> createAccount(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @Valid @RequestBody AccountRequest request,
            BindingResult result
    ){
        // RestController에서 repository 직접 불러오는 것이 안좋은 습관인가?
        // https://softwareengineering.stackexchange.com/questions/306890/is-it-bad-practice-that-a-controller-calls-a-repository-instead-of-a-service

        //catch error in controller or service? -> controller is better
//        https://softwareengineering.stackexchange.com/questions/393307/where-would-you-handle-exceptions-controller-service-repository
        User user = userRepository.findById(customUserDetails.getId()).orElseThrow(()
                -> new ResourceNotFoundException("user", "id", customUserDetails.getId()));
        if(result.hasErrors()) return new ResponseEntity<>("Invalid Input. Try Again!",HttpStatus.BAD_REQUEST);
        if(user.getAccounts().size()>=5) return new ResponseEntity<>("Maximum number of accounts is 5.",HttpStatus.BAD_REQUEST);

        return ResponseEntity.ok(accountService.createAccount(
                customUserDetails.getId(), request));
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
                                           @RequestParam(name = "amount") String amount,
                                           @RequestParam(name = "price") String price){


        return ResponseEntity.ok(accountService.buyCoin(accountId, coin,
                Double.parseDouble(amount), Double.parseDouble(price)));
    }

    @PostMapping("/{accountId}/sell")
    public ResponseEntity<Account> sellCoin(@PathVariable long accountId,
                                            @RequestParam(name = "coin") String coin,
                                            @RequestParam(name = "amount") double amount,
                                            @RequestParam(name = "price") double price){


        return ResponseEntity.ok(accountService.sellCoin(accountId, coin, amount, price));
    }

}
