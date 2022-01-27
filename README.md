# LunchMate
 

### API Server
#### django shell
```
cd LunchMate
pipenv shell
```

#### migrate DB and run server
```
pipenv install
pip install django
pip install python-dateutil 
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### React Server
```
cd frontend
npm install
npm run build
npm start
```

Django Server : http://127.0.0.1:8000/

Django Admin : http://127.0.0.1:8000/admin/

Django API : http://127.0.0.1:8000/api/

React Server : http://localhost:3000
