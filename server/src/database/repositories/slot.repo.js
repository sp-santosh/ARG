import dataSource from "../../datasource.js";
const slotRepository = dataSource.getRepository("Slot");
export class SlotRepository{
    async findSlotById(id) {
        return await slotRepository.findOne({ where: { id } });
      }

    async findByCode(code){
      return await slotRepository.findOne({ where: { code } });
    }
}