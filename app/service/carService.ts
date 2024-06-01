import { carsRepository } from '../repositories/carsRepository';
import { v4 as uuidv4 } from 'uuid';

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
  created_at: string;
  updated_at: string;
}

interface ListResult {
  data: Car[];
  count: number;
}

const create = async (requestBody: Car): Promise<{ status: number; message: string; car?: Car }> => {
  try {
    // Menghasilkan UUID v4 baru
    const id = uuidv4();

     // Set the ID to the requestBody
    const newCar: Car = {
      ...requestBody,
      id,
      img: requestBody.img || '',
      create_by: requestBody.create_by || '',
      update_by: requestBody.update_by || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as Car;


    // Membuat entitas mobil dengan ID yang telah ditetapkan
    const createdCar = await carsRepository.create(newCar);

    return { status: 200, message: 'Car created successfully', car: createdCar };
  } catch (error: any) {
    return { status: 400, message: `Validation error: ${error.message}` };
  }
};

const list = async (): Promise<{ status: number; message: string;  data?: ListResult }> => {
  try {
    const data = await carsRepository.list();
    return { status: 200, message: 'Cars retrieved successfully', data: { data, count: data.length } };
  } catch (error: any) {
    return { status: 500, message: `Internal server error: ${error.message}` };
  }
};


const getById = async (id: string): Promise<{ status: number; message: string; car?: Car }> => {
  try {
    const car = await carsRepository.getById(id);
    if (!car) {
      return { status: 404, message: 'Car not found' };
    }
    return { status: 200, message: 'Car retrieved successfully', car };
  } catch (error: any) {
    return { status: 500, message: `Internal server error: ${error.message}` };
  }
};

const update = async (id: string, data: Car): Promise<{ status: number; message: string; car?: Car }> => {
  try {
    // Panggil repository untuk melakukan update
    const car = await carsRepository.getById(id);
    if (!car) {
      // Jika mobil tidak ditemukan, kembalikan pesan yang sesuai
      return { status: 404, message: `Car with id ${id} not found` };
    }
    await carsRepository.update(id, data)
    return { status: 200, message: 'Car updated successfully'};
  } catch (error: any) {
    // Tangani error jika terjadi
    return { status: 500, message: `Failed to update car: ${error.message}` };
  }
};


const remove = async (id: string): Promise<{ status: number; message: string }> => {
  try {
    const car = await carsRepository.getById(id);
    
    if (!car) {
      // Jika mobil tidak ditemukan, kembalikan respons yang sesuai
      return { status: 404, message: 'Car not found' };
    }
    // Lakukan penghapusan mobil jika ditemukan
    await carsRepository.remove(id);
    return { status: 200, message: 'Car removed successfully' };
  } catch (error: any) {
    return { status: 500, message: `Internal server error: ${error.message}` };
  }
};


export { create, list, getById, update, remove };
