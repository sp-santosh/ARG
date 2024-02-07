import dataSource from "../../datasource.js";
const slotRepository = dataSource.getRepository("Slot");
export class SlotRepository{
    async findSlotById(id) {
        return slotRepository.findOne({ where: { id } });
      }
}