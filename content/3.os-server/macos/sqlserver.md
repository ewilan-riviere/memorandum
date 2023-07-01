---
title: SQL Server
---

# SQL Server

Install [SQL Server on macOS](https://docs.docker.com/desktop/install/mac-install/).

Pull the image:

```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

On M1 Macs, you have to enable `Use Rosetta for x86/amd64 emulation on Apple Silicon` into settings.

![docker-macos-m1](/docs/docker-macos-m1.jpg)

Run the container:

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=12345OHdf%e" \
  -p 1433:1433 --name sqlserver --hostname sqlserver \
  -d \
  mcr.microsoft.com/mssql/server:2022-latest
```

You can connect to the server.

- `host`: `127.0.0.1`
- `port`: `1433`
- `login`: `sa`
- `password`: `12345OHdf%e`
