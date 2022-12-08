package com.project.simtrading.utils;

import com.litesoftwares.coingecko.CoinGeckoApiClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class CoinGeckoClient {

    private CoinGeckoApiClient client;

    @Value("${app.api.coinGecko.baseUri}")
    private String baseUrl;


    public Object getTrendingCoins(){
        String uri = baseUrl + "/search/trending";

        return null;
    }

}
