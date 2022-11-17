package com.project.simtrading.config;


import com.project.simtrading.security.CustomUserDetailsService;
import com.project.simtrading.security.jwt.JwtAccessDeniedHandler;
import com.project.simtrading.security.jwt.JwtAuthenticationEntryPoint;
import com.project.simtrading.security.jwt.JwtAuthenticationFilter;
import com.project.simtrading.security.oauth.CookieAuthorizationRequestRepository;
import com.project.simtrading.security.oauth.user.CustomOAuth2UserService;
import com.project.simtrading.security.oauth.OAuth2AuthenticationFailureHandler;
import com.project.simtrading.security.oauth.OAuth2AuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig {

    private final long MAX_AGE_SECS = 3600;
    @Value("${app.cors.allowedOrigins}")
    private String[] allowedOrigins;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;
    @Autowired
    private CookieAuthorizationRequestRepository cookieAuthorizationRequestRepository;
    @Autowired
    private OAuth2AuthenticationSuccessHandler authenticationSuccessHandler;
    @Autowired
    private OAuth2AuthenticationFailureHandler authenticationFailureHandler;


    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    private JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
//    @Bean
//    protected AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
//        return new CookieAuthorizationRequestRepository();
//    }


    //    // https://www.baeldung.com/spring-cors#cors-with-spring-security
    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("*******************************");
        System.out.println("securityfilterchain ***********");
        System.out.println("*******************************");

        http
                .cors()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .authorizeRequests(auth -> auth
                        .antMatchers("/**", "/api/v1/auth/**", "/api/v1/users/**").permitAll()
                        .antMatchers("/v2/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-resources/**",
                                "/swagger-ui.html/**",
                                "/webjars/**").permitAll()  // swagger
                        .anyRequest().authenticated())
                .oauth2Login()
                .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository)
                .and()
                .redirectionEndpoint()
                .baseUri("/oauth2/callback/*")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(authenticationSuccessHandler)
                .failureHandler(authenticationFailureHandler);

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }


//    @Bean
//    protected AuthenticationManager authenticationManagerBean(AuthenticationConfiguration authconfig) throws Exception {
//        return authconfig.getAuthenticationManager();
//    }
    @Bean
    protected AuthenticationManager authenticationManagerBean(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder())
                .and()
                .build();
    }


    //securityConfig에 포함
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins(allowedOrigins)
                        .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true)
                        .maxAge(MAX_AGE_SECS);
            }
        };
    }

}
