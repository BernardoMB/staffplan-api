npm install
cd public
npm install
cd ..
pm2 kill
pm2 start svc/app.js
cd public
ng build --prod
