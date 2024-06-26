---
title: Disk
description: Disk management
---

# Disk

Disk management

## Check usage

```sh
df -hT /
```

## Find big files

```sh
sudo find / -type f -size +30M
```

### With size, sort by size, clean output

```sh
sudo find / -xdev -type f -size +30M -exec du -sh {} ';' | sort -rh | head -n50
```

### With size, sort by size

```sh
sudo find / -type f -size +30M -exec du -h {} \; | sort -rh
```

### With many details

```sh
sudo find / -xdev -type f -size +30M -exec ls -lha {} \; | sort -nk 5
```

### With size

```sh
sudo find / -type f -size +30M -exec du -h {} \;
```

### Basic

```sh
sudo find / -type f -size +30M
```

## Clear big files

Create `clean` into `~/scripts`

```sh [~/scripts/clean]
#!/bin/bash
sudo rm -rf /var/log/*.gz # clean logs
sudo rm -rf /var/log/nginx/*.gz # clean nginx logs
docker system prune -af # clean docker
sudo journalctl --vacuum-size=30M # clean journalctl
sudo sh -c 'rm -rf /var/lib/snapd/cache/*' # clean snap
```

And create symlink

```sh
sudo ln -s ~/scripts/clean /usr/local/bin/clean
```

Create cronjob

```sh
crontab -e
```

```sh
0 1 * * * sh /usr/local/bin/clean
```

## Docker

Find big docker files

```sh
docker system df
```

Clear docker

```sh
docker system prune -af
```

Restart docker

```sh
sudo service docker restart
```
