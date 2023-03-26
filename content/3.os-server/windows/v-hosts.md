---
title: VHosts
description: Create VHosts on Windows
---

# VHosts

## PHP

If you want to create a PHP VHost, you have to install PHP service with NSSM, check **PHP on Windows article**. Here, we assume you installed PHP with NSSM.

## NGINX

If you want to create a VHost, you have to install NGINX service with NSSM, check **MySQL & NGINX on Windows article**. Here, we assume you installed NGINX with NSSM.

## Create VHost

An example with Laravel PHP 8.1.

You have to edit NGINX conf in `scoop` `apps` directory.

```nginx [C:\Users\USERNAME\scoop\apps\nginx\current\conf\nginx.conf]

# ...

http {
  # ...

  server {
    listen 80;
    server_name app.my-laravel-application.test; # URL to use on browser
    root "C:/workspace/my-laravel-application/public"; # Path to Laravel application
    index index.php index.html;

    location / {
      expires -1;
      try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
      fastcgi_pass 127.0.0.1:9081; # here to use PHP 8.1 with NSSM
      include fastcgi.conf;
    }
  }
}
```

### Edit Windows hosts

To use VHost on Windows, you have to edit hosts file, to add your new app URL.

```bash [C:\Windows\System32\drivers\etc\hosts]
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.

# localhost name resolution is handled within DNS itself.
# 127.0.0.1       localhost
# ::1             localhost

127.0.0.1       app.my-laravel-application.test
::1             app.my-laravel-application.test
```

::info
This file is under protection by Windows, you have to accept "Retry as Admin..." on VSCode and save again.
::

And now your application is available at <http://app.my-laravel-application.test>.
