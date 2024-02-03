import dataSource from "../../datasource.js";

const subjectRepository = dataSource.getRepository("Subject");

export class SubjectRepository {
  async saveSubject(subject) {
    await subjectRepository.save(subject);
  }
  async updateSubject(subject) {
    const subjectFound = await subjectRepository.findOne({
      where: { id: subject.id },
    });

    await subjectRepository.update(Number(subject.id), subject);
  }

  async findSubjectById(id) {
    return subjectRepository.findOne({ where: { id } });
  }

  async findSubjectByName(name) {
    return subjectRepository.findOne({ where: { name } });
  }


  async findAllTSubject() {
    return subjectRepository.find();
  }

  async deleteSubject(id) {
    const subject = await subjectRepository.findOne({ where: { id } });

    return subjectRepository.remove(subject);
  }



}
