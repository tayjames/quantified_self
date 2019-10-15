var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../../app');
var Food = require('../../../../models').Food;

describe('Food API endpoints', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  test('GET /api/v1/foods path', async () => {

    return request(app)
    .get('/api/v1/foods')
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty("id")
      expect(response.body[0]).toHaveProperty("name")
      expect(response.body[0]).toHaveProperty("calories")
      expect(response.body[0]).toHaveProperty("createdAt")
      expect(response.body[0]).toHaveProperty("updatedAt")
    })
  })

  test('GET /api/v1/foods/:id path', async() => {
    return request(app)
    .get('/api/v1/foods/1')
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toEqual("Banana")
      expect(response.body.calories).toBe(150)
    })
  })

  test('Returns 404 if an invalid id is passed to GET /api/v1/foods/:id path', async() => {
    return request(app)
    .get('/api/v1/foods/24563456')
    .then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual("No food found")
    })
  })

  test('POST /api/v1/foods path', async() => {
    let params = {
      name: "Ramen",
      calories: 1500
    }
    return request(app).post('/api/v1/foods').send(params)
    .then(response => {
      console.log(response)
      expect(response.statusCode).toBe(201);
    })
  })

  test('Returns a 400 status code when missing fields sent to POST /api/v1/foods', async() => {
    let params = {
      calories: 23432
    }
    return request(app)
    .post('/api/v1/foods').send(params)
    .then(response => {
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual("Remember to provide both the food name and its calories.")
    })
  })

  test('PATCH /api/v1/foods route', async() => {
    Food.create({
      name: "Pizza",
      calories: 2500
    })
    .then(food => {
      return request(app).patch(`/api/v1/foods/${food.id}`).send({name: "Pizza Pie", calories: 2000})
      .then(response => {
        expect(response.status).toBe(202)
        expect(response.body.name).toBe("Pizza Pie")
        expect(response.body.calories).toBe(2000)
      })
    })
  })

  test("Returns a 400 status code when missing fields sent to PATCH /api/v1/foods/:id", async() => {
    Food.create({
      name: "quinoa",
      calories: 2500
    })
    .then(food => {
      return request(app).patch(`/api/v1/foods/${food.id}`).send({calories: 250})
      .then(response => {
        expect(response.statusCode).toBe(400).send(JSON.stringify("Remember to provide both the food name and its calories."))
      })
    })
  })

  test('DELETE /api/v1/foods/:id', async() => {
    Food.create({
      name: "Pizza",
      calories: 2500
    })
    .then(food => {
      return request(app).delete(`/api/v1/foods/${food.id}`)
      .then(response => {
        expect(response.statusCode).toBe(204)
      })
    })
  })

  test('Returns a 400 status code when an invalid id is sent to DELETE /api/v1/foods/:id', () => {
      return request(app).delete('/api/v1/foods/12000')
      .then(response => { 
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual("Food not found!")
      })
  })
})
