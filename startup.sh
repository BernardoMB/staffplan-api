npm install
cd public
npm install
cd ..
pm2 stop env_name
pm2 start svc/app.js --name "env_name"
cd public
ng build --prod
