package com.project.simtrading;


import com.litesoftwares.coingecko.CoinGeckoApiClient;
import com.litesoftwares.coingecko.impl.CoinGeckoApiClientImpl;

import java.util.Map;

public class test {

    public static void main(String[] args) throws InterruptedException {
        CoinGeckoApiClient client = new CoinGeckoApiClientImpl();
        Map<String, Map<String, Double>> map = client.getPrice("bitcoin,apollo", "usd");

        for(String key : map.keySet()){
            System.out.println("Key :" + key);
            Map<String, Double> map2 = map.get(key);

            for(String key2 : map2.keySet()){
                System.out.println(key2);
                System.out.println("Val : " + map2.get(key2));
            }
        }
    }

}
