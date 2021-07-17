---
title: API Limit requests
description: 'How to configure API limit requests'
position: 5
category: 'Laravel'
---

```php[app/Providers/RouteServiceProvider.php]
<?php

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(2000)->by(optional($request->user())->id ?: $request->ip()); // Update Limit::perMinute(60) to Limit::perMinute(2000)
        });
    }
}
```
