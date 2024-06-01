import { Request, Response, NextFunction } from 'express';
import * as carService from '../../../service/carService'; // Menggunakan * as untuk mengimpor semua fungsi dari carService

const listCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await carService.list(); // Panggil fungsi list dari service
    if (result.status === 200) {
      // Jika status dari hasil adalah 200, kirimkan respons berhasil
      res.status(200).json({
        status: 'OK',
        data: { cars: result.data?.data }, // Ambil data mobil dari hasil
        meta: { total: result.data?.count }, // Ambil total dari hasil
      });
    } else {
      // Jika status dari hasil bukan 200, kirimkan respons gagal
      res.status(400).json({
        status: 'FAIL',
        message: result.message, // Ambil pesan kesalahan dari hasil
      });
    }
  } catch (err) {
    // Tangani kesalahan jika terjadi
    res.status(500).json({
      status: 'ERROR',
      message: (err as Error).message,
    });
  }
};

//dengan raw
// const createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const car = await carService.create(req.body);
//     res.status(201).json({
//       status: 'OK',
//       data: car,
//     });
//   } catch (err) {
//     res.status(422).json({
//       status: 'FAIL',
//       message: (err as Error).message,
//     });
//   }
// };

// dengan form data
const createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { plat_no, name, color, tahun_produksi, status, price, create_by, update_by } = req.body;
    const img = req.file ? req.file.path : undefined;

    const car = {
      id: '',
      plat_no,
      name,
      color,
      img,
      tahun_produksi: parseInt(tahun_produksi),
      status: status === 'true',
      price: parseInt(price),
      create_by,
      update_by,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const result = await carService.create(car);
    res.status(result.status).json({
      status: 'OK',
      data: result.car,
      message: result.message,
    });
  } catch (err) {
    res.status(422).json({
      status: 'FAIL',
      message: (err as Error).message,
    });
  }
};


const updateCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { plat_no, name, color, tahun_produksi, status, price, create_by, update_by } = req.body;
    const img = req.file ? req.file.path : undefined;

    const car = {
      id: req.params.id,
      plat_no,
      name,
      color,
      img,
      tahun_produksi: parseInt(tahun_produksi),
      status: status === 'true' || status === true,
      price: parseInt(price),
      create_by,
      update_by,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Panggil service untuk melakukan update
    const result = await carService.update(req.params.id, car);
    
    // Tampilkan pesan respons sesuai dengan hasil operasi update
    res.status(result.status).json({ status: result.status === 200 ? 'OK' : 'FAIL', message: result.message });
  } catch (err) {
    // Tangani kesalahan jika terjadi
    res.status(422).json({ status: 'FAIL', message: (err as Error).message });
  }
};

const showCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await carService.getById(req.params.id);
    res.status(200).json({
      status: 'OK',
      data: result,
    });
  } catch (err) {
    res.status(422).json({
      status: 'FAIL',
      message: (err as Error).message,
    });
  }
};

const destroyCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await carService.remove(req.params.id);

    if (result.status === 404) {
      res.status(404).json({
        status: 'FAIL',
        message: result.message,
      });
      return;
    }

    res.status(200).json({
      status: 'OK',
      message: result.message,
    });
  } catch (err) {
    res.status(422).json({
      status: 'FAIL',
      message: (err as Error).message,
    });
  }
};


export default {
  list: listCars,
  create: createCar,
  update: updateCar,
  show: showCar,
  destroy: destroyCar,
};