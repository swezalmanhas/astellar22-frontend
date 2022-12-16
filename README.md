# General Stuff
## Running  
  
```bash
git clone https://github.com/MLSC-DB/astellar2022.git
cd astellar2022/
npm install
npm run start
```


## Generate Prod files  

```
npm run build
```
# Reverse Proxy Rules for Cloudflare SSL and hosting on VM

>## 1. Using running Docker container and creating an entry in `etc/nginx/sites-available`
```bash
cd astellar2022/
chmod +x run.sh
./run.sh
```

Docker container with nginx will be running on `localhost:7000`.  

Now we need to map port `7000` to astellar.xyz.

Create a file `astellar` in `/etc/nginx/sites-available`  

Copy the following contents and paste in it  

```nginx
server {
    listen 80;
    server_name astellar.xyz;
    location / {
        proxy_pass http://localhost:7000;
    }
}
``` 
We need to enable the site in nginx so execute the following commands
```bash
sudo ln -s /etc/nginx/sites-available/astellar /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```
In `DNS` Section of Cloudflare, create an A record to root of site pointing to IPv4 address of the VM's IP.


>## 2. Using static build files and creating an entry in `etc/nginx/sites-available`
Create a file `astellar` in `/etc/nginx/sites-available`  

Copy the following contents and paste in it  

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
We need to enable the site in nginx so execute the following commands
```bash
sudo ln -s /etc/nginx/sites-available/astellar /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```
In `DNS` Section of Cloudflare, create an A record to root of site pointing to IPv4 address of the VM's IP.


# After creation of backend
## Configure nginx to serve content for static and redirect to /api/ for backend

Create a file `astellar` in `/etc/nginx/sites-available`  

Copy the following contents and paste in it  

```nginx
server {
    listen 80;
    server_name astellar.xyz;
    location / {
        proxy_pass http://localhost:7000;
    }
    location /api/{
    	proxy_pass http://localhost:3001;
  }
}
```
We need to enable the site in nginx so execute the following commands
```bash
sudo ln -s /etc/nginx/sites-available/astellar /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```
In `DNS` Section of Cloudflare, create an A record to root of site pointing to IPv4 address of the VM's IP.