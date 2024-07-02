---
title: NGINX
description: "How to setup NGINX on Windows"
---

# NGINX

::: warning Scoop is necessary
This guide use `scoop` to install this binary, if you don't have it, check [this guide](/systems/windows/scoop)
:::

Here you will need to have **NSSM**, I give more details in **PHP guide**.

Install **NGINX** with **scoop**

```ps1
scoop install nginx
```

## Create nginx

And install a new service, here for NGINX

```ps1
sudo nssm install nginx
```

You will have a window to create new service, set `path` with `nginx.exe` path.

For **Path**, get **path** of **current** **nginx**, in this example change `USERNAME`

Path

```ps1
C:\Users\USERNAME\scoop\apps\nginx\current\nginx.exe
```

Service name

```ps1
nginx
```

Save the new service and start it:

```ps1
sudo nssm start nginx
```

In any browser, at <http://localhost>, you have to see **NGINX welcome** page.

## Restart nginx

If you change some data, like with **nginx.conf**, you will need to **restart Service**.

```ps1
sudo nssm restart nginx
```

## Add a VHost

Add a new VHost to **nginx.conf**: `C:\Users\USERNAME\scoop\apps\nginx\current\conf\nginx.conf`

- Add `server_names_hash_bucket_size  64;` to `http` block (just once, not for each VHost)
- If you want a VHost check example `server` block with `server_name laravel.localhost;`

`C:\Users\USERNAME\scoop\apps\nginx\current\conf\nginx.conf` file

```nginx:nginx.conf
# ...

http {
  # ...

  server {
    listen 80;
    server_name app.laravel.test; # URL to use on browser
    root "C:/workspace/laravel/public"; # Path to Laravel application
    index index.php index.html;

    location / {
      expires -1;
      try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
      fastcgi_pass 127.0.0.1:9082; # here to use PHP 8.2 with NSSM
      include fastcgi.conf;
    }
  }
}
```

You have update **nginx.conf**, so you need to restart NGINX Service:

```ps1
sudo nssm restart nginx
```

### hosts

You will need to update **hosts** to have a new VHost, you will find it here: _C:\Windows\System32\drivers\etc\hosts_. Open it with any IDE and, **at the end**, add two lines for each VHost with same `server_name` of `server` block. In my example, the `server_name` is `server_name app.laravel.test`.

The `C:\Windows\System32\drivers\etc\hosts` file should look like this:

```ini:hosts
127.0.0.1       app.laravel.test
::1             app.laravel.test
```

::: info
This file is under protection by Windows, you have to accept "Retry as Admin..." on VSCode and save again.
:::

---

In any browser, at <http://app.laravel.test>, you have to see the app (for some browser, you will need to restart it).
