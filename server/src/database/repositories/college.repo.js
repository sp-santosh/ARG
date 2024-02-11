import dataSource from "../../datasource.js";
const collegeRepository = dataSource.getRepository("College");
export class CollegeRepository{
    async findCollegeById(id) {
        return collegeRepository.findOne({ where: { id } });
      }
    
      async findAll(){
        return collegeRepository.find();
      }
}