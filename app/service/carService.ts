import { carsRepository } from '../repositories/carsRepository';

interface Car {
  id: string;
  plat_no: string;
  name: string;
  color?: string;
  img?: string;
  tahun_produksi: number;
  status: boolean;
  price: number;
  create_by: string;
  update_by: string;
  created_at: Date;
  updated_at: Date;
}

interface ListResult {
  data: Car[];
  count: number;
}

const create = async (body:Car, img:any, userId:string) => {
  try {
    const newCar: Car = {
      ...body,
      img:img,
      create_by: userId,
      update_by: userId,
    };
  
    const createdCar = await carsRepository.create(newCar);
    return { status: 200, message: 'Car created successfully', car: createdCar };

  } catch (error: any) {
    return { status: 400, message: `Validation error: ${error.message}` };
  }
};

const list = async () => {
  try {
    const data = await carsRepository.list();
    return { status: 200, data: { data, count: data.length } };

  } catch (error: any) {
    return { status: 500, message: `Internal server error: ${error.message}` };
  }
};


const getById = async (id: string) => {
  try {
    const car = await carsRepository.getById(id);
    if (!car) {
      return { status: 404 };
    }
    return { status: 200, car };

  } catch (error: any) {
    return { status: 500, message: `Internal server error: ${error.message}` };
  }
};

const update = async (id: string, body:Car, img:any, userId:string) => {
  try {
    const car = await carsRepository.getById(id);
    if (!car) {
      return { status: 404, message: `Car with id ${id} not found` };
    }
    const newCar: Car = {
      ...body,
      img:img,
      update_by: userId,
    };

    await carsRepository.update(id, newCar)
    return { status: 200, message: 'Car updated successfully'};

  } catch (error: any) {
    // Tangani error jika terjadi
    return { status: 500, message: `Internal server error: ${error.message}` };
  }
};


const remove = async (id: string): Promise<{ status: number; message: string }> => {
  try {
    const car = await carsRepository.getById(id);
    
    if (!car) {
      return { status: 404, message: 'Car not found' };
    }
    
    await carsRepository.remove(id);
    return { status: 200, message: 'Car removed successfully' };

  } catch (error: any) {
    return { status: 500, message: `Internal server error: ${error.message}` };
  }
};


export { 
  create, 
  list, 
  getById, 
  update, 
  remove 
};
