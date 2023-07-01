---
title: SQL Server
---

# SQL Server

Install [SQL Server on macOS](https://docs.docker.com/desktop/install/mac-install/).

Pull the image:

```bash
docker pull mcr.microsoft.com/mssql/server:2019-latest
```

On M1 Macs, you have to enable `Use Rosetta for x86/amd64 emulation on Apple Silicon` into settings.

![docker-macos-m1](/docs/docker-macos-m1.jpg)

Run the container:

```bash
docker run --name SQLServer -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=12345OHdf%e' -e 'MSSQL_PID=Express' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
```
