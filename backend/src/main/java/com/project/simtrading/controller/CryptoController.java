package com.project.simtrading.controller;


import com.jzhangdeveloper.newsapi.net.NewsAPI;
import com.jzhangdeveloper.newsapi.net.NewsAPIClient;
import com.jzhangdeveloper.newsapi.net.NewsAPIResponse;
import com.jzhangdeveloper.newsapi.params.EverythingParams;
import com.litesoftwares.coingecko.CoinGeckoApiClient;
import com.litesoftwares.coingecko.domain.Coins.CoinFullData;
import com.litesoftwares.coingecko.domain.Coins.CoinMarkets;
import com.litesoftwares.coingecko.domain.Coins.MarketChart;
import com.litesoftwares.coingecko.domain.Search.Trending;
import com.litesoftwares.coingecko.impl.CoinGeckoApiClientImpl;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/crypto")
public class CryptoController {


    private CoinGeckoApiClient client;
    private NewsAPIClient newsApiClient;
    @Value("${app.api.coinGecko.baseUri}")
    private String baseUrl;

    @Value("${app.api.newsApi.key}")
    private String NEWS_API_KEY;

    private CryptoController(){
        client = new CoinGeckoApiClientImpl();
    }

//    @AuthenticationPrincipal 자체가 authentication 기능 있다. 토큰없으면 리턴안함
    @GetMapping("/trending")
    public ResponseEntity<Trending> getTrendingCoins(){
//        CoinGeckoApiClient client = new CoinGeckoApiClientImpl(); //나중에 다른 방식으로 해보고 비교

//        Trending trending = client.getTrending();
//        client.shutdown();

//        Shutdown Isn’t Necessary¶
//        The threads and connections that are held will be released automatically if they remain idle.
//        But if you are writing a application that needs to aggressively release unused resources you may do so.
//        출처 : https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/ 셧다운 안해도될듯

        return ResponseEntity.ok(client.getTrending());
    }

    @GetMapping("/{ids}/markets")
    public ResponseEntity<List<CoinMarkets>> getMarkets(@PathVariable(name = "ids") String ids){
        return ResponseEntity.ok(client.getCoinMarkets("usd", ids, null,
                10, 1, false, "24"));
    }


    @GetMapping("/{id}")
    public ResponseEntity<CoinFullData> getCoinId(@PathVariable(name = "id") String id,
                                                    @RequestParam(name = "localization", defaultValue = "false") boolean localization,
                                                    @RequestParam(name = "tickers", defaultValue = "false") boolean tickers,
                                                    @RequestParam(name = "market_data", defaultValue = "false") boolean marketData,
                                                    @RequestParam(name = "community_data", defaultValue = "false") boolean communityData,
                                                    @RequestParam(name = "sparkline", defaultValue = "false") boolean sparkline){
        CoinGeckoApiClient client = new CoinGeckoApiClientImpl();

        CoinFullData coin = client.getCoinById(id, localization, tickers, true, communityData, false,  sparkline);
        client.shutdown();
        return ResponseEntity.ok(coin);
    }

    @GetMapping("/{id}/market_chart")
    public ResponseEntity<MarketChart> getMarketChart(@PathVariable(name = "id") String id,
                                                    @RequestParam(name = "vs_currency", defaultValue = "usd") String vsCurrency,
                                                    @RequestParam(name = "days", defaultValue = "30") int days,
                                                    @RequestParam(name = "interval", defaultValue = "daily") String interval){
        CoinGeckoApiClient client = new CoinGeckoApiClientImpl();

        MarketChart chart = client.getCoinMarketChartById(id, vsCurrency, days, interval);
        client.shutdown();

        return ResponseEntity.ok(chart);
    }

    @GetMapping("/{id}/ohlc")
    public ResponseEntity<List<List<Double>>> getOhlc(@PathVariable(name = "id") String id,
                                                      @RequestParam(name = "vs_currency", defaultValue = "usd") String vsCurrency,
                                                      @RequestParam(name = "days", defaultValue = "90") int days){
        CoinGeckoApiClient client = new CoinGeckoApiClientImpl();
        List<List<String>> data = client.getCoinOHLC(id, vsCurrency, days);
        List<List<Double>> dataNum = new ArrayList<>();

        for(int i = 0; i < data.size(); i ++){
            dataNum.add(new ArrayList<>());
            for( int j = 0; j < 5; j ++)
                dataNum.get(i).add(Double.parseDouble(data.get(i).get(j)));
        }

        client.shutdown();

        return ResponseEntity.ok(dataNum);
    }

    @GetMapping("{id}/news")
    public ResponseEntity<Object> getCoinNews(@PathVariable(name = "id") String id) throws IOException, InterruptedException {
        NewsAPIClient newsApiClient = NewsAPI.newClientBuilder()
                .setApiKey(NEWS_API_KEY)
                .build();

        Map<String, String> everythingParams = EverythingParams.newBuilder()
                .setPageSize(3)
                .setSearchQuery(id)
                .setLanguage("en")
                .build();
        NewsAPIResponse response = newsApiClient.getEverything(everythingParams);

        return ResponseEntity.ok(response.getBody());
    }

}
