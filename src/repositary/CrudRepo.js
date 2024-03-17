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
}
export default CrudRepositary;
