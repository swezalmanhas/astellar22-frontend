



# 🌟 **Astellar 2022** 🌟  

Welcome to **Astellar 2022**, a cutting-edge platform deployed and hosted with the power of **Docker**, **Cloudflare**, and **Nginx**. 🚀 This README serves as a complete guide to running, building, and hosting the platform.

🌐 **Live Site:** [Astellar 2022](https://github.com/swezalmanhas/astellar22-frontend)  

---

## ⚙️ **General Instructions**  

### 🛠️ **Run the Project Locally**  

Follow these steps to run the project locally:  

```bash
git clone https://github.com/MLSC-DB/astellar2022.git
cd astellar2022/
npm install
npm run start
```

### 🚀 **Generate Production Build**  

Use this command to generate production files. _(For Production VM Only!)_  

```bash
npm run build
```

---

## 🌐 **Reverse Proxy Setup with Cloudflare SSL and Hosting on VM**  

### Option 1️⃣: **Using Docker and Nginx**  

1️⃣ Navigate to the project directory and make the `run.sh` script executable:  
```bash
cd astellar2022/
chmod +x run.sh
./run.sh
```

A **Docker container** with Nginx will now be running on `localhost:7000`.  

2️⃣ Create an Nginx configuration file in `/etc/nginx/sites-available` named `astellar` with the following content:  

```nginx
server {
    listen 80;
    server_name astellar.xyz;
    location / {
        proxy_pass http://localhost:7000;
    }
}
```  

3️⃣ Enable the site in Nginx:  
```bash
sudo ln -s /etc/nginx/sites-available/astellar /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

4️⃣ **Cloudflare Setup:**  
   - In the **DNS Section** of Cloudflare, create an **A record** pointing to the root of your site and the IPv4 address of your VM.  

---

### Option 2️⃣: **Using Static Build Files with Nginx**  

1️⃣ Create an Nginx configuration file in `/etc/nginx/sites-available` named `astellar` with the following content:  

```nginx
server {
    root /home/shourde/hosted-projects/astellar2022/build;
    server_name astellar.xyz;
    index index.html;
    location /static/ {
        alias /home/shourde/hosted-projects/astellar2022/build/static;
    }
    location / {
        if (!-e $request_filename) {
            rewrite ^(.*)$ /index.html break;
        }
    }
}
```  

2️⃣ Enable the site in Nginx:  
```bash
sudo ln -s /etc/nginx/sites-available/astellar /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

3️⃣ **Cloudflare Setup:**  
   - In the **DNS Section** of Cloudflare, create an **A record** pointing to the root of your site and the IPv4 address of your VM.  

---

## 🛠️ **After Backend Creation**  

Configure Nginx to serve the static files and redirect `/api/` requests to the backend server.  

### 🚀 **Backend Proxy Rules**  

1️⃣ Create an Nginx configuration file in `/etc/nginx/sites-available` named `astellar` with the following content:  

```nginx
server {
    listen 80;
    server_name astellar.xyz;
    location / {
        proxy_pass http://localhost:7000;
    }
    location /api/ {
        proxy_pass http://localhost:3001;
    }
}
```  

2️⃣ Enable the site in Nginx:  
```bash
sudo ln -s /etc/nginx/sites-available/astellar /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

3️⃣ **Cloudflare Setup:**  
   - In the **DNS Section** of Cloudflare, create an **A record** pointing to the root of your site and the IPv4 address of your VM.  

---

## 🎉 **Key Features**  

✨ **Scalable Dockerized Setup:** Use Docker for seamless deployment and maintenance.  
✨ **Reverse Proxy with Nginx:** Efficient routing for frontend and backend.  
✨ **Cloudflare SSL Integration:** Enhanced security with SSL encryption.  
✨ **Dynamic Hosting Options:** Choose between Docker or static builds.  

---

## 📬 **Contact & Support**  

Have questions or need support? Reach out to us!  

- 🌐 **GitHub Repository:** [Astellar 2022 Frontend](https://github.com/swezalmanhas/astellar22-frontend)  
- ✉️ **Email:** [swezalmanhas@example.com](mailto:swezalmanhas@example.com)  

---

💻 **Developed with ❤️ by Swezal Manhas** 🚀  

--- 

Let me know if you need any further adjustments! 😊
