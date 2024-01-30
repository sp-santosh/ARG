import dataSource from "../../datasource.js";

const subjectRepository = dataSource.getRepository("Subject");

export class SubjectRepository {
  async saveSubject(subject) {
    await subjectRepository.save(subject);
  }

  async findSubjectById(id) {
    return subjectRepository.findOne({ where: { id } });
  }

  async findSubjectByName(name) {
    return subjectRepository.findOne({ where: { name } });
  }
}
