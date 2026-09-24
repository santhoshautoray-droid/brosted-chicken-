# THE BROAST FACTORY - Production Deployment Guide (Hostinger VPS)

This document provides step-by-step instructions to deploy THE BROAST FACTORY ordering platform to a Ubuntu/Debian Hostinger VPS.

---

## 1. Prerequisites on VPS
Ensure your VPS has Node.js 20+ or 22+, Git, PostgreSQL, PM2, and Nginx installed.

```bash
# Update package repositories
sudo apt update && sudo apt upgrade -y

# Install Node.js 22 LTS (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs build-essential

# Verify versions
node -v  # v22.x+
npm -v   # v10.x+

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx and Certbot for SSL
sudo apt install -y nginx certbot python3-certbot-nginx

# Install and configure PostgreSQL
sudo apt install -y postgresql postgresql-contrib
```

---

## 2. PostgreSQL Setup
Set up the production database and user:

```bash
sudo -u postgres psql
```

Inside the PostgreSQL prompt:
```sql
CREATE DATABASE broast_factory;
CREATE USER broast_user WITH ENCRYPTED PASSWORD 'YOUR_STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON DATABASE broast_factory TO broast_user;
ALTER DATABASE broast_factory OWNER TO broast_user;
\q
```

---

## 3. Clone Repository & Install Dependencies

```bash
# Create application directory
sudo mkdir -p /var/www/thebroastfactory
sudo chown -R $USER:$USER /var/www/thebroastfactory

# Clone repository
git clone <YOUR_GIT_REPO_URL> /var/www/thebroastfactory
cd /var/www/thebroastfactory

# Install production and development dependencies
npm ci
```

> ⚠️ **SECURITY AUDIT**: Run `npm audit` before building production application to ensure zero critical vulnerabilities in dependencies.
```bash
npm audit
```

---

## 4. Configure Production Environment (.env)

Create the production `.env` file from `.env.example`:

```bash
cp .env.example .env
nano .env
```

Ensure all variables are populated:
- `DATABASE_URL`: `postgresql://broast_user:YOUR_STRONG_PASSWORD_HERE@localhost:5432/broast_factory?schema=public`
- `ADMIN_SESSION_SECRET`: Generate a random string using `openssl rand -hex 32`
- `RAZORPAY_KEY_ID`: Live key starting with `rzp_live_...`
- `RAZORPAY_KEY_SECRET`: Live Razorpay secret key
- `RAZORPAY_WEBHOOK_SECRET`: Secret configured in your Razorpay Dashboard webhook section
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Same as `RAZORPAY_KEY_ID`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`: Active SMTP credentials for transactional emails
- `OWNER_NOTIFICATION_EMAIL`: Email to receive order alerts

---

## 5. Database Migration and Seeding

Run Prisma migrations and seed the initial menu data & admin credentials:

```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations
npx prisma migrate deploy
# or push schema if initial:
npx prisma db push

# Seed initial categories, menu items, and admin user
npx tsx prisma/seed.ts
```

---

## 6. Build the Next.js Production Bundle

```bash
npm run build
```

---

## 7. Start and Daemonize with PM2

```bash
# Create logs directory
mkdir -p logs

# Start using the ecosystem configuration
pm2 start deploy/ecosystem.config.js --env production

# Save PM2 process list to restore automatically on reboot
pm2 save
pm2 startup
```

---

## 8. Configure Nginx and SSL

Copy the Nginx configuration file:

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/thebroastfactory.com

# Replace yourdomain.com with your actual domain name
sudo sed -i 's/yourdomain.com/your-actual-domain.com/g' /etc/nginx/sites-available/thebroastfactory.com

# Enable the site
sudo ln -s /etc/nginx/sites-available/thebroastfactory.com /etc/nginx/sites-enabled/

# Test Nginx syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

Obtain free SSL certificate via Let's Encrypt Certbot:

```bash
sudo certbot --nginx -d your-actual-domain.com -d www.your-actual-domain.com
```

---

## 9. Razorpay Webhook Setup
1. Log into your [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Go to **Settings** → **Webhooks** → **Add New Webhook**.
3. Set Webhook URL to: `https://your-actual-domain.com/api/webhooks/razorpay`
4. Set Secret to the same value configured in your `.env` as `RAZORPAY_WEBHOOK_SECRET`.
5. Select active events:
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
6. Save Webhook.

---

## 10. Verification
Visit your domain `https://your-actual-domain.com` and perform a test order using Razorpay test mode or small live transaction, check database order creation, and log into `/admin` using your configured admin credentials.
