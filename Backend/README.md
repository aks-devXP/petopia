
---

# CosyLab Server Management Guide

**Linux • NGINX • Docker**

**Author:** Aditya Kumar (2022033)

This guide documents how to deploy, operate, and maintain applications on the CosyLab server:
`cosylab.iiitd.edu.in`.

It focuses on **repeatable, stable, production-safe workflows** for every engineer working on the system.

---

## Table of Contents

1. [Accessing the Server (SSH)](#1-accessing-the-server-ssh)
2. [Project Directory Structure](#2-project-directory-structure)
3. [Service Architecture Overview](#3-service-architecture-overview)
4. [NGINX Configuration Layout](#4-nginx-configuration-layout)
5. [Existing NGINX App Configs](#5-existing-nginx-app-configs)
6. [Running an Existing Project (DietRx)](#6-running-an-existing-project-dietrx)
7. [Accessing Applications in Browser](#7-accessing-applications-in-browser)
8. [Deploying a New Application](#8-deploying-a-new-application)
9. [NGINX Safety Rules](#9-nginx-safety-rules)
10. [Useful Day-to-Day Commands](#10-useful-day-to-day-commands)
11. [Common Problems & Fixes](#11-common-problems--fixes)
12. [Editing NGINX Comfortably](#12-editing-nginx-comfortably)

---

## 1. Accessing the Server (SSH)

From your local machine:

```bash
ssh cosylab@cosylab.iiitd.edu.in
```

If it times out:

* Your network might be blocking outbound port **22**
* Try a different network or use an approved VPN

SSH must work before anything else can be performed.

---

## 2. Project Directory Structure

All project directories reside under:

```bash
/home/cosylab/
```

Example:

```bash
cd /home/cosylab/DietRx
```

**Convention:** One project = one directory.

---

## 3. Service Architecture Overview

**Traffic flow:**

* **NGINX**

  * Public entry point
  * Handles HTTPS, routing, and reverse-proxying
* **Applications**

  * Run locally on the server
  * Typically bound to `127.0.0.1:<port>`
* **Docker Compose**

  * Used by most apps for reproducible and isolated deployments
* **Routing**

  * Path-based routing, e.g.

    * `https://cosylab.iiitd.edu.in/dietrx/`
    * `https://cosylab.iiitd.edu.in/kibana/`

NGINX interfaces with Docker services; containers do not expose ports publicly.

---

## 4. NGINX Configuration Layout

NGINX uses a modular layout for clarity and safety.

### 4.1 Core Configuration

Do **not** add app routes in the main config.

* Main site config:

  ```
  /etc/nginx/sites-available/default
  ```
* Enabled via:

  ```
  /etc/nginx/sites-enabled/default
  ```

It includes all application configs:

```nginx
include /etc/nginx/apps-enabled/*.conf;
```

---

### 4.2 Application Configuration Structure

Each application has its own config file.

* Available configs:

  ```
  /etc/nginx/apps-available/
  ```
* Enabled configs (symlinks only):

  ```
  /etc/nginx/apps-enabled/
  ```

Enable an app:

```bash
sudo ln -s /etc/nginx/apps-available/<app>.conf /etc/nginx/apps-enabled/<app>.conf
```

Disable an app:

```bash
sudo rm /etc/nginx/apps-enabled/<app>.conf
```

Always test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 5. Existing NGINX App Configs

Located in `/etc/nginx/apps-available/`:

`allerstack_multitox.conf`, `barcraft_and_apis.conf`, `bittersweet.conf`, `cocktaildb.conf`, `culinary_chatbot.conf`, `culinarydb_bookcompanion.conf`, `culinary_flip.conf`, `dietrx.conf`, `elastic_kibana.conf`, `flavordb_flavordb2.conf`, `food_processing_legacy.conf`, `foodprocessing_new_foodlabel.conf`, `gastrosym.conf`, `ratatouillegen.conf`, `ratatouille_metagen_next.conf`, `recipechat.conf`, `recipedb_crossword_recipedb2.conf`, `smart_fridge_chef.conf`, `spicerx.conf`, `sweetpred_ayurinfo_rat.conf`, `toxinpredictor.conf`, `ttc.conf`, `umami_foodle_scramble.conf`

List enabled configs:

```bash
ls -l /etc/nginx/apps-enabled/
```

---

## 6. Running an Existing Project (DietRx)

DietRx uses Docker Compose.

Start:

```bash
cd /home/cosylab/DietRx
docker compose up -d
```

Check running containers:

```bash
docker ps
```

View logs:

```bash
docker compose logs -f
```

Or specific service:

```bash
docker logs -f dietrx-backend
```

Stop:

```bash
docker compose down
```

---

## 7. Accessing Applications in Browser

Typical access pattern:

```
https://cosylab.iiitd.edu.in/dietrx/
```

Static assets:

```
https://cosylab.iiitd.edu.in/dietrx/static/...
```

If the app works locally but not in browser, review NGINX configuration and logs.

---

## 8. Deploying a New Application

### Step 1: Create Project Directory

```bash
mkdir -p /home/cosylab/MyNewApp
cd /home/cosylab/MyNewApp
```

### Step 2: Run the App Locally (Prefer Docker)

Use a **unique port**.

Example `docker-compose.yml`:

```yaml
services:
  mynewapp:
    build: .
    container_name: mynewapp
    restart: always
    ports:
      - "5005:5005"
```

Start:

```bash
docker compose up -d
```

Verify:

```bash
curl -I http://127.0.0.1:5005/
```

### Step 3: Create NGINX Configuration

Create:

```
/etc/nginx/apps-available/mynewapp.conf
```

Example:

```nginx
location /mynewapp/ {
    proxy_pass http://127.0.0.1:5005/;
    include proxy_params;
}
```

Enable:

```bash
sudo ln -s /etc/nginx/apps-available/mynewapp.conf /etc/nginx/apps-enabled/mynewapp.conf
```

Test & reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Your app becomes available at:

```
https://cosylab.iiitd.edu.in/mynewapp/
```

---

## 9. NGINX Safety Rules

1. Always test before reloading

   ```bash
   sudo nginx -t
   ```
2. Reload only when test passes

   ```bash
   sudo systemctl reload nginx
   ```
3. Back up configs before modifying

   ```bash
   sudo cp /etc/nginx/sites-available/default \
     /etc/nginx/sites-available/default.bak-$(date +%F)
   ```
4. Roll back if needed

   ```bash
   sudo cp /etc/nginx/sites-available/default.bak-YYYY-MM-DD \
     /etc/nginx/sites-available/default
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## 10. Useful Day-to-Day Commands

### NGINX

```bash
systemctl status nginx
sudo systemctl restart nginx
sudo nginx -T | less
```

Search config routes:

```bash
sudo nginx -T | grep -E "server_name|location "
```

### Ports in use

```bash
sudo ss -lntp
```

### Docker

```bash
docker ps
docker compose ps
docker compose logs -f
```

### Disk usage

```bash
df -h
du -sh /home/cosylab/* | sort -h
```

### System load

```bash
top
```

---

## 11. Common Problems & Fixes

### Problem A: Static Files Return `403 Forbidden`

Fix permissions:

```bash
sudo chmod -R o+rX /home/cosylab/MyNewApp/static
```

Check parent directory permissions:

```bash
namei -l /home/cosylab/MyNewApp/static
```

---

### Problem B: Blank Page / Missing Assets

Cause: frontend expects `/` but deployed under `/myapp/`.

Solutions:

* Adjust frontend base path
* OR move the app to a dedicated subdomain

---

### Problem C: NGINX Routing Fails

Verify app:

```bash
curl -I http://127.0.0.1:<port>/
```

Check logs:

```bash
sudo tail -n 200 /var/log/nginx/error.log
sudo tail -n 200 /var/log/nginx/cosylab-debug.log
```

---

### Problem D: Docker Container Unresponsive

```bash
docker logs -f <container>
docker restart <container>
```

Full reset:

```bash
docker compose down
docker compose up -d
```

---

## 12. Editing NGINX Comfortably

Recommended tools:

* VS Code Remote SSH
* WinSCP
* Manual: download → edit → upload

Always end with:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

