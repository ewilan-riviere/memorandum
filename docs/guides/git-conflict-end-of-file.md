# Git: conflicts with end of file

It's cause of Windows end of file (CRLF) conflict with Linux end of file  (LF), just udpate global git core

```bash
git config --global core.autocrlf false
```

And re-clone repository