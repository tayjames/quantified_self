# Quantified Self [![Build Status](https://travis-ci.org/tayjames/quantified_self.svg?branch=master)](https://travis-ci.org/tayjames/quantified_self)

## Initial Setup

- Determine postgres username in CLI with ```$ psql```

- Update /config/config.json with

|Provided      | Fill With    |
|------------- | -------------
|"dialect":    | "postgres"   |
|"username":   | "<your_username>"|



- ```$ npx sequelize db:create```

- ```$ npx sequelize db:migrate```

- ```$ npm install```


## Schema
![Database Schema Diagram](Untitled.png)
A README contains sections such as Introduction, Initial Setup, How to Use, Known Issues, Running Tests, How to Contribute, Core Contributors, Schema Design, and Tech Stack List.
