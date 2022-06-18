module.exports = {
  "development": {
    "username": "root",
    "password": "root", /* DEPENDE EL SISTEMA OPERATIVO */
    "database": "movies_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "phype_admin",
    "password": "PebeteHype22",
    "database": "phype_db",
    "host": " mysql-phype.alwaysdata.net",
    "dialect": "mysql"
  }
}
