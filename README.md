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

### Prerequisites

1. **Start Docker Desktop** (make sure Docker daemon is running)
2. **Ensure Redis is available** (or use the standalone compose file that includes Redis)

### Option 1: Standalone Deployment (with Redis)

This is the easiest option for local/testing deployment. It includes Redis:

```bash
docker-compose -f docker-compose.standalone.yml up -d
```

This will:
- Build and start the web application
- Start a Redis container
- Expose the app on port 3000

Access your page at: http://localhost:3000

To stop:
```bash
docker-compose -f docker-compose.standalone.yml down
```

### Option 2: Production Deployment (external Redis)

For production with an existing Redis instance on the `cloud` network:

```bash
# Ensure the 'cloud' network exists
docker network create cloud

# Deploy using docker-compose
docker-compose up -d
```

Access your page at: http://localhost:3000

### Option 3: Using Docker CLI

Build the Docker image:
```bash
docker build -t my-links-page .
```

Run the container (assuming Redis is available at 'redis:6379'):
```bash
docker run -d -p 3000:3000 \
  -e REDIS_HOST=redis \
  -e REDIS_PORT=6379 \
  --network cloud \
  --name my-links-page \
  my-links-page
```

Access your page at: http://localhost:3000

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

The following environment variables can be set:

- `REDIS_HOST`: Redis hostname (default: `redis`)
- `REDIS_PORT`: Redis port (default: `6379`)
- `REDIS_PASSWORD`: Redis password (optional)

You can set these in `stack.env` or via docker-compose environment section.

## Port Configuration 🔌

By default, the application runs on port 3000 inside the container and is mapped to port 3000 on the host.

To change the host port, modify:
- In `docker-compose.yml`: change `"3000:3000"` to `"YOUR_PORT:3000"`
- In docker run command: change `-p 3000:3000` to `-p YOUR_PORT:3000`

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
docker run -d -p 3000:3000 --name my-links-page my-links-page
```

## Technical Stack 🛠️

- **Frontend:** HTML5, CSS3
- **Backend:** Node.js, Express
- **Database:** Redis (for visitor counter)
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

