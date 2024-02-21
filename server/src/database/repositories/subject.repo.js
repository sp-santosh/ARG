import dataSource from "../../datasource.js";

const subjectRepository = dataSource.getRepository("Subject");
// Function to convert integer to binary
function intToBinary(n) {
  return n.toString(2);
}

export class SubjectRepository {
  async saveSubject(subject) {
    const test = await subjectRepository.save({ ...subject, code: "-" });
    const binaryCode = intToBinary(test.id);

    await subjectRepository.update(Number(test.id), {
      ...subject,
      code: binaryCode,
    });
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
