# My Personal Links Page 🔗

A beautiful, modern personal links page that you can easily customize and deploy using Docker.

## Features ✨

- 🎨 Modern gradient design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 Lightweight and fast
- 🐳 Docker-ready for easy deployment
- 🎯 Easy to customize

## Customization 🎨

1. **Edit `index.html`** to update your information:
   - Change the avatar text (initials)
   - Update your name and bio
   - Modify the links to your social media profiles
   - Add or remove link buttons as needed

2. **Edit `style.css`** to customize the appearance:
   - Change gradient colors
   - Adjust fonts and sizes
   - Modify animations and transitions

## Local Development 💻

Simply open `index.html` in your browser to preview the page locally.

## Docker Deployment 🐳

### Option 1: Using Docker CLI

Build the Docker image:
```bash
docker build -t my-links-page .
```

Run the container:
```bash
docker run -d -p 8080:80 --name my-links-page my-links-page
```

Access your page at: http://localhost:8080

### Option 2: Using Docker Compose

Build and run with docker-compose:
```bash
docker-compose up -d
```

Stop the container:
```bash
docker-compose down
```

Access your page at: http://localhost:8080

## Deploying to Portainer 🚢

### Method 1: Using Portainer Stacks

1. Log in to your Portainer instance
2. Navigate to **Stacks** → **Add stack**
3. Name your stack (e.g., "my-links-page")
4. Choose **Git Repository** or **Upload** method:
   
   **If using Git:**
   - Enter your repository URL
   - Specify the branch
   - Add the compose path: `docker-compose.yml`
   
   **If using Upload:**
   - Copy the contents of `docker-compose.yml`
   - Paste it into the web editor

5. Click **Deploy the stack**
6. Your page will be available at `http://your-server-ip:8080`

### Method 2: Building and Pushing to Registry

1. **Build the image:**
   ```bash
   docker build -t yourusername/my-links-page:latest .
   ```

2. **Push to Docker Hub (or your registry):**
   ```bash
   docker push yourusername/my-links-page:latest
   ```

3. **Deploy in Portainer:**
   - Go to **Containers** → **Add container**
   - Name: `my-links-page`
   - Image: `yourusername/my-links-page:latest`
   - Port mapping: `8080:80`
   - Restart policy: `Unless stopped`
   - Click **Deploy the container**

### Method 3: Using Portainer Custom Template

1. In Portainer, go to **App Templates** → **Custom Templates**
2. Click **Add Custom Template**
3. Fill in the details:
   - **Title:** My Links Page
   - **Description:** Personal links page
   - **Type:** Container
   - **Image:** `yourusername/my-links-page:latest`
   - **Port mapping:** `8080:80`
4. Save and deploy from templates anytime

## Environment Variables 🔧

The current setup doesn't use environment variables, but you can extend it by:
- Creating a config file that gets mounted
- Using environment variables to inject content dynamically

## Port Configuration 🔌

By default, the application runs on port 80 inside the container and is mapped to port 8080 on the host.

To change the host port, modify:
- In `docker-compose.yml`: change `"8080:80"` to `"YOUR_PORT:80"`
- In docker run command: change `-p 8080:80` to `-p YOUR_PORT:80`

## Updating Your Page 🔄

After making changes to your HTML/CSS:

1. Rebuild the image:
   ```bash
   docker-compose build
   ```

2. Restart the container:
   ```bash
   docker-compose up -d
   ```

Or with Docker CLI:
```bash
docker build -t my-links-page .
docker stop my-links-page
docker rm my-links-page
docker run -d -p 8080:80 --name my-links-page my-links-page
```

## Technical Stack 🛠️

- **Frontend:** HTML5, CSS3
- **Web Server:** Nginx (Alpine Linux)
- **Container:** Docker

## File Structure 📁

```
my-page/
├── index.html           # Main HTML file
├── style.css            # CSS styles
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose configuration
├── .dockerignore        # Docker ignore file
└── README.md           # This file
```

## Tips 💡

1. **Use a reverse proxy** (like Traefik or Nginx Proxy Manager) with SSL for production
2. **Customize the avatar** by replacing the text with an image tag
3. **Add analytics** by including tracking scripts in the HTML
4. **Enable caching** in Nginx for better performance
5. **Use your own domain** by pointing it to your server and setting up SSL

## License 📄

Feel free to use and modify this project for your personal use!

---

Made with ❤️ for easy personal branding

