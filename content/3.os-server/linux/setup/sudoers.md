---
title: Add to sudoers
---

# Add to sudoers

From <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>

Log in as root with root password

```bash
su -
```

Add user to sudoers

```bash
usermod -aG sudo username
```

Add user to sudoers

```bash
echo "username  ALL=(ALL:ALL) ALL" | sudo tee /etc/sudoers.d/username
```

Disconnect and reconnect to apply changes

```bash
exit
```

Now you can use sudo

```bash
sudo apt update
```
