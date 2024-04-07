class CrudRepositary {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const ToDo = await this.model.create({data: data});
      return ToDo;
    } catch (error) {
      console.log("error", error);
      throw {error};
    }
  }
  async getAll() {
    try {
      const response = await this.model.findMany();
      return response;
    } catch (error) {
      console.log("error", error);
      throw {error};
    }
  }
  
  async delete(userId) {
    try {
      const response = await this.model.delete({
        where: {
          id: userId,
        },
      });
      return response;
    } catch (error) {
      console.log("error", error);
      throw {error};
    }
  }
  async get(userEmail) {
    try {
      const response = await this.model.findUnique({
        where: {
          email: userEmail,
        },
      });
      return response;
    } catch (error) {
      console.log("error", error);
      throw {error};
    }
  }

  // async createUserTodos ({label}){
  //   try {
  //     const response = await this.model.create({
  //       todos: {
  //         id: userId,
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     console.log("error", error);
  //     throw {error};
  //   }
  // }
}
export default CrudRepositary;
