***DEPLOYMENT***

***Setup NGINX for our website:***
1. Clone the app and run startup.sh to populate static sute
```
$ git clone https://staffplandev@bitbucket.org/staffplanteam/staffplan.git
```
2. Install nginx
```
sudo apt-get install -y nginx
```
3. Setup client website location:
Put nginx template to site-enabled location
```
/etc/nginx/sites-enabled
```
4. Reload
```
nginx -s reload
```

***Running Node service:***
1. Update env.json config file
2. Run startup.sh 

***Set up multiple environments in one instance***
1. Make sure you update PORT value in:
svc/app.js
public/src/app/global/settings.ts
2. Update env.json to point to right database (trial, prod or staging)
3. Update sites-enabled values so nginx could load the right frontend
