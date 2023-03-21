const UserCreateServices = require('./UserCreateServices')

it("user should be create", () => {
  
  const user = {
    name: "Vinicius Teste",
    email: "vinicius.teste@gmail.com",
    password: "123"
  }

  const userCreateServices = new UserCreateServices()
  const userCreated = userCreateServices.execute(user)
  
  expect(userCreated).toHaveProperty("id")
})