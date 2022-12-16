package com.project.simtrading.controller;


import com.jzhangdeveloper.newsapi.net.NewsAPI;
import com.jzhangdeveloper.newsapi.net.NewsAPIClient;
import com.jzhangdeveloper.newsapi.net.NewsAPIResponse;
import com.jzhangdeveloper.newsapi.params.EverythingParams;
import com.litesoftwares.coingecko.CoinGeckoApiClient;
import com.litesoftwares.coingecko.domain.Coins.CoinFullData;
import com.litesoftwares.coingecko.domain.Coins.CoinMarkets;
import com.litesoftwares.coingecko.domain.Coins.MarketChart;
import com.litesoftwares.coingecko.domain.Search.Search;
import com.litesoftwares.coingecko.domain.Search.Trending;
import com.litesoftwares.coingecko.impl.CoinGeckoApiClientImpl;
import io.swagger.models.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.directory.SearchResult;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/crypto")
public class CryptoController {


    private CoinGeckoApiClient client;

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

    @GetMapping("/markets")
    public ResponseEntity<List<CoinMarkets>> getMarkets(@RequestParam(name = "ids", defaultValue = "") String ids,
                                                        @RequestParam(name = "per_page") int perPage,
                                                        @RequestParam(name = "page") int page) {
        System.out.println("markets!!!!!!!!!!!!!!!!!!");
        return ResponseEntity.ok(client.getCoinMarkets("usd", ids, null,
                perPage, page, false, "24"));
    }


    @GetMapping("/{id}")
    public ResponseEntity<CoinFullData> getCoinId(@PathVariable(name = "id") String id,
                                                    @RequestParam(name = "localization", defaultValue = "false") boolean localization,
                                                    @RequestParam(name = "tickers", defaultValue = "false") boolean tickers,
                                                    @RequestParam(name = "market_data", defaultValue = "false") boolean marketData,
                                                    @RequestParam(name = "community_data", defaultValue = "false") boolean communityData,
                                                    @RequestParam(name = "sparkline", defaultValue = "false") boolean sparkline){
        return ResponseEntity.ok(client.getCoinById(id, localization, tickers, true, communityData, false,  sparkline));
    }

    @GetMapping("/{id}/market_chart")
    public ResponseEntity<MarketChart> getMarketChart(@PathVariable(name = "id") String id,
                                                    @RequestParam(name = "vs_currency", defaultValue = "usd") String vsCurrency,
                                                    @RequestParam(name = "days", defaultValue = "30") int days,
                                                    @RequestParam(name = "interval", defaultValue = "daily") String interval){
        return ResponseEntity.ok(client.getCoinMarketChartById(id, vsCurrency, days, interval));
    }

    @GetMapping("/search")
    public ResponseEntity<Search> getMarketChart(@RequestParam(name = "query") String query){
        return ResponseEntity.ok(client.getSearchResult(query));
    }

    @GetMapping("/{id}/ohlc")
    public ResponseEntity<List<List<Double>>> getOhlc(@PathVariable(name = "id") String id,
                                                      @RequestParam(name = "vs_currency", defaultValue = "usd") String vsCurrency,
                                                      @RequestParam(name = "days", defaultValue = "90") int days){

        List<List<String>> data = client.getCoinOHLC(id, vsCurrency, days);
        List<List<Double>> dataNum = new ArrayList<>();

        for(int i = 0; i < data.size(); i ++){
            dataNum.add(new ArrayList<>());
            for( int j = 0; j < 5; j ++)
                dataNum.get(i).add(Double.parseDouble(data.get(i).get(j)));
        }
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

        return ResponseEntity.ok(newsApiClient.getEverything(everythingParams).getBody());
    }

}
