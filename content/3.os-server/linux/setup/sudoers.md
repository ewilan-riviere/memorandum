---
title: Add to sudoers
---

# Add to sudoers

From <https://linuxize.com/post/how-to-add-user-to-sudoers-in-ubuntu/>

Log in as root

```bash
sudo -i
```

Add user to sudoers

```bash
usermod -aG sudo username
```

Check if user is in sudoers

```bash
cat /etc/sudoers | grep username
```

Add user to sudoers without password

```bash
echo "username  ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/username
```
